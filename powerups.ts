// powerups.ts - coins, missiles, boost/shield pickups
function spawnCoin() {
    let coin = sprites.create(img`
        . f f f .
        f 5 5 4 f
        f 5 4 4 f
        f 4 4 4 f
        . f f f .
    `, SpriteKind.Food)
    let spot = randint(0, 3)
    coin.setPosition(wayX[spot] + randint(-8, 8), wayY[spot] + randint(-6, 6))
}

function spawnPowerUp() {
    let kind = randint(0, 2)
    let imgP = img`
        . . 2 2 . .
        . 2 5 5 2 .
        2 5 1 1 5 2
        2 5 1 1 5 2
        . 2 5 5 2 .
        . . 2 2 . .
    `
    if (kind == 1) {
        imgP = img`
            . . 8 8 . .
            . 8 9 9 8 .
            8 9 1 1 9 8
            8 9 1 1 9 8
            . 8 9 9 8 .
            . . 8 8 . .
        `
    } else if (kind == 2) {
        imgP = img`
            . . 4 4 . .
            . 4 2 2 4 .
            4 2 5 5 2 4
            4 2 5 5 2 4
            . 4 2 2 4 .
            . . 4 4 . .
        `
    }
    let p = sprites.create(imgP, SpriteKind.PowerUp)
    p.setPosition(randint(20, 140), randint(20, 100))
    p.data = "" + kind
    p.lifespan = 8000
}

function fireMissile() {
    if (missileAmmo <= 0) {
        game.splash("No missiles!")
        return
    }
    missileAmmo -= 1
    playMissileSound()
    flashLights(2)
    let m = sprites.create(img`
        . . 1 . .
        . 2 2 2 .
        2 5 5 5 2
        . 2 2 2 .
        . . 4 . .
    `, SpriteKind.Missile)
    m.setPosition(lwtgamemovpc.x, lwtgamemovpc.y)
    m.z = 15
    let rad = angle * Math.PI / 180
    m.setVelocity(Math.cos(rad) * 140, Math.sin(rad) * 140)
    m.lifespan = 900
}

function setupPickups() {
    spawnCoin()
    spawnCoin()
    spawnCoin()
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
        otherSprite.destroy()
        coins += 50
        info.changeScoreBy(50)
        playCoinSound()
        flashLights(5)
        spawnCoin()
    })
    sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
        let kind = 0
        if (otherSprite.data == "1") { kind = 1 }
        if (otherSprite.data == "2") { kind = 2 }
        otherSprite.destroy(effects.starField, 100)
        playBuySound()
        if (kind == 0) {
            boostUntil = game.runtime() + 2500
            flashLights(5)
            game.splash("BOOST!")
        } else if (kind == 1) {
            shieldUntil = game.runtime() + 3500
            flashLights(8)
            game.splash("SHIELD!")
        } else {
            missileAmmo += 2
            flashLights(2)
            game.splash("AMMO +2")
        }
    })
    sprites.onOverlap(SpriteKind.Missile, SpriteKind.Enemy, function (missile, enemy) {
        missile.destroy(effects.fire, 80)
        enemy.x += randint(-10, 10)
        enemy.y += randint(-10, 10)
        enemy.setVelocity(0, 0)
        info.changeScoreBy(25)
        coins += 25
        flashLights(2)
        playCrashSound()
        scene.cameraShake(4, 180)
    })
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
        if (game.runtime() < shieldUntil) {
            otherSprite.x += randint(-8, 8)
            flashLights(8)
            return
        }
        speed = 0 - speed / 2
        scene.cameraShake(3, 200)
        flashLights(2)
        playCrashSound()
        otherSprite.x += randint(-4, 4)
    })
    game.onUpdateInterval(4500, function () {
        if (!shopOpen) {
            spawnPowerUp()
        }
    })
}
