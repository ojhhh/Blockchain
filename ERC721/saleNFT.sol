// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./myNFT.sol";

// 판매등록을 했을때 정보를 담기 위한 컨트랙트
contract SaleNFT {
    // 상호작용할 CA의 주소 필요
    // myNFT.sol 파일 안에 MyNFT 컨트랙트를 _nft로 받음
    MyNFT public _nft;

    // CA 상호작용할 컨트랙트를 담을 상태 변수
    constructor(address _nftCA) {
        // 상호작용할 CA 인스턴스 생성
        _nft = MyNFT(_nftCA);
    }

    function _saleNFTmint(string memory url) public {
        // CA에서 CA로 메세지 전송
        _nft.minting(url);
    }

    // 판매에 대한 내용의 함수 작성
    // saleNFT에서 myNFT 메세지를 보내서 NFT권한을 위임받는 함수를 실행
    function setApprovalForAll() public {
        // 판매 컨트랙트가 지금 컨트랙트를 실행 시킨 사람의 NFT의 모든 권한을 위임 받음
        // address(this) : 지금 CA의 주소
        _nft.setAppAll(msg.sender, address(this), true);
    }

    // 위임 받은게 맞는지 검증
    function salesNFT() public view returns (bool) {
        // 실행 시킨 사람이 판매 컨트랙트에게 NFT에게 권한을 위임했는지 확인
        return _nft.isApprovedForAll(msg.sender, address(this));
    }

    // 판매 내용
    // 누가 판매등록 했는지 담을 상태변수
    // 금액은 얼마인지 판매 기간, 구매자가 나타나면 판매자가 수락하는 방식 등
    // EOA에서 CA를 바로 보낼 순 없으니 구매자가 구매 신청을하면 구매자가 가지고 있는 금액을 CA로 보내고 판매자가 수락을 하면 CA에서 판매자에게 금액를 보냄
}
