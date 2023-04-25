// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721Receiver.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/utils/ERC721Holder.sol";
// import './FractionToken.sol';

//0.00001 per 50 erc20 token;

contract NeutrinoEstate {  
    enum Status {sale, rent}
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
    }
    PropertyInfo[] Registry;
    uint[] NFTIDs;
    mapping(address => mapping (uint256 => uint256)) PropertyNftIndex;


function depositPropertyNft(address _nftContractAddress, uint256 _nftId, Status _status ) public {
        ERC721 NFT = ERC721(_nftContractAddress);
        //approveFunction from script required
        NFT.safeTransferFrom(msg.sender, address(this), _nftId);
        PropertyInfo memory newProperty;
        newProperty.owner = msg.sender;
        newProperty.nftContractAddress = _nftContractAddress;
        newProperty.nftId = _nftId;
        newProperty.hasFractionalized = false;
        newProperty.propertyStatus = _status;
        PropertyNftIndex[_nftContractAddress][_nftId] = Registry.length - 1;
        Registry.push(newProperty);
        NFTIDs.push(_nftId);
    }

function createFraction(
        address _nftContractAddress,
        uint256 _nftId
        // uint256 _supply,
        // string memory _tokenName,
        // string memory _tokenSymbol
        ) 
        public {       
        uint256 PropertyIndex = PropertyNftIndex[_nftContractAddress][_nftId];
        require(Registry[PropertyIndex].owner == msg.sender, "Only the owner of this NFT can access it");           
        Registry[PropertyIndex].hasFractionalized = true;
        
        //Awaiting fractiontoken contract from jerry.       
        // FractionToken fractionToken = new FractionToken(_nftContractAddress, _nftId, msg.sender, _supply, _tokenName, _tokenSymbol);
        // Registry[index].fractionContractAddress = address(fractionToken);
        //An approve function needed from script after function call.
    }

function buyPropertyInstallMent(uint _amount, uint _nftID, address _nftContractAddress)public payable{
    uint amountToPay = 0.0000002 ether * _amount;
    uint propertyIndex = PropertyNftIndex[_nftContractAddress][_nftID];  
    ERC20 FractionedERC20token = ERC20(Registry[propertyIndex].fractionContractAddress);
    require(Registry[propertyIndex].isBuyer == address(0x0) || Registry[propertyIndex].isBuyer == msg.sender , 'Not available');
    require(msg.value == amountToPay, 'not enough eth');
    require(_amount <= FractionedERC20token.totalSupply());
    require(Registry[propertyIndex].hasFractionalized, 'buyoff only');
    
    if(block.timestamp > Registry[propertyIndex].InitialdepositTimestamp + 30 days ){
        uint afterDamagesdeduction = (Registry[propertyIndex].amountPaid * 70)/100;
        Registry[propertyIndex].amountPaid = 0;
        (bool sent, ) = payable(Registry[propertyIndex].isBuyer).call{value: afterDamagesdeduction}("");
        require(sent, "Failed to send Ether");
    }
    if(Registry[propertyIndex].isBuyer == address(0x0)){
    FractionedERC20token.transferFrom(Registry[propertyIndex].owner, msg.sender, _amount);
    Registry[propertyIndex].isBuyer = msg.sender;
    Registry[propertyIndex].amountPaid += amountToPay;
    Registry[propertyIndex].InitialdepositTimestamp = block.timestamp;   
    }
    if(Registry[propertyIndex].isBuyer == msg.sender){
        Registry[propertyIndex].amountPaid += amountToPay;
    }
     
    if(FractionedERC20token.balanceOf(msg.sender) == FractionedERC20token.totalSupply()){
         Registry[propertyIndex].isSold = true;
    }
}



}