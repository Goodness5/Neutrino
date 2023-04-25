// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721Receiver.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/utils/ERC721Holder.sol";

// import './FractionToken.sol';

//0.00001 per 50 erc20 token;

contract NeutrinoEstate {
    enum Status {
        sale,
        rent
    }

    struct Rent{
        uint amount;
        address tenant;
        address owner;
        uint duration;
        uint timestart;
    }

    struct PropertyInfo {
        address owner;
        address nftContractAddress;
        Status propertyStatus;
        uint256 nftId;
        uint256 InitialdepositTimestamp;
        address fractionContractAddress;
        uint256 supply;
        bool hasFractionalized;
        address isBuyer;
        uint amountPaid;
        bool isSold;
        bool isRented;
        bool ownerdisabled;
        // mapping of nftId to Rent struct
    }

    mapping(uint => Rent) rented;
    PropertyInfo[] Registry;
    uint[] NFTIDs;

    // mapping of the nftId of each properties to the property info
    mapping(uint => PropertyInfo) property; 
    mapping(address => mapping(uint256 => uint256)) PropertyNftIndex;

    modifier onlyPropOwner(uint nftId) {
        PropertyInfo storage prop = property[nftId];
        require(prop.ownerdisabled==false, "you don't have this priviledge");
        require(msg.sender == prop.owner, "NOT PROPERTY OWNER");

        _;

    }

    function disableOwner (uint nftId) internal{
        PropertyInfo storage prop = property[nftId];
        prop.ownerdisabled=true;

    }
    
    

    function RentProperty(uint _amt, uint _nftID) public payable{
        PropertyInfo storage rentedproperty = property[_nftID];
        require(rentedproperty.propertyStatus==Status.rent, "propert not for rent");
        require(rentedproperty.isRented == false, "propert already rented out");
        require(rentedproperty.owner != address(0), "property does not exist");
        Rent storage newRent = rented[_nftID];
        require (newRent.amount==msg.value, "insufficient amount");
        require (newRent.owner==rentedproperty.owner, "shay u dey whyne me ni");
        newRent.tenant=msg.sender;
        newRent.timestart=block.timestamp;
        ERC20 token = ERC20(rentedproperty.fractionContractAddress);
        require(
            token.transfer(msg.sender, _amt),
            "Renting failed"
            );
        disableOwner(_nftID);

   }

   function stopRent(uint _nftID)  public{
     PropertyInfo storage rentedproperty = property[_nftID];
     Rent storage newRent = rented[_nftID];
        if (block.timestamp > (newRent.duration + newRent.timestart)) {
        rentedproperty.isRented = false;
        rentedproperty.ownerdisabled=false;
        ERC20 token = ERC20(rentedproperty.fractionContractAddress);
        token.transferFrom(newRent.tenant, newRent.owner, newRent.amount);
        return;
    }

   }

    function getAllProperties() public view returns (PropertyInfo[] memory) {
        PropertyInfo[] memory allProperties = new PropertyInfo[](NFTIDs.length);
        for (uint i = 0; i < NFTIDs.length; i++) {
            allProperties[i] = property[NFTIDs[i]];
        }
        return allProperties;
    }

    function depositPropertyNft(
        address _nftContractAddress,
        uint256 _nftId,
        Status _status
    ) public {
        ERC721 NFT = ERC721(_nftContractAddress);
        //approveFunction from script required
        NFT.safeTransferFrom(msg.sender, address(this), _nftId);
        PropertyInfo storage newProperty = property[_nftId];
        newProperty.owner = msg.sender;
        newProperty.nftContractAddress = _nftContractAddress;
        newProperty.nftId = _nftId;
        newProperty.hasFractionalized = false;
        newProperty.propertyStatus = _status;
        PropertyNftIndex[_nftContractAddress][_nftId] = Registry.length - 1;
        // Registry.push(newProperty);
        NFTIDs.push(_nftId);
    }

    function createFraction(
        address _nftContractAddress,
        uint256 _nftId // uint256 _supply, // string memory _tokenName, // string memory _tokenSymbol
    ) public {
        uint256 PropertyIndex = PropertyNftIndex[_nftContractAddress][_nftId];
        require(
            Registry[PropertyIndex].owner == msg.sender,
            "Only the owner of this NFT can access it"
        );
        Registry[PropertyIndex].hasFractionalized = true;

        //Awaiting fractiontoken contract from jerry.
        // FractionToken fractionToken = new FractionToken(_nftContractAddress, _nftId, msg.sender, _supply, _tokenName, _tokenSymbol, address(this));
        // Registry[index].fractionContractAddress = address(fractionToken);
        //An approve function needed from script after function call.
    }

    function buyPropertyInstallMent(
        uint _amount,
        uint _nftID,
        address _nftContractAddress
    ) public payable {
        uint amountToPay = 0.0000002 ether * _amount;
        uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftID];
        ERC20 FractionedERC20token = ERC20(
            Registry[propertyIndex].fractionContractAddress
        );
        require(
            Registry[propertyIndex].isBuyer == address(0x0) ||
                Registry[propertyIndex].isBuyer == msg.sender,
            "Not available"
        );
        require(Registry[propertyIndex].propertyStatus == Status.sale, 'for sale only');
        require(msg.value == amountToPay, "not enough eth");
        require(_amount <= FractionedERC20token.totalSupply());
        require(Registry[propertyIndex].hasFractionalized, "buyoff only");

        if (block.timestamp > Registry[propertyIndex].InitialdepositTimestamp + 30 days){
            uint afterDamagesdeduction = (Registry[propertyIndex].amountPaid *
                70) / 100;
            Registry[propertyIndex].amountPaid = 0;
            (bool sent, ) = payable(Registry[propertyIndex].isBuyer).call{
                value: afterDamagesdeduction
            }("");
            require(sent, "Failed to send Ether");
            Registry[propertyIndex].isBuyer == address(0x0);
        }
        if (Registry[propertyIndex].isBuyer == address(0x0)) {
            FractionedERC20token.transferFrom( Registry[propertyIndex].owner, msg.sender, _amount
            );
            Registry[propertyIndex].isBuyer = msg.sender;
            Registry[propertyIndex].amountPaid += amountToPay;
            Registry[propertyIndex].InitialdepositTimestamp = block.timestamp;
        }
        if (Registry[propertyIndex].isBuyer == msg.sender) {
            Registry[propertyIndex].amountPaid += amountToPay;
        }

        if (FractionedERC20token.balanceOf(msg.sender) == FractionedERC20token.totalSupply()) {
            Registry[propertyIndex].isSold = true;
        }
    }


    function getRefundOnProperty(
        address _nftContractAddress,
        uint256 _nftId
    ) external {
        uint256 propIndex = PropertyNftIndex[_nftContractAddress][_nftId];

        ERC20 FractionedERC20token = ERC20(
            Registry[propIndex].fractionContractAddress
        );

        require(msg.sender == Registry[propIndex].owner, "NOT PROPERTY OWNER");

        require(
            block.timestamp >=
                Registry[propIndex].InitialdepositTimestamp + 31 days,
            "NOT EXPIRED YET"
        );

        require(Registry[propIndex].isSold = false, "Property Sold");

        FractionedERC20token.transferFrom(
            Registry[propIndex].isBuyer,
            msg.sender,
            Registry[propIndex].amountPaid
        );
    }
}
