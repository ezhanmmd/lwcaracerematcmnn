# Car Race Arena (MakeCode Arcade)

Ezhan's top-down race. It also drives a real Kitronik Servo:Lite robot car over radio.

Controls: **A** = gas, **B** = brake/reverse, **Left/Right** = steer, **Menu** = shop.

The laps, shop, rival cars, and mini map work the same as before. While you drive, the game tells the car what you are doing. Letting go of the buttons sends stop. Opening the shop sends stop too.

Both programs use radio group **7**. The game still sends your score as a number for the P2 label. Drive words are separate, so they do not mix.

## 1. Flash the car

1. Open https://makecode.microbit.org
2. Click **Import**, then **Import URL**
3. Paste:

   `https://github.com/ezhanmmd/lwcaracerematcmnn/robot-car#robot-remote`

4. Download the program and drag it onto the micro:bit plugged into the car.
5. A small square on the LEDs means the car is stopped and waiting.

## 2. Play the game

1. Open https://arcade.makecode.com
2. Click **Import**, then **Import URL**
3. Paste:

   `https://github.com/ezhanmmd/lwcaracerematcmnn#robot-remote`

4. Download the game onto a micro:bit-powered Arcade device, or play it from a second board that can send radio.
5. The car's micro:bit and the game board have to be two different boards. The browser simulator does not send real radio, so the car will not move from the simulator alone.

The `#robot-remote` ending opens this version. MakeCode cannot open a branch whose name has a slash. After this is on the main branch, you can leave that ending off.

## 3. Drive

Turn the car on, then the game. Drive like you race:

- Hold **A** and the car goes forward. The arrow points up.
- Hold **B** and the car goes backward. The arrow points down.
- Hold **Left** or **Right** and the car turns. The arrow points that way.
- Hold gas and a turn together and the car curves. The arrow points into that corner.
- Let go of every button and the car stops (small square).
- If a message does not arrive for about 1 second, the car stops. That keeps it from driving off when the radio drops.
