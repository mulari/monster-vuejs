new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {

            // Human damage
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            //Check if we won
            if (this.checkWin()) {
                return;
            }

            //Monster damage
            this.monsterAttacks();

            this.checkWin();

        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'Player uses special attack for ' + damage + ' damage!'
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        heal: function() {
            if (this.playerhealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10 HP'
            });
            this.monsterAttacks();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        monsterAttacks: function() {
            var monsterDamage = this.calculateDamage(5, 12);
            this.playerHealth -= monsterDamage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + monsterDamage
            });
            
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if(this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                    } else {
                        this.gameIsRunning = false;
                    }
                    return true;
            }
            return false;
        }
    }
});