// import * as ModMath from './mod/math.js'
import * as Screen from './mod/screen.js'
import * as Loader from './mod/loader.js'
import * as Graphic from './mod/graphic.js'
// import * as Collision from './mod/collision.js'
import * as Input from './mod/input.js'
import { Player } from './object/player.js'
// import { Block } from 'object/block.js'
// import { Update } from './mod/update.js'

const brushSize = document.querySelector('.brushSize')
const brushColor = document.querySelector('.brushColor')
// const pixelCanvas = document.getElementById('pixels')

class Main {
  constructor () {
    this.ctx = canvas.getContext('2d')
    // this.pixelCtx = pixelCanvas.getContext('2d')
    this.index = 0

    this.window_size = { w: 480, h: 320 }
    this.game_state = 'MainMenu'
    this.start_btn = false
    this.players = []
    this.blocks = []
    this.lasers = []
    this.blockLimits = { min_x: 1, max_x: 7, min_y: 2, max_y: 10 }
    this.colors = ['Red', 'Orange', 'Yellow', 'Green', 'Teal', 'White']

    // this.objects = {}

    // this.objects = {}
    this.objects = {}

    // this.pos = { x: canvas.width * 0.5, y: canvas.height * 0.5 }

    // this.touch = {}
    this.input = {
      pos: { x: -5, y: -5 },
      size: { w: 8, h: 8 },
      isTouching: false,
      click: false,
      color: 'Black'
    }

    this.gamepads = {}
    this.gamepadId = 0

    this.controller = {
      gamepadUp: undefined,
      gamepadDown: undefined,
      gamepadLeft: undefined,
      gamepadRight: undefined
    }

    this.images = {
      // player_sprites: Loader.NewImage('img/player_sheet.png')
    }
  }

  ListInstance (_list, _ob) {
    _list.push(_ob)
  }

  ListDelete (_list) {
    for (let index = 0; index < _list.length; ++index) {
      if (_list[index] && _list[index].SetToRemove) {
        _list.splice(index, 1)
        --index
      }
    }
  }

  MapInstance (_map, _ob) {
    ++this.index
    _map.set(this.index, _ob)
  }

  MapDelete (_map) {
    for (const [key, value] of _map) {
      if (value.SetToRemove) {
        _map.delete(key)
      }
    }
  }

  ObjectInstance (_dict, _ob) {
    _dict[`${this.index}`] = { id: this.index, object: _ob }
    ++this.index
    // console.log(_dict)
  }

  ObjectDelete (_dict) {
    Object.keys(this.objects).forEach((key, value) => {
      if (this.objects[key].object.SetToRemove) {
        // console.log(this.objects[this.objects[key].id])
        delete this.objects[this.objects[key].id]
        // --this.index
        // this.index = this.objects[this.objects[key]]
      }
    })

    // Object.keys(this.objects).forEach((key, value) => {
    //   this.objects[key].id = this.objects[key].id - 1
    // })

    this.index = Object.keys(this.objects).length
  }

  init () {
    // this.blocks.push(new Block(this,
    //   { x: 0 + 4, y: 4 },
    //   { w: 128, h: canvas.height - 8 }, 'rgb(15,15,15)'))

    // this.blocks.push(new Block(this,
    //   { x: canvas.width - 128 - 4, y: 4 },
    //   { w: 128, h: canvas.height - 8 }, 'rgb(15,15,15)'))

    // for (let x = 0; x < 14; ++x) {
    //   for (let y = 0; y < 9; ++y) {
    //     this.blocks.push(new Block(this,
    //       { x: 0 + 35 * x, y: 0 + 35 * y },
    //       { w: 32, h: 32 }, 'Teal'))
    //   }
    // }

    // this.players.push(new Player(this,
    //   { x: canvas.width * 0.5 - 28, y: canvas.height - 64 },
    //   { w: 64, h: 64 }, 'red'))
  }

