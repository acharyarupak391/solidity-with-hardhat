require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config();

const kovanUrl = process.env["KOVAN_DEPLOY_URL"];
const kovanAccount = process.env["ACCOUNT_PRIVATE_KEY"];

module.exports = {
  solidity: "0.7.3",
  networks: {
    kovan: {
      url: kovanUrl,
      accounts: [kovanAccount]
    }
  }
};
