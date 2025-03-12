/* global Phaser */

import { createAnimations } from "./animations.js"
import { checkControls } from "./controls.js"
// import { checkControls } from "./controls.js"

const config = {
    autoFocus: false,
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor:'#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:300},
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

    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        {frameWidth: 18, frameHeight: 16 }
    )

    this.load.spritesheet(
        'goomba',
        'assets/entities/overworld/goomba.png',
        {frameWidth: 16, frameHeight: 16 }
    )

    this.load.audio('gameover', 'assets/sound/music/gameover.mp3')
}

function create() {
    this.add.image(0, 0, 'cloud1')
        .setOrigin(0, 0  )
        .setScale(0.15)


    this.floor = this.physics.add.staticGroup()

    this.floor
        .create(0, config.height -16, 'floorbicks')
        .setOrigin(0,0.5)
        .refreshBody();

    this.floor
        .create(160, config.height -16, 'floorbicks')
        .setOrigin(0,0.5)
        .refreshBody();

    this.mario = this.physics.add.sprite(50, 100, 'mario')
        .setOrigin(0,1)
        .setGravityY(500)
        .setCollideWorldBounds(true)

    this.enemy = this.physics.add.sprite(120, config.height - 64, 'goomba')
        .setOrigin(0,1)
        .setGravityY(500)
        .setVelocityX(-50)
        .setCollideWorldBounds(true)

    this.physics.world.setBounds(0, 0, 2000, config.height)
    this.physics.add.collider(this.mario, this.floor)
    this.physics.add.collider(this.enemy, this.floor)
    this.physics.add.collider(this.mario, this.enemy, onHitEnemy)

    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    createAnimations(this)

    this.enemy.anims.play('goomba-walk', true)

    this.keys = this.input.keyboard.createCursorKeys()

}

function onHitEnemy(mario,enemy) {
    if(mario.body.touching.down && enemy.body.touching.up){
        enemy.destroy()
        mario.setVelocityY(-290)
    }
}

function update() {

    checkControls(this)

    const{mario,sound,scene, time } = this

    if(mario.y >= config.height){
        mario.isDead = true
        mario.anims.play('mario-dead')
        mario.setCollideWorldBounds(false)
        let gameoverSound = sound.add('gameover', {volume: 0.1});gameoverSound.play();

        time.delayedCall(1999, () =>{
            gameoverSound.stop();
        })

        setTimeout(() => {
            mario.setVelocityY(-350)
        }, 100);

        setTimeout(() => {
            scene.restart()
        }, 2000);
    }

}