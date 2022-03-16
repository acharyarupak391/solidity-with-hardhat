const { ethers } = require("hardhat");

async function main() {
  const depolyedAddress = "0xA09b4a990B13327a2a4d70a9c4e88cb53D239E2D";
  try {
    const MyContract = await ethers.getContractFactory("Token");
    const contract = await MyContract.attach(depolyedAddress)
    // const owner = await contract.owner();
    const balance = await contract.balanceOf()
    console.log({owner})

    // console.log({balance: owner.totalSupply()})
  } catch(err) {
    console.error({err})
  }
}

main();