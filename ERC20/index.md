# 토큰

# ERC-20 토큰

- ERC는 Ethereum Request for Comments의 약자
- ERC 20에서 20은 특정 제안에 번호를 매긴 토큰의 생성이나 발행 등의 규칙을 의미
- 숫자는 식별하기 위한 숫자

```sh
# 토큰과 코인의 차이
# 코인은 메인넷이 있고 토큰은 메인넷이 없음
# 토큰을 만들면 네트워크 안에 포함되어 있지만 토큰 자체의 메인넷이 구현되어 있지 않기 때문에 코인은 아님

# ERC20
# ERC20은 이더리움 네트워크에서 가장 표준이 되는 토큰, 대체 가능 토큰으로 가장 기본적인 상호 교환 가능한 토큰의 기능을 정의
# 토큰 전송 및 잔액조회 토큰의 소유자 등을 관리하기 위한 메소드와 이벤트가 정의 되어 있는 토큰
# 탈중앙화된 금융(Defi)등에서 사용

# ERC721
# ERC721은 대체 불가 토큰
# ERC721 토큰은 각각의 고유한 특성을 가지고 있고 그 토큰의 소유권을 가질 수 있는것, 게임 아이템, 미술품, 부동산 등의 소유권을 나타 낼 수 있음
# 토큰의 소유권 이정(판매 및 경매), 토큰의 메타데이터 조회 등의 메소드와 이벤트를 정의
```

```sh
npm install truffle
npx truffle init

npx create-reate-app erc20

# 오픈제플린(프레임워크)에서 제공하는 ERC20, ERC721 등 표준 토큰을 가지고 상속받아 사용
npm init -y
npm install @openzeppelin/contracts
# node_modules/@openzeppelin/contracts/token 폴더에 토큰의 내용이 담겨 있음

# truffle 배포
npx truffle compile
# 토큰의 량을 확인하려면 networkId가 필요한데 디폴트로 설정되어 있어 바꿔줘야함
npx ganache-cli --chain.chainId 1337 --chain.networkId 1337
npx truffle migrate

# remix
# 배포 및 테스트 환경을 지원하는 웹 IDE

# remix 웹 페이지 workspace 부분에 작업내용을 vscode에서 가져와 작업 할 수 있음
npm install -g @remix-project/remixd
remixd -s . --remix-ide https://remix.ethereum.org/
# 위의 요청을 보내면 콘솔에서 대기 상태 변함

# ===================================================================
## [INFO] you are using the latest version 0.6.18
## [WARN] You may now only use IDE at https://remix.ethereum.org/ to connect to that instance
## [WARN] Any application that runs on your computer can potentially read from and write to all files in the directory.
## [WARN] Symbolic links are not forwarded to Remix IDE

## [INFO] Tue Oct 10 2023 11:44:30 GMT+0900 (Korean Standard Time) remixd is listening on 127.0.0.1:65520
## [INFO] Tue Oct 10 2023 11:44:30 GMT+0900 (Korean Standard Time) slither is listening on 127.0.0.1:65523
## [INFO] Tue Oct 10 2023 11:44:30 GMT+0900 (Korean Standard Time) truffle is listening on 127.0.0.1:65524
# ===================================================================

# remix 웹 브라우저에서 connect to localhost 로 연결
# 권한 관련 팝업창 Connect하게 되면 콘솔 창에 아래 문구가 뜸

# ===================================================================
## setup notifications for .
## Truffle plugin activated
## Syncing compilation result from Truffle
# ===================================================================

# 그러면서 remix 웹 브라우저에 현재 프로젝트가 등록됨

# remix 좌측 3번째 탭에 compile 버전 확인


```
