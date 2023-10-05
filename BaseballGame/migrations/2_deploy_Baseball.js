const Baseball = artifacts.require("Baseball");

module.exports = (deployer) => {
  // 가져온 json을 배포
  deployer.deploy(Baseball);
};
