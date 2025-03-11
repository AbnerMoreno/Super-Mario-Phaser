/* global Phaser */

import { createAnimations } from "./animations.js"
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

    this.physics.world.setBounds(0, 0, 2000, config.height)
    this.physics.add.collider(this.mario, this.floor)

    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    createAnimations(this)

    this.keys = this.input.keyboard.createCursorKeys()
}

function update() {

    const {keys,mario} = this
    
    const isMarioTouchingFloor = mario.body.touching.down

    if(this.mario.isDead)return

    if(keys.left.isDown){
        isMarioTouchingFloor && this.mario.anims.play('mario-walk', true)
        mario.x -= 2 
        mario.flipX = true
    }else if (keys.right.isDown){
        isMarioTouchingFloor && mario.anims.play('mario-walk', true);
        mario.x += 2
        mario.flipX = false
    }else if(isMarioTouchingFloor){
        mario.anims.stop()
        mario.setFrame(0)
    }
    
    if (keys.up.isDown && isMarioTouchingFloor) {
        mario.setVelocityY(-300)
        mario.anims.play('mario-jump', true) 

      }

    if(mario.y >= config.height){
        mario.isDead = true
        mario.anims.play('mario-dead')
        mario.setCollideWorldBounds(false)
        let gameoverSound = this.sound.add('gameover', {volume: 0.5});gameoverSound.play();

        this.time.delayedCall(1999, () =>{
            gameoverSound.stop();
        })

        setTimeout(() => {
            this.mario.setVelocityY(-350)
        }, 100);

        setTimeout(() => {
            this.scene.restart()
        }, 2000);
    }

}