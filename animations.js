export const createAnimations = (game) => {

    game.anims.create({
        key: 'mario-walk',
        frames: game.anims.generateFrameNumbers(
            'mario',
            {start: 3, end: 1}
        ),
        frameRate: 12,
        repeat: -1
    })


    game.anims.create({
        key:'mario-jump',
        frames: [{key: 'mario', frame: 5}]
    })

    game.anims.create({
        key:'mario-dead',
        frames: [{key: 'mario', frame: 4}]
    })

    game.anims.create({
        key:'goomba-walk',
        frames: game.anims.generateFrameNumbers(
            'goomba',
            {start: 0, end: 1}
        ),
        frameRate: 12,
        repeat: -1
    })

    game.anims.create({
        key:'goomba-hurt',
        frames: [{key: 'goomba', frame: 2}]
    })
}