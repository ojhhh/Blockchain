// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// 
import './IERC20.sol';

// 인터페이스 상송
// javascript에서는 implements contract는 is

contract ERC20 is IERC20 {
  // ERC20 토큰의 규약

  // 토큰의 이름 
  string public name;

  // 토큰의 심볼(토큰의 단위)
  string public symbol;

  // 토큰의 소수점 자리(default : 18단위)
  uint8 public decimals = 18;

  // 토큰의 총 발행량
  // IERC20에 선언되어 있는 함수는 virtual 함수로 되어 있음
  // 상속받은 함수를 새로 정의(덮어쓰기)
  uint public override totalSupply;

  // 컨트랙트 배포자(최신 버전은 상속받아 사용하기 때문에 컨트랙트에는 작성할 필요가 없어짐)
  address private owner;

  // 생성자 함수 컨트랙트 배포자가 실행할 함수
  // memory : 메모리 영역에서 사용하고 해제 시킨다는 구문
  // uint256 같이 메모리를 정해두고 사용하지만 string 같은 가변적인 변수는 memory를 붙여서 사용
  constructor(string memory _name, string memory _symbol, uint256 _amount){
    // 어떤 이름의 토큰을 발행하고 있고 어떤 단위의 심볼을 사용할지 처음 총 발행량을 얼마나 할지 설정
    owner = msg.sender;
    name = _name;
    symbol = _symbol;

    // 토큰 발행할 때 사용할 메소드 작성
    // _amount * (100 ** uint256(decimals))

    // 최초 토큰 발행량
    mint(_amount * (10 ** uint256(decimals)));
  }

  // balance 토큰을 누가 얼마만큼 가지고 있는지에 대한 내용을 담을 객체
  mapping(address => uint) public balances;
  /*
    balances = {
      0x1111111111111111111111111111111111111111 : 100,
      0x1111111111111111111111111111111111111112 : 100,
      0x1111111111111111111111111111111111111113 : 100,
    }
  */

  // 토큰의 소유권한을 위임 받은 내용을 담은 객체 
  mapping(address => mapping(address => uint)) public override allowance;
  /*
    allowance = {
      0x1111111111111111111111111111111111111111 : {
        0x1111111111111111111111111111111111111114 : 50
        0x1111111111111111111111111111111111111115 : 50
      },
      0x1111111111111111111111111111111111111112 : {
        0x1111111111111111111111111111111111111116 : 50
        0x1111111111111111111111111111111111111117 : 50
      },,
     
      0x1111111111111111111111111111111111111113 : {
        0x1111111111111111111111111111111111111118 : 50
        0x1111111111111111111111111111111111111119 : 50
      },,
    }
  */

  // 잔액 조회 함수
  function balanceOf(address account) external view override returns (uint) {
    return balances[account];
  }

  // 다른 지갑으로 잔액 전달 함수 
  function transfer(address to, uint amount) external override returns (bool){
    // 1. 전달하는 사람의 잔액 감소
    balances[msg.sender] -= amount;
    // 2. 전달받는 사람의 잔액 증가
    balances[to] += amount;
    // transfer 이벤트를 실행 시킨 로그를 트랜잭션에서 확인
    // emit 구문을 사용하여 이벤트 함수 실행
    emit Transfer(msg.sender, to, amount);

    return true;
  }

  // 토큰의 소유권을 위임하는 함수
  function approve(address spender, uint amount) external override returns (bool){
    // 소유권 추가
    allowance[msg.sender][spender] = amount;
    emit Approval(msg.sender, spender, amount);

    return true;
  }

  // 토큰 발행 함수
  // internal : 컨트랙트 내부에서만 실행
  function mint(uint amount) internal {
    balances[msg.sender] += amount;
    totalSupply += amount;
  }

  // 권한을 가지고 있는 제3자가 토큰을 보낼때 사용하는 함수
  function transferFrom(address spender, address to, uint amount) external override returns (bool){
    // 토큰량 검사
    require(allowance[spender][msg.sender] >= amount);

    allowance[spender][msg.sender] -= amount;
    balances[spender] -= amount;
    balances[to] += amount;

    return true;
  }

  // 토큰 소각
  // 토큰 발행량이 많아지면 가치가 떨어지기 때문
  function burn(uint amount) external {
    balances[msg.sender] -= amount;
    totalSupply -= amount;
  }
}