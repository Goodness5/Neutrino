// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../lib/openzeppelin-contracts/contracts/utils/Counters.sol";
contract NeuNFT is ERC721URIStorage{
      using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    constructor() ERC721("Neutrino", "NTN") {
    }

     function safeMint(string memory TokenUri, address _neutrinoEstateAddress) public {
        uint256 nftId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(msg.sender, nftId);
        _setTokenURI(nftId, TokenUri);
        setApprovalForAll(_neutrinoEstateAddress, true);
    }
    

}