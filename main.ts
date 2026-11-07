// lwcaracerematcmnn - by Ezhan
// A = gas, B = brake/reverse, Left/Right = steer, Menu = SHOP

// ---------- TRACK ----------
let track = image.create(160, 120)
track.fill(7)
track.fillRect(4, 4, 152, 112, 12)
track.fillRect(10, 10, 140, 100, 11)
track.fillRect(40, 38, 80, 44, 7)
track.drawRect(39, 37, 82, 46, 1)
track.drawRect(10, 10, 140, 100, 1)
// start / finish line (checkered)
let cy = 82
while (cy < 110) {
    track.fillRect(78, cy, 2, 2, 1)
    track.fillRect(80, cy + 2, 2, 2, 15)
    cy += 4
}

// ---------- WIRES AND ELECTRONICS (drawn on the track) ----------
// wires in the infield
track.drawLine(46, 44, 114, 44, 4)
track.drawLine(46, 76, 114, 76, 4)
track.drawLine(46, 44, 46, 76, 2)
track.drawLine(114, 44, 114, 76, 2)
track.drawLine(80, 44, 80, 76, 9)
// battery
track.fillRect(48, 55, 12, 8, 15)
track.fillRect(60, 57, 2, 4, 1)
track.fillRect(49, 56, 4, 6, 2)
// resistors
track.fillRect(64, 42, 8, 4, 13)
track.fillRect(66, 42, 1, 4, 2)
track.fillRect(69, 42, 1, 4, 5)
track.fillRect(90, 74, 8, 4, 13)
track.fillRect(92, 74, 1, 4, 8)
track.fillRect(95, 74, 1, 4, 4)
// chips
track.fillRect(86, 52, 14, 10, 15)
let pin = 0
while (pin < 6) {
    track.setPixel(87 + pin * 2, 51, 1)
    track.setPixel(87 + pin * 2, 62, 1)
    pin += 1
}
track.fillRect(104, 66, 8, 6, 15)
// LED spots (they blink in onPaint)
let ledX = [56, 72, 104, 64, 100]
let ledY = [46, 70, 48, 66, 58]
let ledColors = [2, 5, 7, 9, 10]
scene.setBackgroundImage(track)

// small copy of the track for the mini screen
let mini = image.create(48, 36)
let mx = 0
while (mx < 48) {
    let my = 0
    while (my < 36) {
        mini.setPixel(mx, my, track.getPixel(Math.floor(mx * 160 / 48), Math.floor(my * 120 / 36)))
        my += 1
    }
    mx += 1
}
mini.drawRect(0, 0, 48, 36, 1)


// ---------- CAR ART (facing up) ----------
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

let lwtgamemovpc = sprites.create(carUp.clone(), SpriteKind.Player)
lwtgamemovpc.setPosition(70, 96)
lwtgamemovpc.setStayInScreen(true)
lwtgamemovpc.z = 10

// ---------- RIVALS ----------
let wayX = [130, 130, 28, 28]
let wayY = [96, 24, 24, 96]
let rival1 = sprites.create(carUp.clone(), SpriteKind.Enemy)
rival1.image.replace(2, 8)
rival1.setPosition(60, 102)
let rival2 = sprites.create(carUp.clone(), SpriteKind.Enemy)
rival2.image.replace(2, 6)
rival2.setPosition(50, 90)
let r1Way = 0
let r2Way = 0

// ---------- DRIVING VARIABLES ----------
let speed = 0
let dir = 0 // 0 up, 1 right, 2 down, 3 left (but we steer with angle)
let angle = 0 // degrees, 0 = right, 90 = down... we start facing left track
angle = 0
let lap = 0
let checkpoint = 0
let coins = 1000000
let raceStart = game.runtime()
let songStarted = false
let list: number[] = []
info.setScore(0)
info.setLife(3)

// ---------- SHOP STUFF ----------
let haveSpoiler = false
let haveNeon = false
let haveStripes = false
let haveTurbo = false

// ---------- LIGHTS (screen border flash, no extension needed) ----------
let lightColor = 0
let lightUntil = 0
function flashLights(color: number) {
    lightColor = color
    lightUntil = game.runtime() + 300
}

// ---------- WIFI + BLUETOOTH LABELS ----------
let wifiName = "Zee Home 2.4GHz"
let speakerName = "Bose"

// ---------- EZHAN'S FUNCTIONS ----------
function dogamefuctionmovps(blmoui8009: boolean, treelet: number, n678: number, googl90mns: number) {
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
    music.setTempo(120)
    list = [0, 1]
    if (blmoui8009) {
        coins += treelet + n678 + googl90mns
    }
}

function movetorightotleftl(gotoright: boolean, myLocation: number, numbool: boolean, lineadd: number, oopnelow9: number) {
    // steering: turn faster when moving, slower when stopped
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

// draw the car turned to the nearest direction
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
    // the art faces UP, angle 270 = up
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

// ---------- COINS ----------
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
spawnCoin()
spawnCoin()
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    coins += 50
    info.changeScoreBy(50)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    flashLights(5)
    spawnCoin()
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    speed = 0 - speed / 2
    scene.cameraShake(3, 200)
    flashLights(2)
    otherSprite.x += randint(-4, 4)
})

