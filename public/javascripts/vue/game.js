var Game = new Vue({
  el: '#game',
  data: {
    day: 2,
    status: "You're feeling cold. Find clothes or your health and stress will decrease",
    stress: "Stressed",
    health: "Unhealthy",
    balance: 1200,
    currAction: 2,
    supplies: [10, 10, 10], //Refers to shelter, food, clothing
    popupTitles: ['Shelter', 'Food Bank', 'Clothing Donation'],
    popupDescriptions: [
      'A warm shelter can go a long way on a cold winter day',
      'Food bank description',
      'Clothing donation'
    ],
    supplyMessages: [
      'The number of beds available is',
      'The amount of food available is',
      'The number of clothing available is'
    ],
    instance: {},
  },
  methods: {
  },

})


var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
abi = JSON.parse('[{"constant":true,"inputs":[],"name":"clothing","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"donateShelter","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"consumeShelter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"playerList","outputs":[{"name":"balance","type":"uint256"},{"name":"health","type":"uint256"},{"name":"stress","type":"uint256"},{"name":"status","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"foodBank","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"shelter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getShelter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"carePackage","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
CommunityContract = web3.eth.contract(abi);
Game.instance = CommunityContract.at('0x7153ccd1a20bbb2f6dc89c1024de368326ec6b4f');

// Used for testing purposes
//   button(v-on:click="doSomething()") Something
Game.consumeShelter = function () {
  _this = this;  
  //TODO encapsulate in function
  this.instance.consumeShelter({from: web3.eth.accounts[0]}, function() {
    x = _this.instance.consumeShelter.call({from: web3.eth.accounts[0]}).toString();
    console.log("X:", x);
  })
}


Game.donateShelter = function () {
  _this = this;
  this.instance.donateShelter(1, {from: web3.eth.accounts[0]}, function() {
    x = _this.instance.donateShelter.call(1, {from: web3.eth.accounts[0]}).toString();
    console.log("Donated: ", x);
  })
}


Game.consumeFB = function() {
  _this = this;  
  //TODO encapsulate in function
  this.instance.consumeFB({from: web3.eth.accounts[0]}, function() {
    x = _this.instance.consumeFB.call({from: web3.eth.accounts[0]}).toString();
  })
}

Game.donateFB = function() {
  _this = this;
  this.instance.donateFB(1, {from: web3.eth.accounts[0]}, function() {
    x = _this.instance.donateFB.call(1, {from: web3.eth.accounts[0]}).toString();
    console.log("Donated: ", x);
  })
}

Game.consumeClothing = function() {
  //TODO encapsulate in function
  this.instance.consumeClothing({from: web3.eth.accounts[0]}, function() {
    x = _this.instance.consumeClothing.call({from: web3.eth.accounts[0]}).toString();
    console.log("X:", x);
  })
}

Game.donateClothing = function() {
  this.instance.donateClothing(1, {from: web3.eth.accounts[0]}, function() {
    x = _this.instance.donateClothing.call(1, {from: web3.eth.accounts[0]}).toString();
    console.log("Donated: ", x);
  })
}