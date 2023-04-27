// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "../src/NeutrinoEstate.sol";
import "../src/NeuNFT.sol";
// import "../src/NeuFractionToken.sol";


contract EstateTest is Test {
    NeutrinoEstate estate;
    NeuNFT nfttoken;
    address Fractionned;
    enum Status {sale, rent}
    address seller = mkaddr("seller");
    address seller2 = mkaddr("seller2");
    address buyer = mkaddr("buyer");
    address owner = mkaddr("owner");
    address tenant = mkaddr("tenant");
    function setUp() public {
        vm.startPrank(owner);
        estate = new NeutrinoEstate();
        nfttoken = new NeuNFT();
        vm.stopPrank();
    }

function testMintAndDepositAndFraction() public {
    vm.startPrank(seller);
    nfttoken.safeMint("bafybeigamlmm7clu7a7fwo6ujv4zrwslk7v54pm2kb4dl7nimo5obh3h7i", address(estate));
    estate.depositPropertyNft(address(nfttoken), 0, 0, 1 ether);
    address fractioned = estate.createFraction(address(nfttoken), 0, 1000);
    Fractionned = fractioned;
    FractionToken(Fractionned).approve(address(estate), FractionToken(Fractionned).totalSupply());
    vm.stopPrank();

    vm.startPrank(seller2);
    nfttoken.safeMint("bafybeigamlmm7clu7a7fwo6ujv4zrwslk7v54pm2kb4dl7nimo5obh3h7i", address(estate));
    estate.depositPropertyNft(address(nfttoken), 1, 0, 1 ether);
    address fractionedt = estate.createFraction(address(nfttoken), 1, 1000);
    Fractionned = fractionedt;
    FractionToken(fractionedt).approve(address(estate), FractionToken(fractionedt).totalSupply());
    vm.stopPrank();

}
function testMintAndDepositAndfraction() public {
    vm.startPrank(seller);
    nfttoken.safeMint("bafybeigamlmm7clu7a7fwo6ujv4zrwslk7v54pm2kb4dl7nimo5obh3h7i", address(estate));
    estate.depositPropertyNft(address(nfttoken), 0, 1, 1 ether);
    address fractioned = estate.createFraction(address(nfttoken), 0, 1000);
    Fractionned = fractioned;
    FractionToken(Fractionned).approve(address(estate), FractionToken(Fractionned).totalSupply());
    vm.stopPrank();

    vm.startPrank(seller2);
    nfttoken.safeMint("bafybeigamlmm7clu7a7fwo6ujv4zrwslk7v54pm2kb4dl7nimo5obh3h7i", address(estate));
    estate.depositPropertyNft(address(nfttoken), 1, 0, 1 ether);
    address fractionedt = estate.createFraction(address(nfttoken), 1, 1000);
    Fractionned = fractionedt;
    FractionToken(fractionedt).approve(address(estate), FractionToken(fractionedt).totalSupply());
    vm.stopPrank();

}

function testBuyPropinstallment () public{
    testMintAndDepositAndFraction();
    vm.startPrank(buyer);
    vm.deal(buyer, 5 ether);
    FractionToken(Fractionned).approve(address(estate), FractionToken(Fractionned).totalSupply());
    estate.buyPropertyInstallMent{value: 0.0001 ether}(500, 0, address(nfttoken));
    estate.buyPropertyInstallMent{value: 0.0001 ether}(500, 0, address(nfttoken));
    estate.claimProperty(address(nfttoken), 0);
    vm.stopPrank();
}

// function testretrieveONDefault() public {
//     testBuyPropinstallment();
//     vm.warp(91 days);
//     vm.startPrank(seller);
//     estate.RetrievePropertyOnDefault(address(nfttoken), 0); 
//     vm.stopPrank();
//     vm.startPrank(buyer);
//     estate.reclaimAmountPaid(address(nfttoken), 0);
//     vm.stopPrank();
// }

    function testRent() public {
        testMintAndDepositAndfraction();
        vm.startPrank(tenant);
        vm.deal(tenant, 100 ether);
        estate.RentProperty{value: 1 ether}(0, address(nfttoken));
        vm.stopPrank();
    }
function testpaymentClaim() public {
    testBuyPropinstallment();
    vm.startPrank(seller);
    estate.claimPaymentOnProperty(address(nfttoken), 0);
}

function testExitProperty () public{
    testMintAndDepositAndFraction();
    vm.startPrank(seller2);
    estate.exitProperty(address(nfttoken), 1, 0);
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