// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721Receiver.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/utils/ERC721Holder.sol";
import './NeuFractionToken.sol';

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
        uint price;
        uint256 supply;
        bool hasFractionalized;
        address isBuyer;
        uint amountPaid;
        bool isSold;
        bool isRented;
    }
    struct defaulter {
        address defaulterAddress;
        uint balanceAfterDamages;
    }

    PropertyInfo[] Registry;
    uint[] NFTIDs;
    mapping(address => mapping(uint256 => uint256)) PropertyNftIndex;
    mapping(address => mapping(address => defaulter)) Defaulter;
    uint private damagesAccumulated;
    uint private commissionAccumulated;
    mapping(uint => Rent) rented;
    mapping(uint => PropertyInfo) property;
    constructor(){}

    function depositPropertyNft(address _nftContractAddress, uint256 _nftId,  Status _status, uint _price) external {
        ERC721URIStorage NFT = ERC721URIStorage(_nftContractAddress);
        //approveFunction from script required
        NFT.safeTransferFrom(msg.sender, address(this), _nftId);
        PropertyInfo memory newProperty;
        newProperty.owner = msg.sender;
        newProperty.nftContractAddress = _nftContractAddress;
        newProperty.nftId = _nftId;
        newProperty.hasFractionalized = false;
        newProperty.propertyStatus = _status;
        if (newProperty.propertyStatus==Status.rent){
                Rent memory newrent = rented[_nftId];
                newrent.owner=msg.sender;
                newrent.amount = _price;
        }
        newProperty.price = _price;
        Registry.push(newProperty);
        PropertyNftIndex[_nftContractAddress][_nftId] = Registry.length - 1;
        NFTIDs.push(_nftId);

    }

    function createFraction(address _nftContractAddress, uint256 _nftId, uint256 _supply, string memory _tokenName, string memory _tokenSymbol) external returns(address) {
        uint256 PropertyIndex = PropertyNftIndex[_nftContractAddress][_nftId];
        require(Registry[PropertyIndex].owner == msg.sender, "Only the owner of this NFT can access it");
        Registry[PropertyIndex].hasFractionalized = true;
        FractionToken fractionToken = new FractionToken(_nftContractAddress, _nftId, msg.sender, _supply, _tokenName, _tokenSymbol, address(this));
        Registry[PropertyIndex].fractionContractAddress = address(fractionToken);
        return address(fractionToken);
        //An approve function needed from script after function call.
    }

    function buyPropertyInstallMent(uint _amount, uint _nftID, address _nftContractAddress) external payable {
        //call approval to easen the removal of token in case of default.
        uint amountToPay = 0.0000002 ether * _amount;
        uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftID];
        FractionToken FractionedERC20token = FractionToken(Registry[propertyIndex].fractionContractAddress);
        require(Registry[propertyIndex].isBuyer == address(0x0) || Registry[propertyIndex].isBuyer == msg.sender,"Not available");
        require(Registry[propertyIndex].propertyStatus == Status.sale, 'for sale only');
        require(msg.value == amountToPay, "not enough eth");
        require(_amount <= FractionedERC20token.totalSupply());
        require(Registry[propertyIndex].hasFractionalized, "No buyoff");
        require(!Registry[propertyIndex].isSold, 'property Sold');
        if(block.timestamp >= Registry[propertyIndex].InitialdepositTimestamp + 90 days) revert('time has passed');
        if(Registry[propertyIndex].isBuyer == address(0x0)) {
            FractionedERC20token.transferFrom( Registry[propertyIndex].owner, msg.sender, _amount);
            Registry[propertyIndex].isBuyer = msg.sender;
            Registry[propertyIndex].amountPaid += amountToPay;
            Registry[propertyIndex].InitialdepositTimestamp = block.timestamp;
        }
        if(Registry[propertyIndex].isBuyer == msg.sender) {
            FractionedERC20token.transferFrom(Registry[propertyIndex].owner, msg.sender, _amount);
            Registry[propertyIndex].amountPaid += amountToPay;
        }
    }
    function claimProperty(address _nftContractAddress, uint256 _nftId) external {
        uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftId];
        FractionToken FractionedERC20token = FractionToken(Registry[propertyIndex].fractionContractAddress);
        ERC721URIStorage nftAddress = ERC721URIStorage(_nftContractAddress);
        require(Registry[propertyIndex].isBuyer == msg.sender, 'not buyer');
        require(FractionedERC20token.balanceOf(msg.sender) == FractionedERC20token.totalSupply(), 'payment outstanding');
            Registry[propertyIndex].isSold = true;
            nftAddress.safeTransferFrom(address(this), msg.sender, _nftId);
            FractionedERC20token.burn(FractionedERC20token.balanceOf(msg.sender), msg.sender);
    }

    function RetrievePropertyOnDefault(address _nftContractAddress, uint256 _nftId) external {
        uint256 propIndex = PropertyNftIndex[_nftContractAddress][_nftId];
        FractionToken FractionedERC20token = FractionToken(Registry[propIndex].fractionContractAddress);
        require(msg.sender == Registry[propIndex].owner, "NOT PROPERTY OWNER");
        require(Registry[propIndex].isBuyer != address(0x0), 'buying in progress');       
        require(block.timestamp >= Registry[propIndex].InitialdepositTimestamp + 90 days, "NOT EXPIRED YET");
        require(Registry[propIndex].isSold = false, "Property Sold");
        FractionedERC20token.transferFrom(Registry[propIndex].isBuyer, msg.sender, FractionedERC20token.balanceOf(Registry[propIndex].isBuyer));      
        uint afterDamagesdeduction = (Registry[propIndex].amountPaid * 70) / 100;
        uint damagesForSeller = (Registry[propIndex].amountPaid * 20) / 100;
        uint damageCommision = (Registry[propIndex].amountPaid * 10) / 100;
        damagesAccumulated += damageCommision;
        Defaulter[Registry[propIndex].isBuyer][_nftContractAddress].defaulterAddress = Registry[propIndex].isBuyer;
        Defaulter[Registry[propIndex].isBuyer][_nftContractAddress].balanceAfterDamages = afterDamagesdeduction;
        Registry[propIndex].amountPaid = 0;
         (bool Ownersent, ) = payable(Registry[propIndex].owner).call{value: damagesForSeller}("");
        require(Ownersent, "Failed to send Ether");
        Registry[propIndex].isBuyer = address(0x0);
    }

    function reclaimAmountPaid(address _nftContractAddress, uint256 _nftId) external {
        uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftId];
        require(Defaulter[msg.sender][_nftContractAddress].defaulterAddress == msg.sender, 'Not a defaulter');
        if(block.timestamp >= Registry[propertyIndex].InitialdepositTimestamp + 90 days){
           uint afterDamagesdeduction = Defaulter[msg.sender][_nftContractAddress].balanceAfterDamages;
            (bool sent, ) = payable(Registry[propertyIndex].isBuyer).call{value: afterDamagesdeduction}("");
            require(sent, "Failed to send Ether");
        }else {
            revert('cannot reclaim yet');
        }
    }

    function claimPaymentOnProperty(address _nftContractAddress, uint256 _nftId) external {
        uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftId];
        require(Registry[propertyIndex].isSold, 'in sale');
        require(Registry[propertyIndex].owner == msg.sender, 'not owner');
        uint payment = (Registry[propertyIndex].amountPaid * 80) / 100;
        uint commissionOnsales = (Registry[propertyIndex].amountPaid * 20) / 100;
        commissionAccumulated += commissionOnsales;
        (bool sent, ) = payable(Registry[propertyIndex].owner).call{value: payment}("");
            require(sent, "Failed to send Ether");
    }

    function exitProperty(address _nftContractAddress, uint256 _nftId)external {
        uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftId];
        ERC721URIStorage nftAddress = ERC721URIStorage(_nftContractAddress);
        FractionToken FractionedERC20token = FractionToken(Registry[propertyIndex].fractionContractAddress);
        require(Registry[propertyIndex].isBuyer == address(0x0), 'buying in progress');
        require(rented[_nftId].tenant == address(0x0), 'apartment in rent');
        require(Registry[propertyIndex].owner == msg.sender, 'not owner');
        nftAddress.safeTransferFrom(address(this), msg.sender, _nftId);
        FractionedERC20token.burn(FractionedERC20token.balanceOf(msg.sender), msg.sender);
        uint length = NFTIDs.length;
        uint[] memory nftIDMemory = new uint[](length);
        nftIDMemory = NFTIDs;
        for(uint i = 0; i < length; i++){
            if(nftIDMemory[i] == _nftId){
                nftIDMemory[i] = nftIDMemory[nftIDMemory.length - 1];
                NFTIDs = nftIDMemory;
            }
        }
        NFTIDs.pop();
    }



    function RentProperty(uint _amt, uint _nftID, address _nftContractAddress) public payable{                 
        uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftID];
        FractionToken FractionedERC20token = FractionToken(Registry[propertyIndex].fractionContractAddress);
        uint amountInToken = FractionedERC20token.totalSupply()/2; 
        uint amountToPay = 0.0000002 ether * amountInToken;
        PropertyInfo memory rentedproperty = Registry[propertyIndex];
        require(rentedproperty.propertyStatus==Status.rent, "propert not for rent");
        require(rentedproperty.isRented == false, "property already rented out");
        require(rentedproperty.owner != address(0), "property does not exist");
        Rent storage newRent = rented[_nftID];
        require (msg.value == amountToPay, "insufficient amount");       
        require (newRent.owner == rentedproperty.owner, "shay u dey whyne me ni");
        newRent.tenant=msg.sender;
        newRent.timestart=block.timestamp;
        FractionToken token = FractionToken(rentedproperty.fractionContractAddress);
        require( token.transferFrom(rentedproperty.owner, msg.sender, _amt), "Renting failed");
   }

   function stopRent(uint _nftID, address _nftContractAddress)  public{
    uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftID];
    PropertyInfo memory rentedproperty = Registry[propertyIndex];
     Rent storage newRent = rented[_nftID];
    require(msg.sender==rentedproperty.owner || msg.sender==newRent.tenant, "not authorised");
        if (block.timestamp > (newRent.duration + newRent.timestart + 5184000)) {
        rentedproperty.isRented = false;
        newRent.tenant=address(0);
        
        FractionToken token = FractionToken(rentedproperty.fractionContractAddress);
        token.transferFrom(newRent.tenant, newRent.owner, newRent.amount);
        return;
    }

   }

    // function getAllProperties() public view returns (PropertyInfo[] memory) {
    //     PropertyInfo[] memory allProperties = new PropertyInfo[](NFTIDs.length);
    //     for (uint i = 0; i < NFTIDs.length; i++) {
    //         allProperties[i] = property[NFTIDs[i]];
    //     }
    //     return allProperties;
    // }

    function getAllProperties() public view returns (PropertyInfo[] memory) {
        return Registry;
    }


}
