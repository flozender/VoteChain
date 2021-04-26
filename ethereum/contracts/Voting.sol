pragma solidity ^0.5.16;

contract Voting {

    event AddedElection(uint electionID);
    event AddedPartyElection(uint partyElectionID);
    event AddedCandidateElection(uint candidateElectionID);
    event VoteCasted(uint voterElectionID);

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
    
    struct VoterElection {
        uint id;
        bytes32 voterID;
        uint regionID;
        uint electionID;
        uint candidateID;
    }

    struct CandidateElection {
        uint id;
        uint candidateID;
        uint partyID;
        uint regionID;
        uint electionID;
        uint votes;
        bool doesExist; 
    }

    struct PartyElection {
        uint id;
        uint partyID;
        uint electionID;
        uint votes;
        bool doesExist;
    }

    uint numElections;
    uint numVoterElections;
    uint numCandidateElections;
    uint numPartyElections;

    mapping (uint => Election) elections;
    mapping (uint => VoterElection) voterElections;
    mapping (uint => CandidateElection) candidateElections;
    mapping (uint => PartyElection) partyElections;
    
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *  These functions perform transactions, editing the mappings *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
     
    function addElection(uint id) onlyOwner public {
        require(elections[id].doesExist == false);
        numElections++;
        elections[id] = Election(id, true);
        emit AddedElection(id);
    }

    function addParty(uint partyID, uint electionID) onlyOwner public {
        int currentPartyID = getPartyID(partyID, electionID);
        if (currentPartyID != -1) {
            uint partyElectionID = numPartyElections++;
            partyElections[partyElectionID] = PartyElection(partyElectionID, partyID, electionID, 0, true);
            emit AddedPartyElection(partyElectionID);
        }
    }

    function addCandidateElection(uint candidateID, uint electionID, uint regionID, uint partyID) onlyOwner public {
        uint candidateElectionID = numCandidateElections++;
        candidateElections[candidateElectionID] = CandidateElection(candidateElectionID, candidateID, partyID, regionID, electionID, 0, true);
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
        uint partyID = candidateElections[uint(currentCandidateID)].partyID;
        int currentPartyID = getPartyID(partyID, electionID);
        require(currentPartyID != -1);
        partyElections[uint(currentPartyID)].votes++;
        emit VoteCasted(voterElectionID);
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

    function getPartyID(uint partyID, uint electionID) private view returns(int) {
        int currentPartyID = -1;
        for (uint i = 0; i < numPartyElections; i++) {
            if (partyElections[i].partyID == partyID && partyElections[i].electionID == electionID) {
                currentPartyID = int(i);
                break;
            }
        }
        return currentPartyID;
    }

    function getVotesForParty(uint partyID, uint electionID) public view returns(uint) {
        int currentPartyID = getPartyID(partyID, electionID);
        return partyElections[uint(currentPartyID)].votes; 
    }
    
    function getVotesForCandidate(uint candidateID, uint electionID, uint regionID) public view returns(uint) {
        int currentCandidateID = getCandidateID(candidateID, electionID, regionID);
        return candidateElections[uint(currentCandidateID)].votes; 
    }
}