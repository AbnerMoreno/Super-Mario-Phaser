const INIT_SPRITESHEET = [
    {
        key: 'mario',
        path: 'assets/entities/mario.png',
        frameWidth: 18,
        frameHeight: 16
    },

    {
        key: 'goomba',
        path: 'assets/entities/overworld/goomba.png',
        frameWidth: 16,
        frameHeight: 16
    },

    {
        key: 'coin',
        path: 'assets/collectibles/coin.png',
        frameWidth: 16,
        frameHeight: 16
    },

    {
        key: 'mario-grow',
        path: 'assets/entities/mario-grow.png',
        frameWidth: 18,
        frameHeight: 32
    }
]

export const initspritesheet = ({ load }) => {
INIT_SPRITESHEET.forEach(({ key, path, frameWidth, frameHeight }) => {
    load.spritesheet(key, path, { frameWidth, frameHeight })
});
}