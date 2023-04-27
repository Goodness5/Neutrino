// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Test.sol";
import "../src/NeuFractionToken.sol";
import "../src/NeuNFT.sol";


contract testFractionToken is Test {
    NeuNFT nft;    
    FractionToken fractionToken;
    address public NFTAddress;
    address NFTOwner= mkaddr("NFTOwner");
    address ContractDeploye = mkaddr("ContractDeploye");address[] tokenOwners;
    address Estate = mkaddr("Estate");
    address tenant = mkaddr("tenant");

    function setUp() public {
        nft = new NeuNFT();
        fractionToken = new FractionToken(NFTAddress, 1, NFTOwner, 1000, "my home", "MYH", Estate);
        vm.prank(NFTOwner);
        nft.safeMint("balablu", address(fractionToken));
    }


    function testtransfer() public{
            vm.startPrank(NFTOwner);
            fractionToken.transfer(tenant, 500);
            fractionToken.balanceOf(tenant);
            vm.stopPrank();
            // vm.startPrank(tenant);
            // fractionToken.transfer(Estate, 400);

        }
    function testTransferFrom() public{
        testtransfer();
        vm.prank(tenant);
        fractionToken.approve(Estate, 500);
        vm.startPrank(Estate);
        fractionToken.transferFrom(tenant, NFTOwner, 500);
        vm.stopPrank();

    }
function testburn() public{

    vm.startPrank(Estate);
    fractionToken.burn(500, NFTOwner);
    vm.stopPrank();
}
         function mkaddr(string memory name) public returns (address) {
        address addr = address(
            uint160(uint256(keccak256(abi.encodePacked(name))))
        );
        vm.label(addr, name);
        return addr;
    }
}