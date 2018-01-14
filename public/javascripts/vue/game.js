var Game = new Vue({
  el: '#game',
  data: {
    day: 1,
    time: false,   // false = early morning, true = late day
    status: 0,   // 0: all good, 1: need food, 2: need clothing, 3: need both
    stress: true,   // true = unstressed, false = stressed
    health: true,   // true = healthy, false = unhealthy
    home: false,   // true if player has found a home
    balance: 1200,
    currAction: -1,
    supplies: [10, 10, 10], //Refers to shelter, food, clothing
    popupTitles: ['Shelter', 'Food Bank', 'Clothing Donation', "Find a Home", "Find a Job"],
    popupDescriptions: [
      'A warm shelter can go a long way on a cold winter day',
      'Due to the kindness of your community, a hot meal awaits you today',
      'Thanks to donation and recycling efforts, you can find used clothes here',
      "Find a permanent home to break the cycle and work towards a job",
      "Find a job to break the cycle and claim your place on the hall of fame"
    ],
    supplyMessages: [
      'The number of beds available is',
      'The amount of food available is',
      'The number of clothing available is',
      "You need a balance of $2000 to find a home",
      "You need a home and a balance of $1000 to find a job"
    ],
    instance: {},
  },
  methods: {
  },

})

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"donateClothing","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"getClothing","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"clothing","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"consumeFB","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getFoodBank","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"donateShelter","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"donateFB","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"consumeShelter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"playerList","outputs":[{"name":"balance","type":"uint256"},{"name":"health","type":"uint256"},{"name":"stress","type":"uint256"},{"name":"status","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"foodBank","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"shelter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"consumeClothing","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getShelter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"carePackage","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
CommunityContract = web3.eth.contract(abi);
Game.instance = CommunityContract.at('0x51815cebef59b88dafd1a5f24095eee1236ffcdd');

//Initializing
Game.supplies[0] = parseInt(Game.instance.getShelter.call({from: web3.eth.accounts[0]}).toString());
Game.supplies[1] = parseInt(Game.instance.getFoodBank.call({from: web3.eth.accounts[0]}).toString());
Game.supplies[2] = parseInt(Game.instance.getClothing.call({from: web3.eth.accounts[0]}).toString());
Game.$forceUpdate();

// Used for testing purposes
//   button(v-on:click="doSomething()") Something
Game.consumeShelter = function () {
  if (!this.supplies[0]) {
    alert("It's subzero outside and the shelters have no more space. Donate to the Covenent House to help house vulnerable youth today.");
    return;
  }

  var _this = this;
  this.instance.consumeShelter({from: web3.eth.accounts[0]}, function() {
    _this.supplies[0] = parseInt(_this.instance.getShelter.call({from: web3.eth.accounts[0]}).toString());
    console.log("supplies[0]", _this.supplies[0]);
    if (_this.time) {
      _this.day++;

      // Check if player's state is "all good" and increase balance if so
      if (_this.status == 0 && _this.stress && _this.health) {
        _this.balance += 25;
      } else if (_this.status == 1 || _this.status == 3) {
        _this.health = false;
      }
      if (_this.status == 2 || _this.status == 3) {
        _this.stress = false;
      }

      // Randomly generate state for next day
      _this.status = Math.floor(4 * Math.random());
    }
    _this.time = !_this.time;
    _this.$forceUpdate();
  })

}


