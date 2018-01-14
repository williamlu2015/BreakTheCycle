var Game = new Vue({
  el: '#game',
  data: {
    day: 2,
    status: "You're feeling cold. Find clothes or your health will decrease",
    stress: "Stressed",
    health: "Unhealthy",
    balance: 1200
  },
  methods: {
  },

})

Game.doSomething = function () {
  alert("Doing something in Game")
}