  draw () {
    // Object.keys(this.objects.currentId).forEach((key, value) => {
    //   this.objects.currentId.object.draw()
    // })

    Object.keys(this.objects).forEach((key, value) => {
      this.objects[key].object.draw()
      // console.log(this.objects[key].id)
      // this.objects.key.object.draw()
    })

    // this.objects.forEach(value => {
    //   value.draw()
    // })

    // this.lasers.forEach(ob => ob.draw())
    this.blocks.forEach(ob => ob.draw())
    this.players.forEach(ob => ob.draw())

    // if (this.touch[0] && this.touch[1]) {
    //   Line(this.ctx, { x: this.touch[0].pos.x, y: this.touch[0].pos.y }, { x: this.touch[1].pos.x, y: this.touch[1].pos.y }, { w: 0, h: 0 }, 3, 'Teal')
    // }
    // if (this.touch[1] && this.touch[2]) {
    //   Line(this.ctx, { x: this.touch[1].pos.x, y: this.touch[1].pos.y }, { x: this.touch[2].pos.x, y: this.touch[2].pos.y }, { w: 0, h: 0 }, 3, 'Teal')
    // }

    // Draw_Image_Simple( this.ctx, this.images.player_sprites, {x:64, y: 64}, {w: 64, h: 64}, 1 );
    // Draw_Image( this.ctx, this.images.player_sprites,
    //     {x: 0, y: 0}, {w: 36, h: 42},
    //     {x: 32, y: 64}, {w: 64, h: 64}, 1 );

    Graphic.Rect(this.ctx, this.input.pos, this.input.size, this.input.color, 1)
    // Graphic.DrawText(this.ctx, `Lasers:${this.index}`, 'left', null, { x: 8, y: 20 }, 16, 'White', 1)
  }

  update (dt) {
    // handle gamepad input
    const gamepad = navigator.getGamepads()

    if (gamepad) {
      for (const gamepadIndex in this.gamepads) {
        this.gamepadId = this.gamepads[gamepadIndex].id

        this.controller.gamepadUp = gamepad[this.gamepadId].buttons[12].pressed || gamepad[this.gamepadId].axes[1] === -1
        this.controller.gamepadDown = gamepad[this.gamepadId].buttons[13].pressed || gamepad[this.gamepadId].axes[1] === 1
        this.controller.gamepadLeft = gamepad[this.gamepadId].buttons[14].pressed || gamepad[this.gamepadId].axes[0] === -1
        this.controller.gamepadRight = gamepad[this.gamepadId].buttons[15].pressed || gamepad[this.gamepadId].axes[0] === 1
      }
    }

    // for (const value of this.objects.values()) {
    //   value.update(dt)
    // }

    //   function logMapElements(value, key, map) {
    //     console.log(`map.get('${key}') = ${value}`)
    // }

    // this.objects.forEach(logMapElements)

    // this.objects.forEach((value, key) => {
    //   this.objects.get(key) = value
    //   // key.value.update(dt)
    // })

    // this.objects.forEach(value => {
    //   value.update(dt)
    // })

    // Object.keys(this.objects.object).forEach(key => {
    // if (this.objects[key]) {
    // this.objects[key].update(dt)
    // }
    // })

    Object.keys(this.objects).forEach((key, value) => {
      this.objects[key].object.update(dt)
      // this.objects.currentId.object.update(dt)
    })

    // this.lasers.forEach(ob => ob.update(dt))
    this.blocks.forEach(ob => ob.update(dt))
    this.players.forEach(ob => ob.update(dt))
  }
}

addEventListener('load', (e) => {
  const main = new (Main)()
  Screen.Init(main, canvas)
  // Screen.Init(main, pixelCanvas)
  Input.Input(main, canvas)
  main.init()

  brushSize.addEventListener('change', function(e) {
    const size = e.target.value

    if (main.input.size.w !== size) main.input.size.w = size
    if (main.input.size.h !== size) main.input.size.h = size
  })

  brushSize.addEventListener('input', function(e) {
    const size = e.target.value

    if (main.input.size.w !== size) main.input.size.w = size
    if (main.input.size.h !== size) main.input.size.h = size
  })

  brushColor.addEventListener('change', function(e) {
    const color = e.target.value
    const combinedColor = hexToRGB(color)
    if (main.input.color !== combinedColor) main.input.color = combinedColor
  })

  brushColor.addEventListener('input', function(e) {
    const color = e.target.value
    const combinedColor = hexToRGB(color)
    if (main.input.color !== combinedColor) main.input.color = combinedColor
  })

  addEventListener('resize', (e) => {
    Screen.Resize(main, main.ctx, canvas)
    // Screen.Resize(main, main.pixelCtx, pixelCanvas)
  })

  const deltaTime = 1 / 60
  let accumulatedTime = 0
  let lastTime = 0

  function update (time) {
    accumulatedTime += (time - lastTime) / 1000

    while (accumulatedTime > deltaTime) {
      main.ctx.clearRect(0, 0, canvas.width, canvas.height)

      main.update(deltaTime)
      main.draw()

      accumulatedTime -= deltaTime
    }
    requestAnimationFrame(update)
    // setTimeout(update, 1000/60, performance.now());
    lastTime = time
  }
  update(0)
})

function hexToRGB(hex){
  const r = parseInt(hex.substr(1,2), 16)
  const g = parseInt(hex.substr(3,2), 16)
  const b = parseInt(hex.substr(5,2), 16)
  return `rgb(${r}, ${g}, ${b})`
}
