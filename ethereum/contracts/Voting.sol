pragma solidity ^0.5.16;

contract Voting {

    event AddedElection(uint electionID);
    event AddedCandidateElection(uint candidateElectionID);
    event VoteCasted(uint voterElectionID);
    event AddedRegionElectionWinner(uint regionElectionWinnerID);
    event GeneratedWinner(uint winner, uint votes);

    address owner;
    constructor() public {
        owner=msg.sender;
    }
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    struct Election {
        uint id;
        bool doesExist; 
    }

    struct CandidateElection {
        uint id;
        uint electionID;
        uint candidateID;
        uint regionID;
        uint votes;
        bool doesExist; 
    }

    struct VoterElection {
        uint id;
        bytes32 voterID;
        uint regionID;
        uint electionID;
        uint candidateID;
    }

    struct RegionElectionWinner {
        uint id;
        uint candidateID;
        uint votes;
        uint regionID;
        uint electionID;
    }
 
    uint numElections;
    uint numVoterElections;
    uint numCandidateElections;
    uint numRegionElectionWinners;

    mapping (uint => Election) elections;
    mapping (uint => VoterElection) voterElections;
    mapping (uint => CandidateElection) candidateElections;
    mapping (uint => RegionElectionWinner) regionElectionWinners;
    
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *  These functions perform transactions, editing the mappings *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
     
    function addElection(uint id) public onlyOwner{
        require(elections[id].doesExist == false);
        numElections++;
        elections[id] = Election(id, true);
        emit AddedElection(id);
    }

    function addCandidateElection(uint candidateID, uint electionID, uint regionID) onlyOwner public {
        uint candidateElectionID = numCandidateElections++;
        candidateElections[candidateElectionID] = CandidateElection(candidateElectionID, candidateID, electionID, regionID, 0, true);
        emit AddedCandidateElection(candidateElectionID);
    }

    function vote(bytes32 voterID, uint electionID, uint regionID, uint candidateID) onlyOwner public {
        require(elections[electionID].doesExist == true);
        int currentCandidateID = getCandidateID(candidateID, electionID, regionID);
        require(currentCandidateID != -1);
        bool hasVoted = hasVoterVoted(voterID, electionID);
        require(hasVoted == false);
        uint voterElectionID = numVoterElections++;
        voterElections[voterElectionID] = VoterElection(voterElectionID, voterID, regionID, electionID, candidateID);
        candidateElections[uint(currentCandidateID)].votes++;
        emit VoteCasted(voterElectionID);
    }

    function addRegionElectionWinner(uint regionID, uint electionID, uint candidateID, uint votes) onlyOwner private {
        int currentCandidateID = getCandidateID(candidateID, electionID, regionID);
        require(currentCandidateID != -1);
        uint regionElectionWinnerID = numRegionElectionWinners++;
        regionElectionWinners[regionElectionWinnerID] = RegionElectionWinner(regionElectionWinnerID, candidateID, votes, regionID, electionID);
        emit AddedRegionElectionWinner(regionElectionWinnerID);
    }

    function generateWinner(uint regionID, uint electionID) onlyOwner public {
        uint maxVotes = 0;
        uint winner = 0;
        for (uint i = 0; i < numCandidateElections; i++) {
            if (candidateElections[i].electionID == electionID && candidateElections[i].regionID == regionID) {
                if (candidateElections[i].votes > maxVotes){
                    maxVotes = candidateElections[i].votes;
                    winner = candidateElections[i].candidateID;
                }
            }
        }
        addRegionElectionWinner(regionID, electionID, winner, maxVotes);
        emit GeneratedWinner(winner, maxVotes);
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * 
     *  Getter Functions, marked by the key word "view" *
     * * * * * * * * * * * * * * * * * * * * * * * * * */

    function hasVoterVoted(bytes32 voterID, uint electionID) private view returns(bool) {
        bool voted = false;
        for (uint i = 0; i < numVoterElections; i++){
            if (voterElections[i].voterID == voterID && voterElections[i].electionID == electionID){
                voted = true;
                break;
            }
        }
        return voted;
    }

    function getRegionElectionWinner(uint regionID, uint electionID) public view returns(uint, uint) {
        uint winner = 0;
        uint votes = 0;
        for (uint i = 0; i < numRegionElectionWinners; i++) {
            if (regionElectionWinners[i].electionID == electionID && regionElectionWinners[i].regionID == regionID) {
                winner = regionElectionWinners[i].candidateID;
                votes = regionElectionWinners[i].votes;
                break;
            }
        }
        return (winner, votes);
    }

    function getNumOfElections() public view returns(uint) {
        return numElections;
    }

    function getNumOfCandidates(uint electionID) public view returns(uint) {
        uint count = 0;
        for (uint i = 0; i < numCandidateElections; i++) {
            if (candidateElections[i].electionID == electionID) {
                count++;
            }
        }
        return count;
    }

    function getNumOfVoters(uint electionID) public view returns(uint) {
        uint count = 0;
        for (uint i = 0; i < numVoterElections; i++) {
            if (voterElections[i].electionID == electionID) {
                count++;
            }
        }
        return count;
    }

    function getCandidateID(uint candidateID, uint electionID, uint regionID) private view returns(int) {
        int currentCandidateID = -1;
        for (uint i = 0; i < numCandidateElections; i++) {
            if (candidateElections[i].candidateID == candidateID && candidateElections[i].electionID == electionID && candidateElections[i].regionID == regionID) {
                currentCandidateID = int(i);
                break;
            }
        }
        return currentCandidateID;
    }

    function getNumOfVotesForCandidateInElection(uint candidateID, uint electionID, uint regionID) public view returns(uint) {
        int currentCandidateID = getCandidateID(candidateID, electionID, regionID);
        return candidateElections[uint(currentCandidateID)].votes; 
    }
    
}