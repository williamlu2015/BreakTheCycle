var fs = require("fs");
var Web3 = require("web3");
var solc = require("solc");

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

var code = fs.readFileSync("Community.sol").toString();
var compiledCode = solc.compile(code);
var abiDefinition = JSON.parse(compiledCode.contracts[":Community"].interface);
var CommunityContract = web3.eth.contract(abiDefinition);
var byteCode = compiledCode.contracts[":Community"].bytecode;
var deployedContract = CommunityContract.new({
    data: byteCode,
    from: web3.eth.accounts[0],
    gas: 4700000
});
console.log("setting timeout")
setTimeout(() => {
    console.log(deployedContract.address);
    var contractInstance = CommunityContract.at(deployedContract.address);
    contractInstance.consumeShelter.call({from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"})
    contractInstance.consumeShelter.call({from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"})
    
}, 2000);
