var ConvertLib = artifacts.require("./ConvertLib.sol");
var CryptoPunksMarket = artifacts.require("./CryptoPunksMarket.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.deploy(CryptoPunksMarket);
};
