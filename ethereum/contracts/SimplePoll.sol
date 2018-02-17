pragma solidity ^0.4.19;

contract SimplePoll {
    mapping(address => bool) public voters;
    address public creator;
    uint public yesVotesCount = 0;
    uint public noVotesCount = 0;
    string public question;

    function SimplePoll(string _question) public {
        question = _question;
        creator = msg.sender;
    }

    modifier notVoted() {
        require(!voters[msg.sender]);
        _;
        voters[msg.sender] = true;
    }

    function voteYes() public notVoted {
        yesVotesCount++;
    }

    function voteNo() public notVoted {
        noVotesCount++;
    }
}
