const {expect} = require("chai");
const { ethers } = require("hardhat");

describe("Hardhat tests", function() {
  let owner, addr1, addr2, Token, hardhatToken;
  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("Token");
    hardhatToken = await Token.deploy();
    // console.log({name: await hardhatToken.name(), owner, addr1})
  })

  it("Deployment should assign total supplies of token to the owner", async () => {
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("should perform a tranfer operation", async () => {
    let ownerBalance = await hardhatToken.balanceOf(owner.address);
    let addr1Balance = await hardhatToken.balanceOf(addr1.address);
    // console.log({
    //   "owner balance before transfer": ownerBalance, 
    //   "addr1 balance before transfer": addr1Balance
    // })

    const transferAmount = 5000;
    try {
      const tx = await hardhatToken.transfer(addr1.address, transferAmount);
      // console.log({tx})

    } catch(err) {
      console.log({err})
    }

    ownerBalance = await hardhatToken.balanceOf(owner.address);
    addr1Balance = await hardhatToken.balanceOf(addr1.address);
    // console.log({
    //   "owner balance after transfer": ownerBalance, 
    //   "addr1 balance after transfer": addr1Balance
    // })

    expect(addr1Balance).to.equal(transferAmount);
    expect(ownerBalance).to.equal(await hardhatToken.totalSupply() - transferAmount);
  })

  it("transfer from addr1 to addr2", async () => {
    const addr2InitBalance = await hardhatToken.balanceOf(addr2.address);
    
    // first transfer some amount to addr1
    hardhatToken.transfer(addr1.address, 5000);

    // connect the token to addr1, and transfer amount to addr2
    const transferAmount = 3000;
    try {
      await hardhatToken.connect(addr1).transfer(addr2.address, transferAmount)
    } catch(err) {
      console.error({err})
    }

    const addr2FinalBalance = await hardhatToken.balanceOf(addr2.address);

    expect(addr2FinalBalance).to.equal(addr2InitBalance + transferAmount)
  })
})