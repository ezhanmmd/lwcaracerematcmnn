// tracks.ts - track layouts, mini-map, track switching
namespace SpriteKind {
    export const PowerUp = SpriteKind.create()
    export const Missile = SpriteKind.create()
    export const Trail = SpriteKind.create()
}

let track = image.create(160, 120)
let mini = image.create(48, 36)
let trackId = 0
let ledX = [56, 72, 104, 64, 100]
let ledY = [46, 70, 48, 66, 58]
let ledColors = [2, 5, 7, 9, 10]
let wayX = [130, 130, 28, 28]
let wayY = [92, 24, 24, 92]

function drawFinishLine(img: Image, x: number, y0: number, y1: number) {
    let cy = y0
    while (cy < y1) {
        img.fillRect(x, cy, 2, 2, 1)
        img.fillRect(x + 2, cy + 2, 2, 2, 15)
        cy += 4
    }
}

function drawElectronics(img: Image) {
    img.drawLine(46, 44, 114, 44, 4)
    img.drawLine(46, 76, 114, 76, 4)
    img.drawLine(46, 44, 46, 76, 2)
    img.drawLine(114, 44, 114, 76, 2)
    img.drawLine(80, 44, 80, 76, 9)
    img.fillRect(48, 55, 12, 8, 15)
    img.fillRect(60, 57, 2, 4, 1)
    img.fillRect(49, 56, 4, 6, 2)
    img.fillRect(64, 42, 8, 4, 13)
    img.fillRect(66, 42, 1, 4, 2)
    img.fillRect(69, 42, 1, 4, 5)
    img.fillRect(90, 74, 8, 4, 13)
    img.fillRect(92, 74, 1, 4, 8)
    img.fillRect(95, 74, 1, 4, 4)
    img.fillRect(86, 52, 14, 10, 15)
    let pin = 0
    while (pin < 6) {
        img.setPixel(87 + pin * 2, 51, 1)
        img.setPixel(87 + pin * 2, 62, 1)
        pin += 1
    }
    img.fillRect(104, 66, 8, 6, 15)
}

function buildOvalTrack() {
    track.fill(7)
    track.fillRect(4, 4, 152, 112, 12)
    track.fillRect(10, 10, 140, 100, 11)
    track.fillRect(40, 38, 80, 44, 7)
    track.drawRect(39, 37, 82, 46, 1)
    track.drawRect(10, 10, 140, 100, 1)
    drawFinishLine(track, 78, 82, 110)
    drawElectronics(track)
    wayX = [130, 130, 28, 28]
    wayY = [92, 24, 24, 92]
    ledX = [56, 72, 104, 64, 100]
    ledY = [46, 70, 48, 66, 58]
}

function buildFigure8Track() {
    track.fill(7)
    track.fillRect(4, 4, 152, 112, 12)
    // left loop
    track.fillRect(10, 20, 70, 80, 11)
    track.fillRect(24, 34, 42, 52, 7)
    // right loop
    track.fillRect(80, 20, 70, 80, 11)
    track.fillRect(94, 34, 42, 52, 7)
    // cross bridge
    track.fillRect(70, 52, 20, 16, 11)
    track.drawRect(10, 20, 70, 80, 1)
    track.drawRect(80, 20, 70, 80, 1)
    drawFinishLine(track, 78, 52, 68)
    // neon strips
    track.drawLine(20, 24, 70, 24, 9)
    track.drawLine(90, 96, 140, 96, 5)
    wayX = [120, 120, 40, 40]
    wayY = [88, 32, 32, 88]
    ledX = [30, 50, 110, 130, 80]
    ledY = [28, 90, 28, 90, 58]
}

function buildCityTrack() {
    track.fill(13)
    track.fillRect(0, 0, 160, 120, 13)
    // asphalt roads
    track.fillRect(8, 50, 144, 28, 11)
    track.fillRect(66, 8, 28, 104, 11)
    // sidewalks
    track.drawRect(8, 50, 144, 28, 1)
    track.drawRect(66, 8, 28, 104, 1)
    // buildings
    track.fillRect(12, 12, 40, 28, 14)
    track.fillRect(108, 12, 40, 28, 15)
    track.fillRect(12, 88, 40, 24, 8)
    track.fillRect(108, 88, 40, 24, 4)
    // windows
    track.fillRect(16, 16, 4, 4, 5)
    track.fillRect(24, 16, 4, 4, 5)
    track.fillRect(112, 16, 4, 4, 9)
    track.fillRect(120, 16, 4, 4, 9)
    drawFinishLine(track, 78, 50, 78)
    wayX = [130, 80, 30, 80]
    wayY = [64, 20, 64, 100]
    ledX = [18, 26, 114, 122, 80]
    ledY = [20, 24, 20, 24, 60]
}

function rebuildMiniMap() {
    mini = image.create(48, 36)
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
}

function loadTrack(id: number) {
    trackId = id % 3
    if (trackId == 0) {
        buildOvalTrack()
    } else if (trackId == 1) {
        buildFigure8Track()
    } else {
        buildCityTrack()
    }
    rebuildMiniMap()
    scene.setBackgroundImage(track)
}

function nextTrack() {
    loadTrack(trackId + 1)
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
}

function trackName(): string {
    if (trackId == 0) {
        return "Oval"
    } else if (trackId == 1) {
        return "Figure-8"
    }
    return "City"
}

loadTrack(0)