// ---------- SHOP ----------
// ---------- SHOP (Mini Menu extension) ----------
let shopOpen = false
function buyItem(pick: number) {
    let cost = 0
    if (pick == 1) { cost = 100 }
    if (pick == 2) { cost = 100 }
    if (pick == 3) { cost = 300 }
    if (pick == 4) { cost = 200 }
    if (pick == 5) { cost = 200 }
    if (pick == 6) { cost = 300 }
    if (pick == 7) { cost = 500 }
    if (cost == 0) {
        return
    }
    if (coins < cost) {
        game.splash("Not enough coins")
        return
    }
    coins -= cost
    if (pick == 1) { carColor = 8 }
    if (pick == 2) { carColor = 7 }
    if (pick == 3) { carColor = 5 }
    if (pick == 4) { haveStripes = true }
    if (pick == 5) { haveSpoiler = true }
    if (pick == 6) { haveNeon = true }
    if (pick == 7) { haveTurbo = true }
    redrawCar()
    flashLights(7)
    game.splash("Bought! coins:" + coins)
}

controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (shopOpen) {
        return
    }
    shopOpen = true
    let shopMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("Blue paint 100"),
        miniMenu.createMenuItem("Green paint 100"),
        miniMenu.createMenuItem("Gold paint 300"),
        miniMenu.createMenuItem("Stripes 200"),
        miniMenu.createMenuItem("Spoiler 200"),
        miniMenu.createMenuItem("Neon 300"),
        miniMenu.createMenuItem("Turbo 500")
    )
    miniMenu.setTitle(shopMenu, "SHOP $" + coins)
    miniMenu.setFrame(shopMenu, img`
        . . . . . . . . . . . .
        . 5 5 5 5 5 5 5 5 5 5 .
        . 5 f f f f f f f f 5 .
        . 5 f f f f f f f f 5 .
        . 5 f f f f f f f f 5 .
        . 5 f f f f f f f f 5 .
        . 5 f f f f f f f f 5 .
        . 5 f f f f f f f f 5 .
        . 5 f f f f f f f f 5 .
        . 5 f f f f f f f f 5 .
        . 5 5 5 5 5 5 5 5 5 5 .
        . . . . . . . . . . . .
    `)
    shopMenu.setPosition(80, 60)
    shopMenu.z = 100
    miniMenu.onButtonPressed(shopMenu, miniMenu.Button.A, function (selection, selectedIndex) {
        miniMenu.close(shopMenu)
        buyItem(selectedIndex + 1)
        shopOpen = false
    })
    miniMenu.onButtonPressed(shopMenu, miniMenu.Button.B, function (selection, selectedIndex) {
        miniMenu.close(shopMenu)
        shopOpen = false
    })
})


// ---------- DRIVING ----------
game.onUpdate(function () {
    if (shopOpen) {
        speed = 0
        lwtgamemovpc.setVelocity(0, 0)
        return
    }
    let maxSpeed = 70
    if (haveTurbo) {
        maxSpeed = 100
    }
    if (controller.A.isPressed()) {
        speed += 2
    } else if (controller.B.isPressed()) {
        speed -= 3
    } else {
        // friction
        speed = speed * 0.96
    }
    if (speed > maxSpeed) { speed = maxSpeed }
    if (speed < -30) { speed = -30 }
    // grass is slow
    let under = track.getPixel(lwtgamemovpc.x, lwtgamemovpc.y)
    if (under == 7) {
        speed = speed * 0.9
    }
    let rad = angle * Math.PI / 180
    lwtgamemovpc.vx = Math.cos(rad) * speed
    lwtgamemovpc.vy = Math.sin(rad) * speed
    // walls bounce
    if (lwtgamemovpc.x < 12 || lwtgamemovpc.x > 148 || lwtgamemovpc.y < 12 || lwtgamemovpc.y > 108) {
        speed = 0 - speed / 2
    }
    // laps: go around through 4 corners
    let px = lwtgamemovpc.x
    let py = lwtgamemovpc.y
    if (checkpoint == 0 && px > 120) { checkpoint = 1 }
    if (checkpoint == 1 && py < 34) { checkpoint = 2 }
    if (checkpoint == 2 && px < 38) { checkpoint = 3 }
    if (checkpoint == 3 && py > 84 && px > 78) {
        checkpoint = 0
        lap += 1
        info.changeScoreBy(100)
        flashLights(8)
        dogamefuctionmovps(true, 10, 20, 30)
        if (lap >= 3) {
            game.splash("You won! Time " + Math.round((game.runtime() - raceStart) / 1000) + "s")
            lap = 0
            raceStart = game.runtime()
        }
    }
    // rivals drive to corners
    r1Way = driveRival(rival1, r1Way, 45)
    r2Way = driveRival(rival2, r2Way, 38)
})

