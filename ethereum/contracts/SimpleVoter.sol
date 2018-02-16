pragma solidity ^0.4.19;

contract SimpleVoter {
    mapping(address => bool) public voters;
    uint public yesVotesCount = 0;
    uint public noVotesCount = 0;

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
