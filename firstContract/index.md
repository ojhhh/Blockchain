# contract 실행

- 컨트랙트에 저장할 수 있는 영영 데이터를 영구적으로 저장
- contract storage 데이터를 저장
- storage에 상태를 저장해서 유지(블록체인 스마트 컨트랙트)

# code코 js의 클래스 문법과 비슷

```javascript
class Counter {
  value: number;
  constructor() {}

  setValue() {}
  getValue() {}
}
```

```
<!-- 라이센스 버전 -->
<!-- SPDX-License-Identifier:MIT -->

<!-- 솔리디티 버전 -->
pragma solidity ^0.8.0;

<!-- 컨트랙트 코드 -->
contract Counter{
  uint256 value;

  constructor(){};

  function setValue(uint256 _value) public {
    value = _value;
  }

  <!-- 상태변수를 변경하지 않고 조회 하기위해 view 사용 -->
  <!-- 계산하는게 아닌 있는걸 조회 할땐 가스비가 발생하지 않음 -->
  function getValue() public view returns (uint256) {
    return value;
  }
}
```

- javascript의 클래스는 인스턴스를 생성하는 과정이랑 비슷
- new 키워드를 통해 생성된 인스턴스들은 다른 메모리 주소를 참조하고 있기에 동일한 객체가 아님

- solidity에서의 컨트랙트는 컴파일된 코드의 내용이 EVM을 통해 실행되고 CA가 생성될때 solidity 코드의 내용을 인스턴스가 한번 생성
- 이후 생성된 인스턴스를 CA로 참조해서 컨트랙트에 접근해서 사용하는 데이터는 같은 데이터를 참조(싱글톤 패턴 방식)
- 싱글톤 패턴 : 인스턴스 객체를 하나 생성하면 어디서든 참조할 수 있는 디자인 패턴

- 스마트 컨트랙트 프로세스

1. 컨트랙트 코드 작성 (Counter.sol)

- 배포할 스마트 컨트랙트 코드 작성

2. 컨트랙트 코드 컴파일 (solc를 사용하여 abi, bin 파일 생성)

- EVM에서는 solidity 언어를 읽을 수 없으니 읽을수 있는 바이트 코드로 컴파일
- abi는 인터페이스를 정의. bin은 바이트 코드를 담고 있음

3. 스마트 컨트랙트 배포(트랜잭션 생성. 배포자 계정, 바이트 코드를 배포)

- 받는 사람이 없으니 from은 없고 to에 배포자 계정, 가스비, 바이트 코드(bin 파일 내용)의 정보를 담고 있는 트랜잭션 생성

4. node에게 전송(트랜잭션 발생)

- 트랜잭션은 각각의 node에 전송
- 연산이 필요하기 때문에 가스비 발생. 가스비는 배포자가 부담
- 각 node의 트랜잭션 풀에 트랜잭션이 들어가게 됨

5. 블록 생성(트랜잭션 처리)

- 트랜잭션풀에서 이 트랜잭션이 올바른 트랜잭션인지 검증 시작
- 검증자는 네트워크에서 무작위로 선정 되지만 PoS인 이더리움에서는 예치금을 많이 넣은 사람이 검증자가 될 확률이 높음
- 검증자가 되면 좋은 이유는 검증이 완료되면 보상을 받을 수도 있기 때문
- 검증이 완료된 트랜잭션을 블록에 넣고 블록을 네트워크에 배포
- PoW 방식에서는 마이너가 블록을 채굴하지만 이더리움에서는 13 ~ 15초마다 블록이 1개씩 생성됨
- 각 노드들은 배포된 블록이 위변조 된 블록이 아닌지 검증을 하고난 후 이상이 없다면 체인에 등록

6. Account(CA 생성)

- 블록이 체인에 등록되면 블록에 포함된 스마트 컨트랙트 배포 트랜잭션은 이더리움 가상 머신 (EVM)이 컨트랙트 주소(CA)를 생성
- 이때 주소는 단순히 스마트 컨트랙트가 배포 됬다는 것을 나타내는 것
- 6번, 7번은 병렬적으로 일어남

7. EVM에서 솔리디티 코드 실행하여 인스턴스 생성

- 스마트 컨트랙트 주소가 생성되면 EVM은 스마트 컨트랙트의 바이트 코드를 실행
- 스마트 컨트랙트의 생성자 함수를 호출하여 초기 상태로 설정

8. storage에 데이터 저장

- 스마트 컨트랙트 실행 결과와 상태는 블록체인 상에 영구적으로 저장
- storage는 블록체인에 포함되어 있지만 블록에는 포함되어 있지않음
- 블록체인 어딘가에 상태가 저장된다고함
- 블록체인 안에 스마트 컨트랙트 스토리지가 있다고함
- 4가지의 저장공간 중 가스비가 비싼 편이라고함

# 스마트 컨트랙트 코드 구현

- 간단한 카운터 코드 작성
- 스마트 컨트랙트의 코드가 실행 될떄 EVM에서 연산을 얼마나 할지와 네트워크의 환경을 기준으로 수수료 측정
- 네트워크 상황과 코드의 복잡성에 따라서 연산(직접 연산은 어렵고 가스비 추정은 가능)
- 상태 변수의 값을 조회하는 함수는 연산을 하는 과정이 없기 때문에 가스비를 필요로 하지 않음
- 상태 변수의 값을 변경하는 경우 연산이 포함 (한정된 네트워크 자원 사용)
- 연산을 하는 과정에서 코드의 무한루프를 연산하게 되면 과도한 가스비 발생을 방지하기 위해 gasLimit가 초과되면 트랜잭션이 블록에 담기지 않음

# 개발 환경 구축

```sh
# solc 설치
npm install solc@0.8.13
# Ganache-cli 설치
npm install ganache-cli
# Ganache 실행
npx ganache-cli
```
