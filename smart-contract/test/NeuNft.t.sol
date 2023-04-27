// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Test.sol";
import "../src/NeuNFT.sol";
import "../src/NeutrinoEstate.sol";

contract NeuNFTTest is Test {
    NeuNFT public nft;
    NeutrinoEstate public estate;

    address owner = mkaddr("owner");

    function setUp() public {
        estate = new NeutrinoEstate();
        nft = new NeuNFT();
    }

    function testSafeMint() public {
        vm.prank(owner);
        nft.safeMint("QmbEgRoiC7SG9d6oY5uDpkKx8BikE3vMWYi6M75Kns68N6", address(estate));
        assertEq(nft.balanceOf(address(owner)), 1);
        assertEq(nft.ownerOf(0) , address(owner));
    }

 function mkaddr(string memory name) public returns (address) {
        address addr = address(
            uint160(uint256(keccak256(abi.encodePacked(name))))
        );
        vm.label(addr, name);
        return addr;
    }
}
