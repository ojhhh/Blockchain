const ERC20 = artifacts.require("ERC20");

module.exports = (deployer) => {
  // 배포할 컨트랙트 인스턴스를 매개변수로 전달
  // Truffle에서 배포할 생성자 함수의 매개변수를 순서대로 넣어줘야 함
  deployer.deploy(ERC20, "OHTOKEN", "OH", 10000);
};
