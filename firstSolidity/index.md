# 이더리움 개발

## 이더리움으로 개발하기 위해 필요한 개념

- block : 트랜잭션 및 데이터를 모아서 하나의 블록에 저장
- Account : EOA와 CA의 두 개념이 존재
- Message or transaction : 트랜잭션은 메시지의 수신자가 이더를 보낼때
- ETH : 이더리움 네트워크에서 사용하는 암호화폐의 기본 단위

# 이더리움 개발을 할때 사용하는 툴

1. geth : go 언어로 작성 되어 있는 이더리움 클라이언트 chainid를 확인 할 수 있는 클라이언트

- chainid는 블록체인의 고유 식별자로 메인넷인지 테스트넷인지 구분

2. Ganache : 로컬 개발 및 테스트 환경을 제공(이더리움 네트워크)

3. 파운드리 : 솔리디티 테스트 코드를 작성할 수 있으며 TDD 구현 가능

4. 메타 마스크 : 브라우저의 확장 프로그램으로 웹 어플리케이션에서 이더리움 스마트 컨트랙트와 상호 작용

- 개인키의 관리, 트랜잭션을 생성하여 서명을 네트워크에 전달

5. truffle, Hardhat : 스마트 컨트랙트 개발, 테스트 배포를 쉽게 할 수 있도록 도와주는 프레임 워크

# Ganache : 로컬 개발 테스트(이더리움 네트워크)

## RPC(Remote Procedure Call)

- 별도의 원격 제어를 위한 코딩을 하지않고 다른 주소공간에 프로시저를 실행 할 수 있게 하는 프로세스 간의 통신
- 함수 : 입력에 따른 출력이 발생을 목적으로 함. 클라이언트에서 처리를 하고 연산작업이나 수치가 필요할 경우 사용
- 프로시저 : 출력값에 집중보다 "명령의 단위가 수행하는 절차" 반환값이 있을 수도 있고 없을 수도 있음. 서버단에서 처리

## RPC 통신 사용

- 일반적으로 코드를 작성하고 프로그램을 실행시키면 자신의 메모리공간에서 함수가 실행되는데 RPC 자신과 다른 주소의 메모리 공간의 동작하는 프로세스의 함수를 실행 할 수 있게 함
- RPC 통신 장점
- 비즈니스 로직을 개발하는데 집중

- ganache 설치
- npm install -g ganache-cli

- RPC를 이용하여 함수 호출

```json
{
  "jsonrpc": "2.0", // json-RPC 버전
  "method": "web3_clientVersion", // 실행 요청할 메소드 명
  "params": [] // 메소드에 전달할 인자값 매개변수
}
```

- curl
- cli에서 요청을 보냄

-- -X POST : get, Post 요청 타입
-- -d '{"jsonrpc": "2.0","method": "web3_clientVersion","params" : []}' : 전달하는 데이터의 내용
-- http://127.0.0.1:8545 : 요청 주소

- curl -X POST -d '{"jsonrpc": "2.0","method": "web3_clientVersion","params" : []}' http://127.0.0.1:8545
- 결과값 : {"jsonrpc":"2.0","result":"EthereumJS TestRPC/v2.13.2/ethereum-js"}

- eth.getBalance(매개변수)
- curl -X POST -d '{"jsonrpc" : "2.0", "method":"eth_getBalance", "params":["0xb3DEc1C7239D073A1a120836a5C24bc3AC93a375"]}' http://127.0.0.1:8545
- 결과값 : {"jsonrpc":"2.0","result":"0x56bc75e2d63100000"}
- result가 10진수가 아닌 16진수로 출력되는 이유는 단위를 wei로 쓰기 때문
- wei -> eth
- 1eht === 100 \* 10e18 wei
- wei = 10\*\*18

# 이더리움 트랜잭션을 발생 시킬때 gas

- 트랜잭션 발생시 총 수수료 : gas \* gasPrice

# sendTransaction

- ETH 전송
- curl -X POST -d '{"jsonrpc" : "2.0", "method":"eth_sendTransaction", "params":[{"from" : "0xb3DEc1C7239D073A1a120836a5C24bc3AC93a375", "to": "0xe89B69C0df39dd997Ef68FbA85a1f03E15526bF6", "value" : "10000000000"}]}' http://127.0.0.1:8545
- 결과값 : {"jsonrpc":"2.0","result":"0x76d66aa35bb87d06c3929a5e5b44615bb8dc80088827710267fefc54d4dbd461"}

# web3

- web3.js는 자바스크립트 라이브러리로, 웹 어플리케이션에서 이더리움 블록체인과의 상호작용을 위해 사용. 이 라이브러리를 통해 노드에 요청을 보낼 때, 특정 API를 지정하여 통신할 수 있음

# 간단하게 컨트랙트 배포

- 소스 코드 작성에 사용하는 언어 : solidity
- 컴파일 -> EVM이 실행시킬 수 있는 형식(바이트코드) 변환
- 배포 -> 트랜잭션 생성 변환한 바이트 코드와 내용을 포함한 트랜잭션을 생성하고 이더리움 네트워크에 전송
- 네트워크에 트랜잭션 풀에 담기고 블록 생성되면 데이터로 저장 -> 스마트 컨트랙트 배포

# 기본적인 solidity 코드 구조

1. 라이센스 식별자
2. solidity version
3. 배포할 컨트랙트

# solidity code compile

<!-- solc 라이브러리 설치 -->

- npm i solc
<!-- solc를 사용하여 코드 컴파일 -->
- npx solc --bin --abi ./test.sol
