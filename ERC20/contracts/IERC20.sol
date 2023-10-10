// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// 오픈제플린은 솔리디티 기반의 스마트 컨트랙트를 개발할떄 사용하는 표준 프레임워크
// 오픈제플린을 사용하면 안정성과 컨트랙트를 개발할때 표준 토큰 규약을 지키면서 빠르게 구현

// 오픈제플린에서 제공되는 ERC20 interface 
interface IERC20 {
  // 토큰의 현재 총 발행량 조회 함수
  // external은 public과 비슷하지만 public은 내부에서 접근 가능하고 external은 외부에서 접근 가능 
  // external은 외부의 EOA 또는 CA에서 호출가능 (내부에서 접근 X)
  // public은 내부 외부 모두 접근 가능하지만 public 보다 external이 가스비가 저렴
  // public은 함수의 변수를 메모리에 복사하고 사용하지만 external은 복사하지 않음
  // 내부에서 복사하여 메모리에 값을 사용하는지, CALLADATA를 직접 읽어 사용하는지의 차이
  function totalSupply() external view returns (uint);

  // 전달받은 매개변수(계정 주소) 토큰의 잔액을 조회하는 함수
  function balanceOf(address account) external view returns (uint);

  // 계정에서 토큰을 다른 계정으로 전달하는 함수
  function transfer(address to, uint amount) external returns (bool);
  
  // 소유권을 위임 받은 토큰을 관리하는 공간
  function allowance(address owner, address spender) external returns (uint); 

  // {0x11111111111111111111 : 100, 0x22222222222222222222 : 200}
  // 맵핑객체
  // 0x11111111111111111111가 0x22222222222222222222에게 토큰 50개를 넘김
  // {0x11111111111111111111 : {0x22222222222222222222 : 50}}

  // 소유권을 제 3자에게 위임하는 함수
  function approve(address spender, uint amount) external returns (bool);

  // 소유권을 관리하는 토큰을 보내는 함수. 위임받은 소유권이 있는지 확인을 하고 보내는 함수
  function transferFrom(address spender, address to, uint amount) external returns (bool);

  // event 함수를 작성하여 실행하면 이더스캔 같은 사이트에서 로그 확인 가능
  // 트랜잭션 내용에 로그를 만들어 확인 할 수 있음
  // Transfer 함수를 실행 했을때 이벤트 함수를 실행해서 발생하는 이벤트를 트랜잭션 로그에 확인 할 수 있음
  event Transfer(address from, address to, uint value);

  // approve 함수가 실행됬을때 이벤트 함수를 실행해서 로그를 확인 할 수 있음
  event Approval(address owner, address spender, uint value);
}