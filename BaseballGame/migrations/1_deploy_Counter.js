const Counter = artifacts.require("Counter");

module.exports = (deployer) => {
  // 가져온 json을 배포
  deployer.deploy(Counter);
};
