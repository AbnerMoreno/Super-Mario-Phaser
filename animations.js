import { checkControls } from "./controls"

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

    // checkControls(game, key)
}