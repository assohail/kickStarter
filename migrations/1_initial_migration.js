const CampaignFactory = artifacts.require("./../ethereum/contracts/CampaignFactory");
// const King = artifacts.require("King");

module.exports = function(deployer) {
  deployer.deploy(CampaignFactory, 10000);
  // deployer.deploy(King);
};