Game.donateShelter = function () {
  var _this = this;
  this.instance.donateShelter(1, {from: web3.eth.accounts[1]}, function() {
    x = _this.instance.donateShelter.call(1, {from: web3.eth.accounts[1]}).toString();
    _this.supplies[0] += parseInt(x);
    console.log("Donated: ", x);
    _this.$forceUpdate();
  })

  web3.eth.sendTransaction({from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57', to : '0x0F4F2Ac550A1b4e2280d04c21cEa7EBD822934b5', gas: 21000, gasPrice: web3.toWei(1, 'gwei'), value: 1000000000000000000})
}


Game.consumeFB = function() {
  if (!this.supplies[1]) {
    alert("The Food Bank is running low. Each week 27,000 rely on the Greater Vancouver Food Bank alone. Donate now to the food bank.")
    return;
  }
  
  var _this = this;  
  this.instance.consumeFB({from: web3.eth.accounts[0]}, function() {
    _this.supplies[1] = parseInt(_this.instance.getFoodBank.call({from: web3.eth.accounts[0]}).toString());
    console.log("supplies[1]", _this.supplies[1]);

    // If state is "need food" (1 or 3), set it to "don't need food" (0 or 2)
    if (_this.status == 1 || _this.status == 3) {
      _this.status--;
    }
    _this.health = true;

    if (_this.time) {
      _this.day++;

      if (_this.status == 0 && _this.stress && _this.health) {
        _this.balance += 25;
      } else if (_this.status == 1 || _this.status == 3) {
        _this.health = false;
      }
      if (_this.status == 2 || _this.status == 3) {
        _this.stress = false;
      }

      _this.status = Math.floor(4 * Math.random());
    }
    _this.time = !_this.time;
    _this.$forceUpdate();
  })
}

Game.donateFB = function() {
  var _this = this;
  this.instance.donateFB(1, {from: web3.eth.accounts[0]}, function() {
    x = _this.instance.donateFB.call(1, {from: web3.eth.accounts[0]}).toString();
    _this.supplies[1] += parseInt(x);
    console.log("Donated: ", x);
    _this.$forceUpdate();
  })

  web3.eth.sendTransaction({from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57', to : '0x6330A553Fc93768F612722BB8c2eC78aC90B3bbc', gas: 21000, gasPrice: web3.toWei(1, 'gwei'), value: 1000000000000000000})
}

Game.consumeClothing = function() {
  var _this = this;
  this.instance.consumeClothing({from: web3.eth.accounts[0]}, function() {
    _this.supplies[2] = parseInt(_this.instance.getClothing.call({from: web3.eth.accounts[0]}).toString());
    console.log("supplies[2]", _this.supplies[2]);

    if (_this.status == 2) {
      _this.status = 0;
    } else if (_this.status == 3) {
      _this.status = 1;
    }
    _this.stress = true;

    if (_this.time) {
      _this.day++;

      if (_this.status == 0 && _this.stress && _this.health) {
        _this.balance += 25;
      } else if (_this.status == 1 || _this.status == 3) {
        _this.health = false;
      }
      if (_this.status == 2 || _this.status == 3) {
        _this.stress = false;
      }

      _this.status = Math.floor(4 * Math.random());
    }
    _this.time = !_this.time;
    _this.$forceUpdate();
  })
}

Game.donateClothing = function() {
  var _this = this;
  this.instance.donateClothing(1, {from: web3.eth.accounts[0]}, function() {
    x = parseInt(_this.instance.donateClothing.call(1, {from: web3.eth.accounts[0]}).toString());
    _this.supplies[2] += parseInt(x);
    console.log("Donated: ", x);
    _this.$forceUpdate();
  })
  web3.eth.sendTransaction({from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57', to : '0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE', gas: 21000, gasPrice: web3.toWei(1, 'gwei'), value: 1000000000000000000})
}

Game.findHome = function() {
  if (this.home) {
    alert("You already have a home");
    return;
  }
  if (this.balance < 1300) {
    alert("Not enough money");
    return;
  }
  this.balance -= 1300;
  this.home = true;
}

Game.findJob = function() {
  // note: if the player already has a job, the game would have ended

  if (!this.home) {
    alert("You need a home to get a job");
    return;
  }

  if (this.balance < 100) {
    alert("Not enough money");
    return;
  }
  this.balance -= 100;

  // TODO: end the game when the player has a job
}

Game.toggleAction = function(action) { 
  this.currAction = action;
}