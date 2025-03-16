/* global Phaser */

import { createAnimations } from "./animations.js"
import { initAudio, playAudio } from "./audio.js"
import { checkControls } from "./controls.js"
import { initspritesheet } from "./spritesheet.js"
const config = {
    autoFocus: false,
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }

    },
    scene: {
        preload,
        create,
        update
    }
}

new Phaser.Game(config)

function preload() {

    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )

    this.load.image(
        'floorbicks',
        'assets/scenery/overworld/floorbricks.png'
    )

    this.load.image(
        'supermushroom',
        'assets/collectibles/super-mushroom.png'
    )

    initspritesheet(this)
    initAudio(this)
}

function create() {

    function createClouds(numClouds) {
        let lastX = 0;
        let lastY = 0;
        const minDistanceX = 150; // Minimum horizontal distance between clouds
        const minDistanceY = 30; // Minimum vertical distance between clouds

        for (let i = 0; i < numClouds; i++) {
            let x, y;
            do {
                x = Phaser.Math.Between(0, config.width);
            } while (Math.abs(x - lastX) < minDistanceX);

            do {
                y = Phaser.Math.Between(0, config.height / 5);
            } while (Math.abs(y - lastY) < minDistanceY);

            const scale = Phaser.Math.FloatBetween(0.1, 0.3);
            this.add.image(x, y, 'cloud1')
                .setOrigin(0, 0.5)
                .setScale(scale);

            lastX = x;
            lastY = y;
        }
    }

    createAnimations(this)

    createClouds.call(this, 20);

    // this.add.image(0, 0, 'cloud1')
    //     .setOrigin(0, 0)
    //     .setScale(0.15)

    // this.add.image(80, 60, 'cloud1')
    //     .setOrigin(0, 0)
    //     .setScale(0.20)


    // this.add.image(150, 0, 'cloud1')
    //     .setOrigin(0,0)
    //     .setScale(0.20)


    this.floor = this.physics.add.staticGroup()

    this.floor
        .create(0, config.height - 16, 'floorbicks')
        .setOrigin(0, 0.5)
        .refreshBody();

    this.floor
        .create(128, config.height - 16, 'floorbicks')
        .setOrigin(0, 0.5)
        .refreshBody();

    this.floor
        .create(300, config.height - 16, 'floorbicks')
        .setOrigin(0, 0.5)
        .refreshBody();

    this.floor
        .create(428, config.height - 16, 'floorbicks')
        .setOrigin(0, 0.5)
        .refreshBody();

    this.mario = this.physics.add.sprite(50, 100, 'mario')
        .setOrigin(0, 1)
        .setGravityY(500)
        .setCollideWorldBounds(true)

    this.enemy = this.physics.add.sprite(220, config.height - 30, 'goomba')
        .setOrigin(0, 1)
        .setGravityY(500)
        .setVelocityX(-50)
        .setCollideWorldBounds(true)


    this.collectibes = this.physics.add.staticGroup()
    this.collectibes.create(150, 150, 'coin').anims.play('coin-spin', true)
    this.collectibes.create(300, 150, 'coin').anims.play('coin-spin', true)
    this.collectibes.create(360, config.height - 40, 'supermushroom').anims.play('supermushroom-idle', true)
    this.physics.add.overlap(this.mario, this.collectibes, collectItem, null, this)

    this.physics.world.setBounds(0, 0, 2000, config.height)
    this.physics.add.collider(this.mario, this.floor)
    this.physics.add.collider(this.enemy, this.floor)
    this.physics.add.collider(this.mario, this.enemy, onHitEnemy, null, this)

    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    this.enemy.anims.play('goomba-walk', true)

    this.keys = this.input.keyboard.createCursorKeys()

}

function collectItem(mario, item) {
    const {texture: {key}} = item
    if(key === 'coin') {
        item.destroy()
        playAudio('coin-pickup', this, { volume: 0.05 })
        addToScore('+100', item, this)
    } else if(key === 'supermushroom') {
        item.destroy()
        console.log('Unknown item', item)
    }
}

function addToScore(scoreToAdd, origin, game) {

    const scoreText = game.add.text(origin.x, origin.y, scoreToAdd, {
        fontFamily: 'pixel',
        fontSize: '9px',
        color: '#fff'
    }).setOrigin(0.5, 1)

    game.tweens.add({
        targets: scoreText,
        y: scoreText.y - 20,
        alpha: 0,
        duration: 500,
        ease: 'Linear',
        onComplete: () => scoreText.destroy()
    })
}

function onHitEnemy(mario, enemy) {
    if (mario.body.touching.down && enemy.body.touching.up) {
        enemy.anims.play('goomba-hurt', true)
        enemy.setVelocityX(0)
        mario.setVelocityY(-290)

        playAudio('goomba-stomp', this)
        addToScore('+200', enemy, this)

        setTimeout(() => {
            enemy.destroy()
        }, 500);

    } else {
        killMario(this)
    }
}

function update() {

    const { mario } = this
    checkControls(this)


    if (mario.y >= config.height) {
        killMario(this)
    }

}

function killMario(game) {

    const { mario, scene } = game

    if (mario.isDead) return

    mario.isDead = true
    mario.anims.play('mario-dead')
    mario.setCollideWorldBounds(false)

    playAudio('gameover', game, { volume: 0.1 })

    mario.body.checkCollision.none = true
    mario.setVelocityX(0)


    setTimeout(() => {
        mario.setVelocityY(-350)
    }, 100);

    setTimeout(() => {
        scene.restart()
    }, 2000);
}