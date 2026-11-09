// shop.ts - in-game shop with stackable unlockables + infinite coins feel
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
    if (pick == 8) { cost = 250 }
    if (pick == 9) { cost = 350 }
    if (pick == 10) { cost = 400 }
    if (pick == 11) { cost = 150 }
    if (pick == 12) { cost = 0 }
    if (pick == 12) {
        nextTrack()
        resetPlayerForTrack()
        resetRivals()
        game.splash("Track: " + trackName())
        return
    }
    if (cost == 0) {
        return
    }
    // infinite-coins mode: never block a purchase; still subtract for show
    if (coins < cost) {
        coins += 100000
    }
    coins -= cost
    if (pick == 1) { carColor = 8 }
    if (pick == 2) { carColor = 7 }
    if (pick == 3) { carColor = 5 }
    if (pick == 4) { haveStripes = true }
    if (pick == 5) { haveSpoiler = true }
    if (pick == 6) { haveNeon = true }
    if (pick == 7) {
        haveTurbo = true
        turboLevel = Math.min(5, turboLevel + 1)
    }
    if (pick == 8) {
        trailLevel = Math.min(5, trailLevel + 1)
        if (trailLevel == 1) { trailColor = 9 }
        if (trailLevel == 2) { trailColor = 5 }
        if (trailLevel == 3) { trailColor = 2 }
        if (trailLevel >= 4) { trailColor = 10 }
    }
    if (pick == 9) {
        hornLevel = Math.min(3, hornLevel + 1)
    }
    if (pick == 10) {
        missileAmmo += 5
    }
    if (pick == 11) {
        // random paint stack
        let paints = [2, 3, 4, 5, 6, 7, 8, 9, 10]
        carColor = paints[randint(0, 8)]
    }
    redrawCar()
    flashLights(7)
    playBuySound()
    game.splash("Bought! $" + coins, "trail" + trailLevel + " horn" + hornLevel + " turbo" + turboLevel)
}

function openShop() {
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
        miniMenu.createMenuItem("Turbo stack 500"),
        miniMenu.createMenuItem("Trail stack 250"),
        miniMenu.createMenuItem("Horn stack 350"),
        miniMenu.createMenuItem("Missiles +5 400"),
        miniMenu.createMenuItem("Mystery paint 150"),
        miniMenu.createMenuItem("Next track FREE")
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
}
