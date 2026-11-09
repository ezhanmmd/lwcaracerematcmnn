// car.ts - player car art, trails, paint
let carUp = img`
    . . . . f f f f f f . . . .
    . . . f 5 2 2 2 2 5 f . . .
    . . f 2 2 2 2 2 2 2 2 f . .
    . f f 2 2 9 9 9 9 2 2 f f .
    f f f 2 9 9 9 9 9 9 2 f f f
    f f f 2 9 9 9 9 9 9 2 f f f
    . . f 2 2 2 2 2 2 2 2 f . .
    . . f 2 2 2 1 1 2 2 2 f . .
    . . f 2 2 2 1 1 2 2 2 f . .
    . . f 2 2 9 9 9 9 2 2 f . .
    f f f 2 2 9 9 9 9 2 2 f f f
    f f f 2 2 2 2 2 2 2 2 f f f
    . f f 2 2 2 2 2 2 2 2 f f .
    . . f 4 2 2 2 2 2 2 4 f . .
    . . . f f f f f f f f . . .
`
let carColor = 2
let haveSpoiler = false
let haveNeon = false
let haveStripes = false
let haveTurbo = false
let turboLevel = 0
let trailLevel = 0
let trailColor = 9
let speed = 0
let angle = 0
let lap = 0
let checkpoint = 0
let coins = 1000000
let raceStart = game.runtime()
let list: number[] = []
let shieldUntil = 0
let boostUntil = 0
let missileAmmo = 3
let lastTrailAt = 0

let lwtgamemovpc = sprites.create(carUp.clone(), SpriteKind.Player)
lwtgamemovpc.setPosition(70, 96)
lwtgamemovpc.setStayInScreen(true)
lwtgamemovpc.z = 10

function dogamefuctionmovps(blmoui8009: boolean, treelet: number, n678: number, googl90mns: number) {
    playLapSound()
    music.setTempo(120)
    list = [0, 1]
    if (blmoui8009) {
        coins += treelet + n678 + googl90mns
    }
}

function movetorightotleftl(gotoright: boolean, myLocation: number, numbool: boolean, lineadd: number, oopnelow9: number) {
    let turn = lineadd
    if (Math.abs(speed) < 5) {
        turn = oopnelow9
    }
    if (numbool) {
        turn = turn * 2
    }
    if (gotoright) {
        angle = myLocation + turn
    } else {
        angle = myLocation - turn
    }
    if (angle >= 360) {
        angle -= 360
    }
    if (angle < 0) {
        angle += 360
    }
}

function redrawCar() {
    let d = Math.round(angle / 90) % 4
    let src = carUp.clone()
    src.replace(2, carColor)
    if (haveStripes) {
        src.fillRect(6, 1, 2, 13, 1)
    }
    if (haveSpoiler) {
        src.fillRect(2, 13, 10, 1, 15)
    }
    if (haveNeon) {
        src.drawRect(2, 0, 10, 15, 5)
    }
    if (trailLevel > 0) {
        src.fillRect(5, 14, 4, 1, trailColor)
    }
    let out = image.create(15, 15)
    let x = 0
    while (x < 14) {
        let y = 0
        while (y < 15) {
            let c = src.getPixel(x, y)
            if (d == 3) {
                out.setPixel(x, y, c)
            } else if (d == 0) {
                out.setPixel(14 - y, x, c)
            } else if (d == 1) {
                out.setPixel(x, 14 - y, c)
            } else {
                out.setPixel(y, 14 - x, c)
            }
            y += 1
        }
        x += 1
    }
    lwtgamemovpc.setImage(out)
}

function spawnTrail() {
    if (trailLevel <= 0) {
        return
    }
    if (Math.abs(speed) < 8) {
        return
    }
    if (game.runtime() - lastTrailAt < 40) {
        return
    }
    lastTrailAt = game.runtime()
    let t = sprites.create(img`
        . 9 9 .
        9 9 9 9
        9 9 9 9
        . 9 9 .
    `, SpriteKind.Trail)
    t.image.replace(9, trailColor)
    t.setPosition(lwtgamemovpc.x, lwtgamemovpc.y)
    t.z = 1
    t.setFlag(SpriteFlag.Ghost, true)
    t.lifespan = 200 + trailLevel * 120
    t.setVelocity(0 - lwtgamemovpc.vx / 4, 0 - lwtgamemovpc.vy / 4)
}

function maxDriveSpeed(): number {
    let maxSpeed = 70
    if (haveTurbo) {
        maxSpeed = 100 + turboLevel * 12
    }
    if (game.runtime() < boostUntil) {
        maxSpeed = maxSpeed + 40
    }
    return maxSpeed
}

function resetPlayerForTrack() {
    lwtgamemovpc.setPosition(70, 96)
    speed = 0
    angle = 0
    lap = 0
    checkpoint = 0
    raceStart = game.runtime()
    redrawCar()
}
