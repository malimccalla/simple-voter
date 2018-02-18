pragma solidity ^0.4.20;

contract PollFactory {
    address[] public deployedPolls;

    function createPoll
    (string question, string yesButtonText, string noButtonText) public {
        address newPoll = new Poll(
            msg.sender,
            question,
            yesButtonText,
            noButtonText
        );
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
    string public yesButtonText;
    string public noButtonText;
    uint public yesVotesCount;
    uint public noVotesCount;

    function Poll
    (
        address _creator,
        string _question,
        string _yesButtonText,
        string _noButtonText
    ) public {
        creator = _creator;
        question = _question;
        yesButtonText = _yesButtonText;
        noButtonText = _noButtonText;
        yesVotesCount = 0;
        noVotesCount = 0;
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

    function getDetails() public view returns
    (address, string, string, string, uint, uint, bool) {
        bool hasVoted = voters[msg.sender];
        return (
            creator,
            question,
            yesButtonText,
            noButtonText,
            yesVotesCount,
            noVotesCount,
            hasVoted
        );
    }
}
