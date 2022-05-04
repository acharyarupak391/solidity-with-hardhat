// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Message {
    struct message {
        string message;
        address account;
        uint256 timestamp;
    }

    mapping(address => message) messages;

    constructor() {}

    event messageSet(address _sender, string _message, uint256 _timestamp);

    function setMessage(string memory _message) public {
        require(bytes(_message).length != 0, "message cannot be empty");
        message memory _m;
        _m.message = _message;
        _m.account = msg.sender;
        _m.timestamp = block.timestamp;

        messages[msg.sender] = _m;

        emit messageSet(_m.account, _m.message, _m.timestamp);
    }

    event messageDeleted(address _sender, uint256 _timestamp);

    function deleteMessage(address _account) public {
        message memory _m;
        _m.message = "";
        _m.account = 0x0000000000000000000000000000000000000000;
        _m.timestamp = 0;

        messages[_account] = _m;

        emit messageDeleted(_account, block.timestamp);
    }

    function readMessage(address _account)
        public
        view
        returns (
            string memory,
            uint256,
            address
        )
    {
        message memory _data = messages[_account];
        return (_data.message, _data.timestamp, _data.account);
    }
}
