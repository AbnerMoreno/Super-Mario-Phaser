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