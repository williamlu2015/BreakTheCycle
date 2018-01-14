var Game = new Vue({
  el: '#game',
  data: {
    day: 2,
    status: "You're feeling cold. Find clothes or your health and stress will decrease",
    stress: "Stressed",
    health: "Unhealthy",
    balance: 1200,
    currAction: "",
    supplies: {
      "shelter": 10,
      "food": 10,
      "clothing": 10
    }
  },
  methods: {
  },

})



// Used for testing purposes
//   button(v-on:click="doSomething()") Something
Game.doSomething = function () {
  alert("Doing something in Game")
}
