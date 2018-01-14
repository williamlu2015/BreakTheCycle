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
var contractInstance = CommunityContract.at(deployedContract.address);



console.log("setting timeout")
setTimeout(() => {
    console.log(deployedContract.address);
    var contractInstance = CommunityContract.at(deployedContract.address);
    contractInstance.consumeShelter.call({from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"})
    contractInstance.consumeShelter.call({from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"})
    
}, 2000);


contractInstance.middleman({from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"})

web3.eth.sendTransaction({from: '0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE', to : '0x6330A553Fc93768F612722BB8c2eC78aC90B3bbc', gas: 21000, gasPrice: web3.toWei(1, 'gwei'), value: 1000000000})