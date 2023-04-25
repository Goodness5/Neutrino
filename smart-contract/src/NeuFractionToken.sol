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
    address Estate;

    constructor(address _NFTAddress, uint256  _NFTId, address _NFTOwner, uint256  _supply, string memory _tokenName, string memory _tokenSymbol, address _estate) ERC20(_tokenName, _tokenSymbol) {
        NFTAddress = _NFTAddress;
        NFTId = _NFTId;
        NFTOwner = _NFTOwner;       
        ContractDeployer = msg.sender;  
        Estate = _estate;  
        _mint(_NFTOwner, _supply);
    }

   function transfer(address to, uint256 amount) public override returns (bool) {
        require(balanceOf(msg.sender) == totalSupply(), 'cannot transfer');
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        require(balanceOf(from) + balanceOf(to) == totalSupply(), 'cannot use transferfrom');
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function burn(uint256 amount, address addressToBurn) public {
        require(msg.sender == Estate, 'not authorized');
        _burn(addressToBurn, amount);
    }

}