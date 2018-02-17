pragma solidity ^0.4.19;

contract PollFactory {
    address[] public deployedPolls;

    function createPoll(string question) public {
        address newPoll = new Poll(question, msg.sender);
        deployedPolls.push(newPoll);
    }

    function getDeployedPolls() public view returns (address[]) {
        return deployedPolls;
    }
}

contract Poll {
    mapping(address => bool) public voters;
    address public creator;
    string public question;
    uint public yesVotesCount = 0;
    uint public noVotesCount = 0;

    function Poll(string _question, address _creator) public {
        question = _question;
        creator = _creator;
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

    function getDetails() public view returns (address, string, uint, uint) {
      return (creator, question, yesVotesCount, noVotesCount);
    }
}
