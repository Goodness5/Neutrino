// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
contract FractionToken is ERC20, ERC20Burnable {
    address public NFTAddress;
    uint256 public NFTId;
    address public NFTOwner;

    address public ContractDeployer;


    address[] tokenOwners;
    mapping(address => bool) isHolding;

    constructor(address _NFTAddress, uint256  _NFTId, address _NFTOwner, uint256  _supply, string memory _tokenName, string memory _tokenTicker) ERC20(_tokenName, _tokenTicker) {
        NFTAddress = _NFTAddress;
        NFTId = _NFTId;
        NFTOwner = _NFTOwner;
   
        
        ContractDeployer = msg.sender;
        
        _mint(_NFTOwner, _supply);
    }

    function transfer(address to, uint256 amount) override public returns (bool) {
        //calculate royalty fee
        uint royaltyFee = amount/ 100;
        uint afterRoyaltyFee = amount - royaltyFee;
        address owner = _msgSender();

        //send royalty fee to owner
        _transfer(owner, NFTOwner, royaltyFee);
        //send rest to receiver
        _transfer(owner, to, afterRoyaltyFee);
        
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);

        //calculate royalty fee
        uint royaltyFee = amount / 100;
        uint afterRoyaltyFee = amount - royaltyFee;

        //send royalty fee to owner
        _transfer(from, NFTOwner, royaltyFee);
        //send rest to receiver
        _transfer(from, to, afterRoyaltyFee);

        return true;
    }

    function burn(uint256 amount) public virtual override {
        _burn(_msgSender(), amount);
    }

    function updateNFTOwner(address _newOwner) public {
        require(msg.sender == ContractDeployer, "Only contract deployer can call this function");

        NFTOwner = _newOwner;
    }

    function returnTokenOwners() public view returns(address[] memory) {
        return tokenOwners;
    }
}