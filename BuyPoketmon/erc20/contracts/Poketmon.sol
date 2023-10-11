// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC20.sol";

contract Poketmon is ERC20 {
  constructor() ERC20("Poketmon","PTK",100000){

  }

  // 포켓몬 객체 생성
  struct Pokets {
    string url;
    string name;
  }

  // 포켓몬빵 구매자들
  struct Users {
    address account;
  }

  // 토큰을 지불하여 포켓몬빵 구매
  // 여기서 ether는 실제 이더가 아닌 토큰을 뜻함
  uint256 private tokenPrice = 100 ether;

  // 포켓몬빵을 구매하면 나오는 스티커에 있는 포켓몬 이름 선언
  string[] poketmonName = ["Pikachu","Kobuk","Charmander"];

  // 포켓몬 이미지
  string[] poketmonUrl = ["https://thumb.mt.co.kr/06/2013/04/2013041421255316218_1.jpg/dims/optimize/","https://appdata.hungryapp.co.kr/profile/201506/29/M14355535972094763.jpg","https://s3.orbi.kr/data/file/united/2950631163_RdGbjcLv_710033550_PQnG7pHD_image_281029.jpeg"];


  // 
  mapping(address => Pokets[]) public poketmons;

  // 한번이라도 포켓몬 빵을 구매한 사람들의 주소
  Users[] public users;

  // 지갑주소가 가지고 있는 포켓몬 조회
  function getPoketmon() public view returns (Pokets[] memory) {
    return poketmons[msg.sender];
  }

  function getPoketmonUsers() public view returns (Users[] memory) {
    return users;
  }

  function buyPoketmon() public {
    require(balances[msg.sender] >= tokenPrice);
    balances[msg.sender] -= tokenPrice;
    totalSupply -= tokenPrice;

    uint random = uint(keccak256(
      abi.encodePacked(block.timestamp, block.coinbase, block.number)
    ));

    random = uint(random % 3);  // 0 ~ 2 까지의 랜덤값 생성
    poketmons[msg.sender].push(Pokets(poketmonUrl[random],poketmonName[random]));

  // 포켓몬빵을 구매한 적이 있는지 검사
  bool isUser = false;

    for (uint256 i = 0; i < users.length; i++){
      if(users[i].account == msg.sender) {
        isUser = true;
        break;
      }
    }

      if(!isUser) {
        users.push(Users(msg.sender));
      }
  }


}