function driveRival(car: Sprite, way: number, rspeed: number): number {
    let dx = wayX[way] - car.x
    let dy = wayY[way] - car.y
    let dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 6) {
        way = (way + 1) % 4
    } else {
        car.vx = dx / dist * rspeed
        car.vy = dy / dist * rspeed
    }
    return way
}

controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    movetorightotleftl(false, angle, false, 15, 8)
    redrawCar()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    movetorightotleftl(false, angle, false, 15, 8)
    redrawCar()
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    movetorightotleftl(true, angle, false, 15, 8)
    redrawCar()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    movetorightotleftl(true, angle, false, 15, 8)
    redrawCar()
})

// ---------- ENGINE SOUND (changes with speed) ----------
game.onUpdateInterval(150, function () {
    if (Math.abs(speed) > 3) {
        music.playTone(60 + Math.abs(speed) * 3, 100)
    }
})


// ---------- NEOPIXEL STRIP (10 LEDs drawn on screen) ----------
let neoColors = [2, 4, 5, 7, 6, 9, 8, 10, 3, 1]
let neoShift = 0
function neopixelShow() {
    let i = 0
    while (i < 10) {
        let c = neoColors[(i + neoShift) % 10]
        if (game.runtime() < lightUntil) {
            c = lightColor
        }
        screen.fillRect(30 + i * 10, 112, 8, 6, 15)
        screen.fillRect(31 + i * 10, 113, 6, 4, c)
        i += 1
    }
}
game.onUpdateInterval(150, function () {
    neoShift = (neoShift + 1) % 10
})

// ---------- HUD ----------
game.onPaint(function () {
    screen.print("Lap " + lap + "/3", 2, 2, 1)
    screen.print("T " + spriteutils.roundWithPrecision((game.runtime() - raceStart) / 1000, 1), 60, 2, 1)
    screen.print("$" + coins, 100, 2, 5)
    if (game.runtime() < lightUntil) {
        screen.drawRect(0, 0, 160, 120, lightColor)
        screen.drawRect(1, 1, 158, 118, lightColor)
    }
    // blinking LEDs on the circuit
    let k = 0
    while (k < 5) {
        if (Math.floor(game.runtime() / 300 + k) % 2 == 0) {
            screen.fillCircle(ledX[k], ledY[k], 2, ledColors[k])
        } else {
            screen.fillCircle(ledX[k], ledY[k], 2, 15)
        }
        k += 1
    }
    neopixelShow()
    // duplicate mini screen in the corner
    screen.drawImage(mini, 110, 12)
    screen.fillRect(110 + Math.floor(lwtgamemovpc.x * 48 / 160), 12 + Math.floor(lwtgamemovpc.y * 36 / 120), 2, 2, 5)
    screen.fillRect(110 + Math.floor(rival1.x * 48 / 160), 12 + Math.floor(rival1.y * 36 / 120), 2, 2, 8)
    screen.fillRect(110 + Math.floor(rival2.x * 48 / 160), 12 + Math.floor(rival2.y * 36 / 120), 2, 2, 6)
})


// ---------- EXTENSION: Text Sprite (arcade-text) ----------
let youLabel = textsprite.create("YOU", 0, 5)
youLabel.setOutline(1, 15)
youLabel.z = 20
let p2Label = textsprite.create("P2 wireless: --", 0, 9)
p2Label.setPosition(40, 22)
p2Label.z = 20
let closeLabel = textsprite.create("", 0, 2)
closeLabel.z = 20

// ---------- EXTENSION: Radio (wireless, WiFi/Bluetooth style 2-player) ----------
radio.setGroup(7)
radio.onReceivedNumber(function (receivedNumber) {
    p2Label.setText("P2 wireless: " + receivedNumber)
    flashLights(9)
})

// ---------- EXTENSION: Sprite Utils (arcade-sprite-util) ----------
game.onUpdate(function () {
    youLabel.setPosition(lwtgamemovpc.x, lwtgamemovpc.top - 5)
    let d1 = spriteutils.distanceBetween(lwtgamemovpc, rival1)
    let d2 = spriteutils.distanceBetween(lwtgamemovpc, rival2)
    if (d1 < 20 || d2 < 20) {
        closeLabel.setText("CLOSE!")
    } else {
        closeLabel.setText("")
    }
    closeLabel.setPosition(lwtgamemovpc.x, lwtgamemovpc.bottom + 5)
})
game.onUpdateInterval(2000, function () {
    radio.sendNumber(info.score())
})

// ---------- EZHAN'S FOREVER BLOCK ----------
forever(function () {
    for (let index = 0; index < 1e+166; index++) {
        // move with buttons speed 0 so the real driving code steers the car
        controller.moveSprite(lwtgamemovpc, 0, 0)
        if (!songStarted) {
            songStarted = true
            music.play(music.stringPlayable("C5 G E G A G E C ", 120), music.PlaybackMode.LoopingInBackground)
        }
        pause(100)
    }
})

redrawCar()
game.splash("Speaker: " + speakerName, "WiFi: " + wifiName)
game.splash("lwcaracerematcmnn", "A gas B brake Menu shop")
