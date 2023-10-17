// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    uint256 private _id = 0;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    struct nfts {
        uint256 tokenId;
        string jsonHash;
    }

    mapping(uint256 _id => string) private _tokenIds;

    function minting(string memory jsonHash) public {
        _tokenIds[_id] = jsonHash;
        _mint(msg.sender, _id);
        _id += 1;
    }

    // json 해시주소
    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        return _tokenIds[_tokenId];
    }

    // pinata 기본경로
    function _baseURI() internal view override returns (string memory) {
        return "https://lime-rear-fowl-220.mypinata.cloud/ipfs/";
    }

    // 발생된 전체 NFT의 수
    function getTokenIdLength() public view returns (uint256) {
        return _id;
    }

    function setAppAll(address owner, address operator, bool approved) public {
        _setApprovalForAll(_msgSender(), operator, approved);
    }
}
