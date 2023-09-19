// merkle tree 데이터의 암호화 구조가 트리 형태
const merkle = require("merkle");
// npm init -y
// npm install merkle

// 데이터의 무결성 검증에 사용되는 트리 구조
// const data = ["A", "B", "C", "D", "E"];

// 블록의 필수 요소이고 데이터들을 해시화해서 더한 후 해시화 반복
// 트리처럼 뻗어서 마지막 루트 해시값을 구해서 사용

// 기존 const data = ["A", "B", "C", "D", "E"]; 에서 C가 F로 변하면 ?
// merkle 루트를 처리할 때 홀수 일 경우 마지막 데이터를 한번 더 해시해서 사용
const data = ["A", "B", "F", "D", "E"];

const merkleTree = merkle("sha256").sync(data);
const Root = merkleTree.root();
console.log(Root);
