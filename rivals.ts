// rivals.ts - smarter rival AI with rubber-banding
let rival1 = sprites.create(carUp.clone(), SpriteKind.Enemy)
rival1.image.replace(2, 8)
rival1.setPosition(60, 102)
let rival2 = sprites.create(carUp.clone(), SpriteKind.Enemy)
rival2.image.replace(2, 6)
rival2.setPosition(50, 90)
let rival3 = sprites.create(carUp.clone(), SpriteKind.Enemy)
rival3.image.replace(2, 10)
rival3.setPosition(80, 100)
let r1Way = 0
let r2Way = 0
let r3Way = 0
let rivalAggression = 1

function driveRival(car: Sprite, way: number, baseSpeed: number): number {
    let targetWay = way
    let dx = wayX[targetWay] - car.x
    let dy = wayY[targetWay] - car.y
    let dist = Math.sqrt(dx * dx + dy * dy)
    // rubber-band: if player is far ahead, speed up; if close, try to block
    let toPlayer = spriteutils.distanceBetween(car, lwtgamemovpc)
    let rspeed = baseSpeed
    if (toPlayer > 70) {
        rspeed = baseSpeed + 18 * rivalAggression
    } else if (toPlayer < 22) {
        rspeed = baseSpeed + 6
        // nudge toward player lane a little to block
        dx = dx * 0.7 + (lwtgamemovpc.x - car.x) * 0.3
        dy = dy * 0.7 + (lwtgamemovpc.y - car.y) * 0.3
        dist = Math.sqrt(dx * dx + dy * dy)
    }
    // slight random weave
    if (randint(0, 20) == 0) {
        car.x += randint(-2, 2)
    }
    if (dist < 6) {
        targetWay = (targetWay + 1) % 4
    } else if (dist > 0) {
        car.vx = dx / dist * rspeed
        car.vy = dy / dist * rspeed
    }
    return targetWay
}

function updateRivals() {
    r1Way = driveRival(rival1, r1Way, 42 + rivalAggression * 3)
    r2Way = driveRival(rival2, r2Way, 36 + rivalAggression * 2)
    r3Way = driveRival(rival3, r3Way, 48 + rivalAggression)
}

function resetRivals() {
    rival1.setPosition(60, 102)
    rival2.setPosition(50, 90)
    rival3.setPosition(80, 100)
    r1Way = 0
    r2Way = 0
    r3Way = 0
    rival1.setVelocity(0, 0)
    rival2.setVelocity(0, 0)
    rival3.setVelocity(0, 0)
}

function bumpRivalDifficulty() {
    rivalAggression = Math.min(5, rivalAggression + 1)
}
