// Robot car receiver for lwcaracerematcmnn
// Flash this onto the micro:bit plugged into the Kitronik Servo:Lite board.
// It listens on radio group 7 (the same group as the Arcade game).
//
// Words from the game:
//   forward, back, left, right, stop
//   forward-left, forward-right, back-left, back-right
//
// If no new word arrives for about 1 second, the car stops.

radio.setGroup(7)

let lastHeard = input.runningTime()
let driving = ""

function isDriveWord(word: string): boolean {
    if (word == "forward") { return true }
    if (word == "back") { return true }
    if (word == "left") { return true }
    if (word == "right") { return true }
    if (word == "stop") { return true }
    if (word == "forward-left") { return true }
    if (word == "forward-right") { return true }
    if (word == "back-left") { return true }
    if (word == "back-right") { return true }
    return false
}

function showDrive(word: string) {
    if (word == "forward") {
        basic.showArrow(ArrowNames.North)
    } else if (word == "back") {
        basic.showArrow(ArrowNames.South)
    } else if (word == "left") {
        basic.showArrow(ArrowNames.West)
    } else if (word == "right") {
        basic.showArrow(ArrowNames.East)
    } else if (word == "forward-left") {
        basic.showArrow(ArrowNames.NorthWest)
    } else if (word == "forward-right") {
        basic.showArrow(ArrowNames.NorthEast)
    } else if (word == "back-left") {
        basic.showArrow(ArrowNames.SouthWest)
    } else if (word == "back-right") {
        basic.showArrow(ArrowNames.SouthEast)
    } else {
        // Stop is not a direction, so show a small square.
        basic.showIcon(IconNames.SmallSquare)
    }
}

function applyDrive(word: string) {
    if (word == driving) {
        return
    }
    driving = word
    if (word == "forward") {
        kitronik_servo_lite.biasDriving(50)
        kitronik_servo_lite.forward()
    } else if (word == "back") {
        kitronik_servo_lite.biasDriving(50)
        kitronik_servo_lite.backward()
    } else if (word == "left") {
        kitronik_servo_lite.left()
    } else if (word == "right") {
        kitronik_servo_lite.right()
    } else if (word == "forward-left") {
        // Bias then drive so the car curves instead of only spinning.
        kitronik_servo_lite.biasDriving(0)
        kitronik_servo_lite.forward()
    } else if (word == "forward-right") {
        kitronik_servo_lite.biasDriving(100)
        kitronik_servo_lite.forward()
    } else if (word == "back-left") {
        kitronik_servo_lite.biasDriving(0)
        kitronik_servo_lite.backward()
    } else if (word == "back-right") {
        kitronik_servo_lite.biasDriving(100)
        kitronik_servo_lite.backward()
    } else {
        kitronik_servo_lite.stop()
    }
    showDrive(word)
}

radio.onReceivedString(function (receivedString) {
    if (!isDriveWord(receivedString)) {
        return
    }
    lastHeard = input.runningTime()
    applyDrive(receivedString)
})

// Park the car until the first message arrives.
applyDrive("stop")

// Safety: no message for about 1 second means stop, even if the last word was "forward".
basic.forever(function () {
    if (driving != "stop" && input.runningTime() - lastHeard > 1000) {
        applyDrive("stop")
    }
    basic.pause(100)
})
