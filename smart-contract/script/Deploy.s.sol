// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Script.sol";
import "../src/NeuNFT.sol";
import "../src/NeutrinoEstate.sol";
import "../src/NeuFractionToken.sol";

contract NeutrinoScript is Script {
    NeuNFT public nft;
    NeutrinoEstate public estate;
    FractionToken public fraction;

    address deployer = 0x31D97fdb6E31955Ad79899Eb0D28F2d0431684A0;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        estate = new NeutrinoEstate(deployer);
        nft = new NeuNFT();
        nft.safeMint("QmbEgRoiC7SG9d6oY5uDpkKx8BikE3vMWYi6M75Kns68N6", address(estate));
        fraction = new FractionToken(address(nft), 0, deployer, 100000, "Neutrino", "NTN", address(estate));
        vm.stopBroadcast();
    }
}
