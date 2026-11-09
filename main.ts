// lwcaracerematcmnn - by Ezhan
// A = gas, B = brake/reverse, Left/Right = steer
// Up = missile, Down = horn, Menu = SHOP
// Split across tracks/sounds/car/rivals/shop/powerups/hud

info.setScore(0)
info.setLife(3)
setupPickups()
setupHudLoops()
redrawCar()

controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    openShop()
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!shopOpen) {
        fireMissile()
    }
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!shopOpen) {
        playHorn()
        flashLights(9)
    }
})

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

game.onUpdate(function () {
    if (shopOpen) {
        speed = 0
        lwtgamemovpc.setVelocity(0, 0)
        return
    }
    let maxSpeed = maxDriveSpeed()
    if (controller.A.isPressed()) {
        speed += 2
    } else if (controller.B.isPressed()) {
        speed -= 3
    } else {
        speed = speed * 0.96
    }
    if (speed > maxSpeed) { speed = maxSpeed }
    if (speed < -30) { speed = -30 }
    let under = track.getPixel(lwtgamemovpc.x, lwtgamemovpc.y)
    if (under == 7 || under == 13) {
        speed = speed * 0.9
    }
    let rad = angle * Math.PI / 180
    lwtgamemovpc.vx = Math.cos(rad) * speed
    lwtgamemovpc.vy = Math.sin(rad) * speed
    if (lwtgamemovpc.x < 12 || lwtgamemovpc.x > 148 || lwtgamemovpc.y < 12 || lwtgamemovpc.y > 98) {
        speed = 0 - speed / 2
    }
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
            game.splash("You won! Time " + Math.round((game.runtime() - raceStart) / 1000) + "s", "Next track unlocked")
            bumpRivalDifficulty()
            nextTrack()
            resetPlayerForTrack()
            resetRivals()
            missileAmmo += 2
        }
    }
    updateRivals()
    spawnTrail()
})

game.onUpdateInterval(150, function () {
    playEngine(Math.abs(speed))
})

forever(function () {
    for (let index = 0; index < 1e+166; index++) {
        controller.moveSprite(lwtgamemovpc, 0, 0)
        startRaceSong()
        pause(100)
    }
})

game.splash("Speaker: " + speakerName, "WiFi: " + wifiName)
game.splash("lwcaracerematcmnn", "A gas B brake Up fire Down horn Menu shop")
