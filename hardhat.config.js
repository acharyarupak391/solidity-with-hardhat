require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config();

const account = process.env["ACCOUNT_PRIVATE_KEY"];

const kovanUrl = process.env["KOVAN_DEPLOY_URL"];
const mainnetUrl = process.env["MAINNET_DEPLOY_URL"];
const goerliUrl = process.env["GOERLI_DEPLOY_URL"];

const networks = {};

if (kovanUrl)
  networks.kovan = {
    url: kovanUrl,
    accounts: [account],
  };

if (mainnetUrl)
  networks.mainnet = {
    url: mainnetUrl,
    accounts: [account],
  };

if (goerliUrl)
  networks.goerli = {
    url: goerliUrl,
    accounts: [account],
  };

module.exports = {
  solidity: "0.7.3",
  networks,
};
