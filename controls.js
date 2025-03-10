export function checkControls ({mario, keys}){

    if(this.keys.left.isDown){
        this.mario.body.touching.down && this.mario.anims.play('mario-walk', true)
        this.mario.x -= 2 
        this.mario.flipX = true
    }else if (this.keys.right.isDown){
        this.mario.body.touching.down && this.mario.anims.play('mario-walk', true);
        this.mario.x += 2
         this.mario.flipX = false
    }else if(this.mario.body.touching.down){
        this.mario.anims.stop()
        this.mario.setFrame(0)
    }
    
    if (this.keys.up.isDown && this.mario.body.touching.down) {
        this.mario.setVelocityY(-300)
        this.mario.anims.play('mario-jump', true) 

      }
}