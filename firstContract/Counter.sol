// SPDX-License-Identifier:MIT
// 라이센스는 작성시 띄어 쓰기가 없어야 되고 무조건 맨위에 있어야 함
// 맨윗 줄에 다른 주석을 쓰고 MIT 앞부분에 띄어 쓰기를 작성하니 "UNLICENSED" 오류뜸
pragma solidity ^0.8.13;


contract Counter {
  uint256 value;

  // ; 를 마지막에 찍으닌까 오류남
  // -> 함수 또는 생성자의 선언 부분에는 세미콜론을 사용하지 않는다고함
  // 중괄호 {} 에는 세미콜론을 찍지 않지만 주로 한 줄의 문장이 끝날때는 세미콜론 사용
  constructor(){}

  function setValue(uint256 _value) public {
    value = _value;
  }

  function getValue() public view returns (uint256){
    return value;
  }
}