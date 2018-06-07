
new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        logs: [] //渲染日志，初始化时是空数组
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.logs = [];
        },
        attack: function() {
            //YOU攻击MONSTER
            // var max = 10;
            // var min = 3;
            // var damage = Math.max(Math.floor(Math.random() * max + 1),min);  //取值在（3,10）之间。Math(max,min)
            var damage = this.calDamage(10,3);
            this.monsterHealth -= damage;
            //渲染日志：攻击怪物时
            this.logs.unshift({
                isPlayer: true,
                damage: "player hits monster for " + damage
            })
            
            // if(this.monsterHealth <= 0) {
            //     alert("You Win !!");
            //     this.gameIsRunning = false;
            //     return;
            // }
            if(this.checkWin()) {
                return;
            }
            //MONSTER攻击YOU
            // max = 12;
            // min = 5;
            // var damage = Math.max(Math.floor(Math.random() * max + 1),min);  //取值在（3,10）之间。Math(max,min)            
            // this.playerHealth -= this.calDamage(12,5);
            // // if(this.playerHealth <= 0) {
            // //     alert("You Lost!!");
            // //     this.gameIsRunning = false;
            // //     return;
            // // }
            // this.checkWin();
            this.monsterAttack();
        },
        specialAttack: function() {
            var damage = this.calDamage(20,10);
            this.monsterHealth -= damage;
            //渲染日志：攻击怪物时
            this.logs.unshift({
                isPlayer: true,
                damage: "player hits monster hard for " + damage
            })

            if(this.checkWin()) {
                return;
            }
            // this.playerHealth -= this.calDamage(12,5);
            // this.checkWin();
            this.monsterAttack();
        },
        //打击怪物部分代码重复
        monsterAttack: function() {
            var damage = this.calDamage(12,5);
            this.playerHealth -= damage;
            //渲染日志：怪物攻击
            this.logs.unshift({
                isPlayer: false,
                damage: "monster hits player for " + damage
            })
            this.checkWin();
        },
        heal: function() {
            if(this.playerHealth <= 90) {
                this.playerHealth += 10;    
            }else{
                this.playerHealth = 100;
            }
            //渲染日志
            this.logs.unshift({
                isPlayer: true,
                damage: "playler heals for 10"
            })
            this.monsterAttack();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        //将相同部分的函数提取:获取伤害值
        calDamage: function(max, min) {
            return Math.max(Math.floor(Math.random() * max + 1),min);
        },
        //提取公共函数：判断游戏成功/失败
        checkWin: function() {
            if(this.monsterHealth <= 0) {
                if(confirm("You Win ! New Game?")) {
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }else if( this.playerHealth <= 0) {
                if(confirm("You Lost ! New Game?")) {
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
})