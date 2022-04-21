const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Message Contract tests", function () {
  let owner, Message, message;
  // [owner] = await ethers.getSigners();
  // Message = await ethers.getContractFactory("Message");
  // message = await Message.deploy();
  // beforeEach(async () => {
  // });

  it("SET & DEPLOY", async () => {
    [owner] = await ethers.getSigners();
    Message = await ethers.getContractFactory("Message");
    message = await Message.deploy();
  });

  it("Default Timestamp should be 0", async () => {
    const [msg, timestamp] = await message.readMessage(owner.address);
    expect(timestamp.toString()).to.equal("0");
  });

  it("Set message", async () => {
    const newMessage = "Hello there from " + owner.address;
    await message.setMessage(newMessage);
    const [_msg] = await message.readMessage(owner.address);
    expect(_msg).to.equal(newMessage);
  });

  it("Update message", async () => {
    const newMessage = "Hello again from " + owner.address;
    await message.setMessage(newMessage);
    const [_msg] = await message.readMessage(owner.address);
    expect(_msg).to.equal(newMessage);
  });

  it("Delete message", async () => {
    await message.deleteMessage(owner.address);
    const [_msg, _timestamp, _account] = await message.readMessage(
      owner.address
    );
    expect(_msg).to.equal("");
    expect(_account).to.equal(ethers.constants.Zero);
  });

  it("Should give error when empty string is provided", async () => {
    const newMessage = "";
    const txSuccess = false;
    try {
      await message.setMessage(newMessage);
      txSuccess = true;
    } catch (err) {}
    expect(txSuccess).to.equal(false);
  });

  it("should emit messageSet event when setMessage is called", async () => {
    const newMessage = "Hello there";
    const tx = await message.setMessage(newMessage);
    const receipt = await tx.wait();
    console.log(receipt.events[0].args);
    await expect(message.setMessage(newMessage)).to.emit(message, "messageSet");
  });
});
