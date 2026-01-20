// Exemple de message recu par le backend, à utiliser pour vos tests :
const backendData = {
   "isRunning":true,
   "isOver":false,
   "timer":190.6000000000091,
   "players":{
      "3cd71bbb-6a6b-4d4e-80e3-107130328a27":{
         "name":"blabla",
         "skinPath":"./spritesheets/3.png",
         "position":[
            0.5600000000000003,
            0.17999999999999977
         ],
         "lvl":1,
         "hp":100,
         "maxHp":100,
         "hpRegenRate":10,
         "speed":0.2,
         "direction":3,
         "isAttacking":false,
         "isWalking":false,
         "isDying":false,
         "attackCooldown":1,
         "currentAttackCooldown":0
      },
      "28ead291-fcea-4b41-a596-d3c876c49a53":{
         "name":"bloublou",
         "skinPath":"./spritesheets/4.png",
         "position":[
            0.44,
            0.19
         ],
         "lvl":1,
         "hp":100,
         "maxHp":100,
         "hpRegenRate":10,
         "speed":0.2,
         "direction":0,
         "isAttacking":false,
         "isWalking":false,
         "isDying":false,
         "attackCooldown":1,
         "currentAttackCooldown":0
      }
   }
};

class Game {
    constructor (){
    	this.isRunning = false;
    	this.isOver = false;
      	this.timer = 0;
      	this.players = {};
   	}

	updateFromBackend(backendData) {
    this.isRunning = backendData.isRunning;
    this.isOver = backendData.isOver;
    this.timer = backendData.timer;

    const serverPlayers = backendData.players;

    for (const playerId in this.players) {
        if (!serverPlayers[playerId]) {
            delete this.players[playerId];
        }
    }
      
    for (const playerId in serverPlayers) {
        if (this.players[playerId]) {
            this.players[playerId].update(serverPlayers[playerId]);
        }
        else {
            this.players[playerId] = new player (
               playerId,
               serveurPlayers[playerId]
        	);
        }
      }
   }
}