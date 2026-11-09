// hud.ts - lights, neo panel, HUD paint, wireless labels
let lightColor = 0
let lightUntil = 0
let wifiName = "TrackNet-Demo"
let speakerName = "Arcade Speaker"
let neoColors = [2, 4, 5, 7, 6, 9, 8, 10, 3, 1]
let neoShift = 0

function flashLights(color: number) {
    lightColor = color
    lightUntil = game.runtime() + 300
}

let electronicsPanel = sprites.create(assets.image`bottomPanel`, SpriteKind.Player)
electronicsPanel.setPosition(80, 112)
electronicsPanel.z = 1000
electronicsPanel.setFlag(SpriteFlag.Ghost, true)
electronicsPanel.setFlag(SpriteFlag.RelativeToCamera, true)

function neopixelShow() {
    let panel = assets.image`bottomPanel`.clone()
    panel.drawTransparentImage(assets.image`wires`, 0, 0)
    panel.drawTransparentImage(assets.image`arcadeController`, 1, 0)
    panel.drawTransparentImage(assets.image`battery`, 32, 1)
    panel.drawTransparentImage(assets.image`resistor`, 29, 10)
    panel.drawTransparentImage(assets.image`chip`, 45, 2)
    panel.drawTransparentImage(assets.image`charger`, 135, 0)
    panel.drawTransparentImage(assets.image`neopixelStrip`, 61, 3)
    let i = 0
    while (i < 10) {
        let c = neoColors[(i + neoShift) % 10]
        if (game.runtime() < lightUntil) {
            c = lightColor
        }
        panel.fillRect(62 + i * 6, 5, 3, 5, c)
        i += 1
    }
    let t = Math.floor(game.runtime() / 60) % 32
    panel.setPixel(28 + t, 8, 5)
    panel.setPixel(36 + Math.floor(t * 24 / 32), 14, 1)
    electronicsPanel.setImage(panel)
}

let topAssetStrip = sprites.create(image.create(100, 16), SpriteKind.Player)
topAssetStrip.image.drawTransparentImage(assets.image`lightcarr`, 0, 0)
for (let blockIndex = 0; blockIndex < 4; blockIndex++) {
    topAssetStrip.image.drawTransparentImage(assets.image`megablocks`, 22 + blockIndex * 18, 0)
}
topAssetStrip.setPosition(52, 20)
topAssetStrip.z = 1000
topAssetStrip.setFlag(SpriteFlag.Ghost, true)
topAssetStrip.setFlag(SpriteFlag.RelativeToCamera, true)

let youLabel = textsprite.create("YOU", 0, 5)
youLabel.setOutline(1, 15)
youLabel.z = 20
let p2Label = textsprite.create("P2 wireless: --", 0, 9)
p2Label.setPosition(40, 34)
p2Label.z = 20
let closeLabel = textsprite.create("", 0, 2)
closeLabel.z = 20
let statusLabel = textsprite.create("", 0, 1)
statusLabel.setPosition(2, 110)
statusLabel.z = 20
statusLabel.setFlag(SpriteFlag.RelativeToCamera, true)

function paintHud() {
    screen.print("Lap " + lap + "/3", 2, 2, 1)
    screen.print("T " + spriteutils.roundWithPrecision((game.runtime() - raceStart) / 1000, 1), 52, 2, 1)
    screen.print("$" + coins, 100, 2, 5)
    screen.print(trackName(), 2, 10, 9)
    screen.print("M" + missileAmmo, 140, 10, 2)
    if (trailLevel > 0) {
        screen.print("tr" + trailLevel, 120, 10, trailColor)
    }
    if (game.runtime() < lightUntil) {
        screen.drawRect(0, 0, 160, 120, lightColor)
        screen.drawRect(1, 1, 158, 118, lightColor)
    }
    if (game.runtime() < shieldUntil) {
        screen.drawRect(lwtgamemovpc.x - 8, lwtgamemovpc.y - 8, 16, 16, 8)
    }
    if (game.runtime() < boostUntil) {
        screen.print("BOOST", 60, 110, 5)
    }
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
    screen.drawImage(mini, 110, 12)
    screen.fillRect(110 + Math.floor(lwtgamemovpc.x * 48 / 160), 12 + Math.floor(lwtgamemovpc.y * 36 / 120), 2, 2, 5)
    screen.fillRect(110 + Math.floor(rival1.x * 48 / 160), 12 + Math.floor(rival1.y * 36 / 120), 2, 2, 8)
    screen.fillRect(110 + Math.floor(rival2.x * 48 / 160), 12 + Math.floor(rival2.y * 36 / 120), 2, 2, 6)
    screen.fillRect(110 + Math.floor(rival3.x * 48 / 160), 12 + Math.floor(rival3.y * 36 / 120), 2, 2, 10)
}

function setupHudLoops() {
    game.onUpdateInterval(150, function () {
        neoShift = (neoShift + 1) % 10
    })
    game.onPaint(function () {
        paintHud()
    })
    radio.setGroup(7)
    radio.onReceivedNumber(function (receivedNumber) {
        p2Label.setText("P2 wireless: " + receivedNumber)
        flashLights(9)
    })
    game.onUpdate(function () {
        youLabel.setPosition(lwtgamemovpc.x, lwtgamemovpc.top - 5)
        let d1 = spriteutils.distanceBetween(lwtgamemovpc, rival1)
        let d2 = spriteutils.distanceBetween(lwtgamemovpc, rival2)
        let d3 = spriteutils.distanceBetween(lwtgamemovpc, rival3)
        if (d1 < 20 || d2 < 20 || d3 < 20) {
            closeLabel.setText("CLOSE!")
        } else {
            closeLabel.setText("")
        }
        closeLabel.setPosition(lwtgamemovpc.x, lwtgamemovpc.bottom + 5)
    })
    game.onUpdateInterval(2000, function () {
        radio.sendNumber(info.score())
    })
}
