const MARIO_ANIMATIONS = {
    grown:{
        idle: 'mario-grow-idle',
        walk: 'mario-grow-walk',
        jump: 'mario-grow-jump',
        dead: 'mario-grow-dead'
    },
    normal:{
        idle: 'mario-idle',
        walk: 'mario-walk',
        jump: 'mario-jump',
        dead: 'mario-dead'
    }
}

export function checkControls({mario, keys}) {
    
    const isMarioTouchingFloor = mario.body.touching.down

    const isLeftKeyDown = keys.left.isDown
    const isRightKeyDown = keys.right.isDown
    const isUpKeyDown = keys.up.isDown

    if(mario.isDead)return

    if(isLeftKeyDown){
        isMarioTouchingFloor && mario.anims.play('mario-walk', true)
        mario.x -= 2 
        mario.flipX = true
    }else if (isRightKeyDown){
        isMarioTouchingFloor && mario.anims.play('mario-walk', true);
        mario.x += 2
        mario.flipX = false
    }else if(isMarioTouchingFloor){
        mario.anims.stop()
        mario.setFrame(0)
    }
    
    if (isUpKeyDown && isMarioTouchingFloor) {
        mario.setVelocityY(-300)
        mario.anims.play('mario-jump', true) 

      }

}