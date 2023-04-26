// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721Receiver.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/utils/ERC721Holder.sol";
import "./NeuFractionToken.sol";

//0.00001 per 50 erc20 token;

contract NeutrinoEstate is IERC721Receiver {
    enum Status {
        sale,
        rent
    }

    struct Rent {
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
    uint[] public ForSaleNFTIDs;
    uint[] public ForRentNFTIDS;
    mapping(address => mapping(uint256 => uint256)) PropertyNftIndex;
    mapping(address => mapping(address => defaulter)) Defaulter;
    uint private damagesAccumulated;
    uint private commissionAccumulated;
    mapping(uint => Rent) rented;
    mapping(uint => PropertyInfo) property;

    constructor() {}

    function depositPropertyNft(
        address _nftContractAddress,
        uint256 _nftId,
        uint _status,
        uint _price
    ) external {
        ERC721URIStorage NFT = ERC721URIStorage(_nftContractAddress);
        //approveFunction from script required
        require(_status == 0 || _status == 1, "invalid option");
        NFT.safeTransferFrom(msg.sender, address(this), _nftId);
        PropertyInfo memory newProperty;
        newProperty.owner = msg.sender;
        newProperty.nftContractAddress = _nftContractAddress;
        newProperty.nftId = _nftId;
        newProperty.hasFractionalized = false;
        if (_status == 0) {
            newProperty.propertyStatus = Status.sale;
            ForSaleNFTIDs.push(_nftId);
        }
        if (_status == 1) {
            newProperty.propertyStatus = Status.rent;
            ForRentNFTIDS.push(_nftId);
        }
        newProperty.price = _price;
        Registry.push(newProperty);

        PropertyNftIndex[_nftContractAddress][_nftId] = Registry.length - 1;
    }

    function createFraction(
        address _nftContractAddress,
        uint256 _nftId,
        uint256 _supply
    ) external returns (address) {
        uint256 PropertyIndex = PropertyNftIndex[_nftContractAddress][_nftId];
        require(
            Registry[PropertyIndex].owner == msg.sender,
            "Only the owner of this NFT can access it"
        );
        Registry[PropertyIndex].hasFractionalized = true;
        FractionToken fractionToken = new FractionToken(
            _nftContractAddress,
            _nftId,
            msg.sender,
            _supply,
            "MyToken",
            "myt",
            address(this)
        );
        Registry[PropertyIndex].fractionContractAddress = address(
            fractionToken
        );
        return address(fractionToken);
        //An approve function needed from script after function call.
    }

    function buyPropertyInstallMent(
        uint _amount,
        uint _nftID,
        address _nftContractAddress
    ) external payable {
        //call approval to easen the removal of token in case of default.
        uint amountToPay = 0.0000002 ether * _amount;
        uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftID];
        FractionToken FractionedERC20token = FractionToken(
            Registry[propertyIndex].fractionContractAddress
        );
        require(
            Registry[propertyIndex].isBuyer == address(0x0) ||
                Registry[propertyIndex].isBuyer == msg.sender,
            "Not available"
        );
        require(
            Registry[propertyIndex].propertyStatus == Status.sale,
            "for sale only"
        );
        require(msg.value == amountToPay, "not enough eth");
        require(_amount <= FractionedERC20token.totalSupply());
        require(Registry[propertyIndex].hasFractionalized, "No buyoff");
        require(!Registry[propertyIndex].isSold, "property Sold");
        if (
            block.timestamp >=
            Registry[propertyIndex].InitialdepositTimestamp + 90 days
        ) revert("time has passed");
        if (Registry[propertyIndex].isBuyer == msg.sender) {
            FractionedERC20token.transferFrom(
                Registry[propertyIndex].owner,
                msg.sender,
                _amount
            );
            Registry[propertyIndex].amountPaid += amountToPay;
        }
        if (Registry[propertyIndex].isBuyer == address(0x0)) {
            FractionedERC20token.transferFrom(
                Registry[propertyIndex].owner,
                msg.sender,
                _amount
            );
            Registry[propertyIndex].isBuyer = msg.sender;
            Registry[propertyIndex].amountPaid += amountToPay;
            Registry[propertyIndex].InitialdepositTimestamp = block.timestamp;
        }
    }

    function claimProperty(
        address _nftContractAddress,
        uint256 _nftId
    ) external {
        uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftId];
        FractionToken FractionedERC20token = FractionToken(
            Registry[propertyIndex].fractionContractAddress
        );
        ERC721URIStorage nftAddress = ERC721URIStorage(_nftContractAddress);
        require(Registry[propertyIndex].isBuyer == msg.sender, "not buyer");
        require(
            FractionedERC20token.balanceOf(msg.sender) ==
                FractionedERC20token.totalSupply(),
            "payment outstanding"
        );
        Registry[propertyIndex].isSold = true;
        nftAddress.safeTransferFrom(address(this), msg.sender, _nftId);
        FractionedERC20token.burn(
            FractionedERC20token.balanceOf(msg.sender),
            msg.sender
        );
    }

    function RetrievePropertyOnDefault(
        address _nftContractAddress,
        uint256 _nftId
    ) external {
        uint256 propIndex = PropertyNftIndex[_nftContractAddress][_nftId];
        FractionToken FractionedERC20token = FractionToken(
            Registry[propIndex].fractionContractAddress
        );
        require(msg.sender == Registry[propIndex].owner, "NOT PROPERTY OWNER");
        require(
            Registry[propIndex].isBuyer != address(0x0),
            "buying in progress"
        );
        require(
            block.timestamp >=
                Registry[propIndex].InitialdepositTimestamp + 90 days,
            "NOT EXPIRED YET"
        );
        require(!Registry[propIndex].isSold, "Property Sold");
        require(
            FractionedERC20token.balanceOf(Registry[propIndex].isBuyer) !=
                FractionedERC20token.totalSupply(),
            "payment completed"
        );
        FractionedERC20token.transferFrom(
            Registry[propIndex].isBuyer,
            msg.sender,
            FractionedERC20token.balanceOf(Registry[propIndex].isBuyer)
        );
        uint afterDamagesdeduction = (Registry[propIndex].amountPaid * 70) /
            100;
        uint damagesForSeller = (Registry[propIndex].amountPaid * 20) / 100;
        uint damageCommision = (Registry[propIndex].amountPaid * 10) / 100;
        damagesAccumulated += damageCommision;
        Defaulter[Registry[propIndex].isBuyer][_nftContractAddress]
            .defaulterAddress = Registry[propIndex].isBuyer;
        Defaulter[Registry[propIndex].isBuyer][_nftContractAddress]
            .balanceAfterDamages = afterDamagesdeduction;
        Registry[propIndex].amountPaid = 0;
        (bool Ownersent, ) = payable(Registry[propIndex].owner).call{
            value: damagesForSeller
        }("");
        require(Ownersent, "Failed to send Ether");
        Registry[propIndex].isBuyer = address(0x0);
    }

    function reclaimAmountPaid(
        address _nftContractAddress,
        uint256 _nftId
    ) external {
        uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftId];
        require(
            Defaulter[msg.sender][_nftContractAddress].defaulterAddress ==
                msg.sender,
            "Not a defaulter"
        );
        if (
            block.timestamp >=
            Registry[propertyIndex].InitialdepositTimestamp + 90 days
        ) {
            uint afterDamagesdeduction = Defaulter[msg.sender][
                _nftContractAddress
            ].balanceAfterDamages;
            (bool sent, ) = payable(Registry[propertyIndex].isBuyer).call{
                value: afterDamagesdeduction
            }("");
            require(sent, "Failed to send Ether");
        } else {
            revert("cannot reclaim yet");
        }
    }

    function claimPaymentOnProperty(
        address _nftContractAddress,
        uint256 _nftId
    ) external {
        uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftId];
        FractionToken FractionedERC20token = FractionToken(
            Registry[propertyIndex].fractionContractAddress
        );
        require(Registry[propertyIndex].owner == msg.sender, "not owner");
        require(
            FractionedERC20token.balanceOf(Registry[propertyIndex].isBuyer) ==
                FractionedERC20token.totalSupply(),
            "payment not complete"
        );
        uint payment = (Registry[propertyIndex].amountPaid * 80) / 100;
        uint commissionOnsales = (Registry[propertyIndex].amountPaid * 20) /
            100;
        commissionAccumulated += commissionOnsales;
        (bool sent, ) = payable(Registry[propertyIndex].owner).call{
            value: payment
        }("");
        require(sent, "Failed to send Ether");
    }

    function exitProperty(
        address _nftContractAddress,
        uint256 _nftId,
        uint _status
    ) external returns (uint[] memory, uint[] memory) {
        uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftId];
        ERC721URIStorage nftAddress = ERC721URIStorage(_nftContractAddress);
        FractionToken FractionedERC20token = FractionToken(
            Registry[propertyIndex].fractionContractAddress
        );
        require(_status == 0 || _status == 1, "invalid option");
        if (_status == 0) {
            require(
                Registry[propertyIndex].propertyStatus == Status.sale,
                "invalid status"
            );
        }
        if (_status == 1) {
            require(
                Registry[propertyIndex].propertyStatus == Status.rent,
                "invalid status"
            );
        }
        require(
            Registry[propertyIndex].isBuyer == address(0x0),
            "buying in progress"
        );
        require(rented[_nftId].tenant == address(0x0), "apartment in rent");
        require(Registry[propertyIndex].owner == msg.sender, "not owner");
        nftAddress.safeTransferFrom(address(this), msg.sender, _nftId);
        FractionedERC20token.burn(
            FractionedERC20token.balanceOf(msg.sender),
            msg.sender
        );

        if (Registry[propertyIndex].propertyStatus == Status.sale) {
            uint length = ForSaleNFTIDs.length;
            if (length == 1) {
                ForSaleNFTIDs.pop();
            } else {
                uint[] memory nftIDMemory = new uint[](length);
                nftIDMemory = ForSaleNFTIDs;
                for (uint i = 0; i < length; i++) {
                    if (nftIDMemory[i] == _nftId) {
                        nftIDMemory[i] = nftIDMemory[nftIDMemory.length - 1];
                        ForSaleNFTIDs = nftIDMemory;
                    }
                }
                ForSaleNFTIDs.pop();
            }
        }
        if (Registry[propertyIndex].propertyStatus == Status.rent) {
            uint length = ForSaleNFTIDs.length;
            if (length == 1) {
                ForRentNFTIDS.pop();
            }
            uint[] memory nftIDMemory = new uint[](length);
            nftIDMemory = ForRentNFTIDS;
            for (uint i = 0; i < length; i++) {
                if (nftIDMemory[i] == _nftId) {
                    nftIDMemory[i] = nftIDMemory[nftIDMemory.length - 1];
                    ForRentNFTIDS = nftIDMemory;
                }
                ForRentNFTIDS.pop();
            }
        }
        return (ForSaleNFTIDs, ForRentNFTIDS);
    }

    //     function RentProperty(uint _amt, uint _nftID, address _nftContractAddress) public payable{
    //         uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftID];
    //         FractionToken FractionedERC20token = FractionToken(Registry[propertyIndex].fractionContractAddress);
    //         uint amountInToken = FractionedERC20token.totalSupply()/2;
    //         uint amountToPay = 0.0000002 ether * amountInToken;

    // //@audit
    //         PropertyInfo storage rentedproperty = property[_nftID];
    //         require(rentedproperty.propertyStatus==Status.rent, "propert not for rent");
    //         require(rentedproperty.isRented == false, "property already rented out");
    //         require(rentedproperty.owner != address(0), "property does not exist");

    //         Rent storage newRent = rented[_nftID];
    //         require (msg.value == amountToPay, "insufficient amount");
    //         require (newRent.owner == rentedproperty.owner, "shay u dey whyne me ni");
    //         newRent.tenant=msg.sender;
    //         newRent.timestart=block.timestamp;
    //         FractionToken token = FractionToken(rentedproperty.fractionContractAddress);
    //         require( token.transferFrom(rentedproperty.owner, msg.sender, _amt), "Renting failed");
    //    }

    //    function stopRent(uint _nftID)  public{
    // //@audit
    //      PropertyInfo storage rentedproperty = property[_nftID];

    //      Rent storage newRent = rented[_nftID];
    //         if (block.timestamp > (newRent.duration + newRent.timestart)) {

    // //@audit
    //         rentedproperty.isRented = false;

    //         FractionToken token = FractionToken(rentedproperty.fractionContractAddress);
    //         token.transferFrom(newRent.tenant, newRent.owner, newRent.amount);
    //         return;
    //     }

    //    }

    //@audit
    //   function getAllProperties() public view returns (PropertyInfo[] memory) {
    //     PropertyInfo[] memory allProperties = new PropertyInfo[](NFTIDs.length);
    //     for (uint i = 0; i < NFTIDs.length; i++) {
    //         allProperties[i] = property[NFTIDs[i]];
    //     }
    //     return allProperties;
    // }

    function onERC721Received(
        address,
        address from,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
