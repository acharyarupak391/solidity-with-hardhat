// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Message {
  string message;

  constructor() {
    message = "";
  }

  event messageSet(address _sender, string _message);

  function setMessage(string calldata _message) external {
    require(bytes(_message).length != 0, "message cannot be empty");
    message = _message;
    emit messageSet(msg.sender, _message);
  }

  function readMessage() public view returns(string memory) {
    return message;
  }
}