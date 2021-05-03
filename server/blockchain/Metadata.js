const ADDRESS = '0x48Ec4798608BAE6CC0589521Fe170364af8ec454';
const ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"candidateID","type":"uint256"}],"name":"AddedCandidateElection","type":"event","signature":"0xa9b81d4f585c7b38e70a95acbdaf4ef7c4ea75e9f26a6af5b91144ca5b39df0f"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"electionID","type":"uint256"}],"name":"AddedElection","type":"event","signature":"0x554a23e1171b6915944e69f735d405ad30a7b748f607858dce166c8c944f5ff7"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"partyID","type":"uint256"}],"name":"AddedPartyElection","type":"event","signature":"0xafc75370e46f156b65a33b20fd05b7dc17814f7742dd2db62cb32fe15f2cfe92"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"voterID","type":"string"}],"name":"AlreadyVoted","type":"event","signature":"0x1e3998f7153d6a780a9be9211f7c6ceb6438b1ef8bf0346aa57a8d78313100f8"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"candidateID","type":"uint256"}],"name":"CandidateAlreadyStandingForElection","type":"event","signature":"0xe0d6684e81aa3d9a345b14cb7ba28e88a8c6459970361ed9cfb4d00af1ed1ea8"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"candidateID","type":"uint256"}],"name":"CandidateNotFound","type":"event","signature":"0x66ad993211b43486657242edf81e6348fb52f2e755d23d9a1a8ec96a9bbbd7c0"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"electionID","type":"uint256"}],"name":"ElectionAlreadyExists","type":"event","signature":"0x2f6846747b08ae4820a6d54e59366bcb891d5f0be3b3a62610d29c1279427fe7"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"electionID","type":"uint256"}],"name":"ElectionNotFound","type":"event","signature":"0x9cb390c002ca2972b63e982eeb1673bbdaf8c1ff1bba09f83255a009c2b470ff"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"partyID","type":"uint256"}],"name":"PartyAlreadyExists","type":"event","signature":"0x47fb42e2bb707bd945e67fd8df4dec5b7bf5acc9e31647d13ce23f74884bcd96"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"partyID","type":"uint256"}],"name":"PartyAlreadyStandingForRegion","type":"event","signature":"0x8b888679e6bad82c2c9a895d79f0b74b26f9adcde222d398e8c872117ee9fb2f"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"partyID","type":"uint256"}],"name":"PartyNotFound","type":"event","signature":"0x32ae26584efce1a1d21b08b84870396fc8ab6df2ed5af1ed1893284ce733c781"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"voterID","type":"string"}],"name":"VoteCasted","type":"event","signature":"0xcd63cc839e5f0f85c27f29e02b4e7d4e695820f9600a1cd819c990d39762e852"},{"constant":false,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"addElection","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xe7a49b9e"},{"constant":false,"inputs":[{"internalType":"uint256","name":"partyID","type":"uint256"},{"internalType":"uint256","name":"electionID","type":"uint256"}],"name":"addParty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xe9cde29d"},{"constant":false,"inputs":[{"internalType":"uint256","name":"candidateID","type":"uint256"},{"internalType":"uint256","name":"electionID","type":"uint256"},{"internalType":"uint256","name":"regionID","type":"uint256"},{"internalType":"uint256","name":"partyID","type":"uint256"}],"name":"addCandidateElection","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xd1601f3f"},{"constant":false,"inputs":[{"internalType":"string","name":"voterID","type":"string"},{"internalType":"uint256","name":"electionID","type":"uint256"},{"internalType":"uint256","name":"regionID","type":"uint256"},{"internalType":"uint256","name":"candidateID","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x776a657b"},{"constant":true,"inputs":[{"internalType":"string","name":"voterID","type":"string"},{"internalType":"uint256","name":"electionID","type":"uint256"}],"name":"hasVoterVoted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x168144ed"},{"constant":true,"inputs":[{"internalType":"uint256","name":"candidateID","type":"uint256"},{"internalType":"uint256","name":"electionID","type":"uint256"}],"name":"hasCandidateStoodForElection","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xa3ea7986"},{"constant":true,"inputs":[],"name":"getNumOfElections","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xa9d32570"},{"constant":true,"inputs":[],"name":"getCountOfParties","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x8c3eb0f4"},{"constant":true,"inputs":[{"internalType":"uint256","name":"electionID","type":"uint256"}],"name":"getNumOfParties","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xda28227c"},{"constant":true,"inputs":[{"internalType":"uint256","name":"electionID","type":"uint256"}],"name":"getNumOfCandidates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x980ff7af"},{"constant":true,"inputs":[{"internalType":"uint256","name":"electionID","type":"uint256"}],"name":"getNumOfVoters","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x77813f4f"},{"constant":true,"inputs":[{"internalType":"uint256","name":"candidateID","type":"uint256"},{"internalType":"uint256","name":"electionID","type":"uint256"},{"internalType":"uint256","name":"regionID","type":"uint256"}],"name":"getCandidateID","outputs":[{"internalType":"int256","name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x779319f0"},{"constant":true,"inputs":[{"internalType":"uint256","name":"partyID","type":"uint256"},{"internalType":"uint256","name":"electionID","type":"uint256"}],"name":"getPartyID","outputs":[{"internalType":"int256","name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xa9fcdd78"},{"constant":true,"inputs":[{"internalType":"uint256","name":"partyID","type":"uint256"},{"internalType":"uint256","name":"electionID","type":"uint256"},{"internalType":"uint256","name":"regionID","type":"uint256"}],"name":"hasPartyStoodForRegion","outputs":[{"internalType":"int256","name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x570cd404"},{"constant":true,"inputs":[{"internalType":"uint256","name":"partyID","type":"uint256"},{"internalType":"uint256","name":"electionID","type":"uint256"}],"name":"getVotesForParty","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x74806097"},{"constant":true,"inputs":[{"internalType":"uint256","name":"candidateID","type":"uint256"},{"internalType":"uint256","name":"electionID","type":"uint256"},{"internalType":"uint256","name":"regionID","type":"uint256"}],"name":"getVotesForCandidate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xdfb74e07"}];
module.exports = { ADDRESS, ABI };