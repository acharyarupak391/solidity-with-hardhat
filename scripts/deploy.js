const { ethers } = require("hardhat");

async function main() {
  // Deploying `Message` contract
  const Message = await ethers.getContractFactory("Message");
  const message = await Message.deploy();

  console.log("Message deployed address:", message.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
