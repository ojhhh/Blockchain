// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    uint256 count = 0;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    function minting(uint256 _tokenId) public {
        count += 1;
        _mint(msg.sender, _tokenId);
    }

    // json 해시주소
    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        return "QmQBg2T8bLtBSo4asjmheBoWoRviXLLSC6cUhdhRciMsTW";
    }

    // pinata 기본경로
    function _baseURI() internal view override returns (string memory) {
        return "https://lime-rear-fowl-220.mypinata.cloud/ipfs/";
    }

    // 발생된 전체 NFT의 수
    function getCount() public view returns (uint256) {
        return count;
    }
}
