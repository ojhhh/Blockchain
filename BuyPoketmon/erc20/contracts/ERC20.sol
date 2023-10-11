// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import './IERC20.sol';

contract ERC20 is IERC20 {
  // 토큰의 이름
  string public name;

  // 토큰의 단위
  string public symbol;

  // 토큰의 소숫점 자리(기본18자리)
  uint8 public decimals = 18;

  // 토큰의 현재 총 발행량
  uint public override totalSupply;

  // 
  address private owner;

  //
  mapping(address => uint) public balances;

  //
  mapping(address => mapping(address => uint)) public override allowance;

  // 익명함수
  receive() external payable {
    // CA가 이더를 받았을때 동작
    // 배포자가 토큰의 발행량을 관리하고 다른 이용자들이 토큰을 가지고 싶으면 컨트랙트 배포자가 정한 비율에 따라 토큰을 배포

    // 받은 이더 비율로 토큰량을 조절
    uint amount = msg.value * 200;

    require(balances[owner] >= amount);
    balances[owner] -= amount;
    balances[msg.sender] += amount;

    // 배포자가 토큰이 없을떄
    if(msg.sender == owner){
      mint(amount);
    }

  }

  // 컨트랙트 생성자
  constructor(string memory _name, string memory _symbol, uint256 _amount){
    owner = msg.sender;
    name = _name;
    symbol = _symbol;
    mint(_amount * (10 ** uint256(decimals)));
  }

  // 
  function mint(uint amount) internal {
    balances[msg.sender] += amount;
    totalSupply += amount;
  }

  //
  function balanceOf(address account) external view override returns(uint){
    return balances[account];
  }

  // 
  function transfer(address to, uint amount) external override returns(bool){
    balances[msg.sender] -= amount;
    balances[to] += amount;
    return true;
  }

  // 
  function approve(address spender, uint amount) external override returns(bool){
    allowance[msg.sender][spender] = amount;
    return true;
  }
  
  // 
  function transferFrom(address sender,address to, uint amount) external override returns(bool){
    require(allowance[sender][msg.sender] >= amount);
    allowance[sender][msg.sender] -= amount;
    balances[sender] -= amount;
    balances[to] += amount;
    return true;
  }

  // 
  function burn(uint amount) external {
    balances[msg.sender] -= amount;
    totalSupply -= amount;
  }
}