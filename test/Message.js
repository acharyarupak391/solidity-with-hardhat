const {expect} = require("chai");
const { ethers } = require("hardhat");

describe("Message Contract tests", function() {
  let owner, Message, message;
  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    Message = await ethers.getContractFactory("Message");
    message = await Message.deploy();
  })

  it("Default message should be empty", async () => {
    const _msg = await message.readMessage();
    expect(_msg).to.equal("")
  });
  
  it("Set message", async () => {
    const newMessage = "Hello there";
    await message.setMessage(newMessage);
    const _msg = await message.readMessage();
    expect(_msg).to.equal(newMessage);
  });
  
  it("Should give error when empty string is provided", async () => {
    const newMessage = "";
    const txSuccess = false;
    try {
      await message.setMessage(newMessage);
      txSuccess = true
    } catch(err) {

    }
    expect(txSuccess).to.equal(false);
  });

  it("should emit messageSet event when setMessage is called", async () => {
    const newMessage = "Heyyy there";
    await expect(message.setMessage(newMessage))
      .to
      .emit(message, "messageSet")
      .withArgs(owner.address, newMessage)
  })
})