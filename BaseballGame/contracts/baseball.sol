// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Baseball {
  // 컴퓨터가 숫자 3개를 랜덤하게 뽑고
  // 이 숫자를 플레이어들이 맞추는 게임
  // 숫자를 입력해서 값을 비교하고 틀리면 그사람은 이더를 CA에 보냄
  // CA플레이어들이 게임을 하면서 모인 이더를 최종적으로 맞춘 사람에게 보상으로 줌
  // 게임 플레이어 횟수가 있는데 횟수만큼 진행했는데 못맞추면 보상은 아무도 갖지 못함 (컨트랙트 소유자가 가져감)

  // 컨트랙트 배포자
  address private owner;

  // 게임 횟수
  // constant 구문을 추가하면 상태를 변경하지 않은 상태 변수
  uint256 private constant GAME_COUNT = 5;

  // 게임을 하고싶으면 지불해야 하는 금액
  uint256 private ticket = 5 ether;

  // 정답을 담을 변수
  // 랜덤한 3개의 숫자가 들어감
  uint256 private random;

  // 게임의 진행도
  uint256 private progress;

  // 총 상금
  uint256 private reward;

  // 게임의 현재 상태
  enum GameStatus {
    Playing,
    GameOver
  }

  // 게임의 상태. 최초 상태값 0
  GameStatus gameStatus;

  // 컨트랙트 생성자
  // 컨트랙트가 배포되면 딱 1번 실행
  // 그렇기 때문에 배포한 사람이 Owner
  constructor(){
    owner = msg.sender;
    
    // keccak256 : 솔리디티에서 랜덤값을 뽑을때 사용. 매개변수를 해시값으로 변경
    // abi.encodePacked : 매개변수로 전달된 내용들을 가지고 바이트 배열로 만들어줌
    random = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, block.coinbase, block.number)));

    // 100 ~ 999 까지 범위 지정
    random = (random % 900) + 100;
  }

  // 유저의 값을 받아서 정답과 비교
  function gameStart(uint256 _value) public payable {
    require(progress < GAME_COUNT, "GameOver");
    require(msg.value == ticket, "ticket amount error. not enough 5 ether");
    require((_value >= 100) && (_value < 1000), "_value error (99 < _value < 1000)");

    progress += 1;

    if(_value == random){
      // 정답을 맞추면
      // CA의 잔액이 보상 만큼 있는지 검사
      require(reward <= address(this).balance);
      payable(msg.sender).transfer(address(this).balance);
      reward = 0;
      gameStatus = GameStatus.GameOver;
    } else {
      reward += msg.value;
    }

  }

  // 게임 재시작
  function gameRestart() public {

    // 랜덤 수 재생성
    random = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, block.coinbase, block.number)));
    random = (random % 900) + 100;

    // 진행도 초기화
    progress = 0;

    // 진행 상태 변경
    gameStatus = GameStatus.Playing;

  }


  // 현재 쌓인 보상을 보여줌
  function getReward() public view returns(uint256) {
    return reward;
  }

  // 게임이 얼마나 진행됬는지 보여줌
  function getProgress() public view returns (uint256) {
    return progress;
  }

  // 티켓의 금액을 보여줌
  function getTicket() public view returns (uint256) {
    return ticket;
  }

  // 게임 상태
  function getPlaying() public view returns (uint256) {
    // 게임이 진행되고 있는 상수값
    uint256 Playing = 0;
    if((gameStatus != GameStatus.Playing) || (progress == GAME_COUNT)){
      Playing = 1;
    }
    return Playing;
  }

  // 정답 확인 함수
  function getRandom() public view returns (uint256) {
    require(owner == msg.sender, "admin");
    return random;
  }

  // owner 확인
  function getOwner() public view returns (address){
    return owner;
  }

  // msg.sender 확인
  function getSender() public view returns (address) {
    return msg.sender;
  }


}