pragma solidity ^0.5.16;

contract Voting {

    event AddedElection(uint electionID);
    event AddedCandidateElection(bytes32 candidateElectionID);
    event VoteCasted(bytes32 voterElectionID);
    event AddedRegionElectionWinner(bytes32 regionElectionWinnerID);

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
        uint electionType;
        uint education;
        uint winner;
        bytes32 assemblyConstituencies;
        bool active;
        bool doesExist; 
    }

    struct CandidateElection {
        bytes32 id;
        uint electionID;
        uint candidateID;
        uint regionID;
        bool doesExist; 
    }

    struct VoterElection {
        bytes32 id;
        bytes32 voterID;
        uint regionID;
        uint electionID;
        uint candidateID;
    }

    struct RegionElectionWinner {
        bytes32 id;
        uint electionID;
        uint candidateID;
        uint regionID;
    }
 
    uint numElections;
    uint numVoterElections;
    uint numCandidateElections;
    uint numRegionElectionWinners;

    mapping (uint => Election) elections;
    mapping (bytes32 => VoterElection) voterElections;
    mapping (bytes32 => CandidateElection) candidateElections;
    mapping (bytes32 => RegionElectionWinner) regionElectionWinners;
    
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *  These functions perform transactions, editing the mappings *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
     
    function addElection(uint id, uint electionType, uint education, uint winner, bytes32 assemblyConstituencies) onlyOwner public {
        numElections++;
        elections[id] = Election(id, electionType, education, winner, assemblyConstituencies, true, true);
        emit AddedElection(id);
    }

    // Here candidateElectionID = "CND" + str(candidateID) + "ELC" + str(electionID);
    function addCandidateElection(bytes32 candidateElectionID, uint candidateID, uint electionID, uint regionID) onlyOwner public {
        numCandidateElections++;
        candidateElections[candidateElectionID] = CandidateElection(candidateElectionID, candidateID, electionID, regionID, true);
        emit AddedCandidateElection(candidateElectionID);
    }

    // Here voterElectionID = "VTR" + str(voterID) + "ELC" + str(electionID);
    function vote(bytes32 voterElectionID, bytes32 candidateElectionID, uint electionID, uint regionID, uint candidateID, bytes32 voterID) public {
        require(candidateElections[candidateElectionID].doesExist == true);
        numVoterElections++;
        voterElections[voterElectionID] = VoterElection(voterElectionID, voterID, regionID, electionID, candidateID);
        emit VoteCasted(voterElectionID);
    }

    // Here RegionElectionWinnerID = "RGN" + str(regionID) + "ELC" + str(electionID);
    function addRegionElectionWinner(bytes32 RegionElectionWinnerID, bytes32 candidateElectionID, uint regionID, uint electionID, uint candidateID) onlyOwner public {
        numRegionElectionWinners++;
        require(candidateElections[candidateElectionID].doesExist == true);
        require(candidateElections[candidateElectionID].regionID == regionID);
        regionElectionWinners[RegionElectionWinnerID] = RegionElectionWinner(RegionElectionWinnerID, regionID, electionID, candidateID);
        emit AddedRegionElectionWinner(RegionElectionWinnerID);
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * 
     *  Getter Functions, marked by the key word "view" *
     * * * * * * * * * * * * * * * * * * * * * * * * * */
    

    // finds the total amount of votes for a specific candidate by looping
    // through voters 
    // function totalVotes(uint candidateID) view public returns (uint) {
    //     uint numOfVotes = 0; // we will return this
    //     for (uint i = 0; i < numVoters; i++) {
    //         // if the voter votes for this specific candidate, we increment the number
    //         if (voters[i].candidateIDVote == candidateID) {
    //             numOfVotes++;
    //         }
    //     }
    //     return numOfVotes; 
    // }

    function getNumOfElections() public view returns(uint) {
        return numElections;
    }

    // returns candidate information, including its ID, name, and party
    // function getCandidate(uint candidateID) public view returns (uint,bytes32, bytes32) {
    //     return (candidateID,candidates[candidateID].name,candidates[candidateID].party);
    // }
}