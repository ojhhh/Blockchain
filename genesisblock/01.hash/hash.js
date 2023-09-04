// SHA-256

// SHA-256은 현재 블록체인에서 가장 많이 채택해서 사용하고 있는 암호 방식
// SHA256 알고리즘은 256비트로 구성된 64자리 문자열로 암호화
// 출력속도가 빠르고 단방향성 암호화 방법을 제공
// 복호화가 불가능하며 아직 까지 큰 단점이 발견되지 않은 암호화 방법
// 속도가 빨라 인증서나 블록체인에 많이 사용

// const SHA256 = require("crypte-to/sha256");
const { SHA256 } = require("crypto-js");
// npm init -y
// npm install crypto-js

const str = "hello sha-256";
console.log("resulte : ", SHA256(str).toString());
