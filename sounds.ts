// sounds.ts - engine, horns, SFX helpers
let songStarted = false
let hornLevel = 0
let lastEngineTone = 0

function playBuySound() {
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
}

function playCoinSound() {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
}

function playCrashSound() {
    music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
}

function playLapSound() {
    music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
}

function playMissileSound() {
    music.play(music.melodyPlayable(music.sonar), music.PlaybackMode.InBackground)
}

function playHorn() {
    if (hornLevel <= 0) {
        music.playTone(220, 120)
        return
    }
    if (hornLevel == 1) {
        music.playTone(330, 140)
        music.playTone(280, 100)
    } else if (hornLevel == 2) {
        music.playTone(440, 80)
        music.playTone(520, 80)
        music.playTone(440, 120)
    } else {
        music.playTone(660, 60)
        music.playTone(880, 60)
        music.playTone(660, 60)
        music.playTone(990, 120)
    }
}

function playEngine(speedAbs: number) {
    if (speedAbs > 3) {
        let tone = 60 + Math.floor(speedAbs * 3)
        if (Math.abs(tone - lastEngineTone) > 2) {
            lastEngineTone = tone
            music.playTone(tone, 90)
        }
    }
}

function startRaceSong() {
    if (!songStarted) {
        songStarted = true
        music.play(music.stringPlayable("C5 G E G A G E C ", 120), music.PlaybackMode.LoopingInBackground)
    }
}
