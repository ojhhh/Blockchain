# 컨트랙트 복습

```sh
npx create-reate-app test

cd test

npm install truffle
npm install web3
npm install ganache-cli

npx truffle init

```

- contracts 폴더에 sol파일에 컨트랙트 코드 작성
- npx truffle compile

- migrations 폴더에 배포 할 코드 파일 추가
- 파일명 : [번호]_[내용]_[파일명].js
- npx truffle migrate

```
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'development'
> Network id:      1696467323255
> Block gas limit: 30000000 (0x1c9c380)


1_deploy_Counter.js
===================

   Deploying 'Counter'
   -------------------
   > transaction hash:    0x1a3062d19f5067a5ece4c17007d2f81a1d121058caa3351fd6d89c8eb48cee18
   > Blocks: 0            Seconds: 0
   > contract address:    0x2A620EF9350d9f5EE7FDff869780597c5Cdd51F2
   > block number:        1
   > block timestamp:     1696467675
   > account:             0x69A4F7ed2B45135137BA15Bd70105e3094271F3d
   > balance:             999.999510115375
   > gas used:            145151 (0x236ff)
   > gas price:           3.375 gwei
   > value sent:          0 ETH
   > total cost:          0.000489884625 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:      0.000489884625 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.000489884625 ETH
```

- CA를 까먹었을떄 찾는 방법
- truffle console 활성화

```sh
npx truffle console
# 배포한 컨트랙트의 이름

# Counter.address

test$ npx truffle console
truffle(development)> Counter.address
'0x2A620EF9350d9f5EE7FDff869780597c5Cdd51F2'
```

# 숫자야구 게임 만들기

1. test 폴더로 이동
2. npm start
3. npx ganache-cli
4. npx truffle migrate
5. 메타마스크 로그인
