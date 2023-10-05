// SPDX-license-Identifier:MIT
pragma solidity ^0.8.13;

contract Counter {
  uint256 value;

  constructor(){}

  function increment() public {
    value += 1;
  }

  function decrement() public {
    require(value != 0, "value 0 error");
    // 조건문 통과가 안되면 가스비 지불을 안하고 에러("value 0 error") 표시
    value -= 1;
  }

  function getValue() public view returns(uint256) {
    return value;
  }
}