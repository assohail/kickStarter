// const Campaign = artifacts.require("Campaign");
const King = artifacts.require("King");

module.exports = function(deployer) {
  // deployer.deploy(Campaign , 10000);
  deployer.deploy(King);
};
