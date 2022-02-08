import * as Screen from './mod/screen.js'
import {Loader_Init, Loader_Image} from './mod/loader.js'
import * as Graphic from './mod/graphic.js'
import * as Input from './mod/input.js'
import { Player } from './object/player.js'

const mouseCursor = document.getElementsByTagName("body")[0];

// H1 Text Items
const infoText = document.querySelector('.brushTool')
const brushSize = document.querySelector('.brushSize')
const brushColor = document.querySelector('.brushColor')

// Top Panel Buttons
const saveButton = document.querySelector('.saveButton')

// Left Panel Buttons
const toolPencil = document.querySelector('.pencil')
const toolEraser = document.querySelector('.eraser')
const toolPicker = document.querySelector('.picker')

// Right Panel Buttons
const clearCanvasButton = document.querySelector('.clearCanvasButton')

class Main {
  constructor () {
    this.ctx = canvas.getContext('2d')
    this.bgCtx = bg.getContext('2d')
    this.interactCtx = interact.getContext('2d')
    this.index = 0

    this.window_size = { w: 20, h: 20 }
    this.game_state = 'MainMenu'
    this.start_btn = false
    this.blockLimits = { min_x: 1, max_x: 7, min_y: 2, max_y: 10 }

    this.input = {
      pos: { x: -5, y: -5 },
      size: { w: 1, h: 1 },
      isTouching: false,
      click: false,
      color: '#000000',
      activeTool: 'Pencil',
    }
    
    this.images = {
      Pencil: Loader_Image('../img/cursor/MC1_normal.png'),
      Eraser: Loader_Image('../img/cursor/MC1_normal.png'),
      Picker: Loader_Image('../img/cursor/MC1_normal.png'),
    }
    
    this.toolImages = {
      Pencil: this.images.Pencil,
      Eraser: this.images.Eraser,
      Picker: this.images.Picker,
    }

    this.cursors = {
      Pencil: 'url(../img/cursor/MC1_normal.png), auto',
      Eraser: 'url(../img/cursor/MC1_normal.png), auto',
      Picker: 'url(../img/cursor/MC1_normal.png), auto',
    }

    this.toolInfo = {
      Pencil: `Left_Mouse: draw pixel`,
      Eraser: `Left_Mouse: erase pixel`,
      Picker: `Left_Mouse: Select color from pixel`,
    }

    this.gamepads = {}
    this.gamepadId = 0

    this.controller = {
      gamepadUp: undefined,
      gamepadDown: undefined,
      gamepadLeft: undefined,
      gamepadRight: undefined
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
  }

  ObjectDelete (_dict) {
    Object.keys(this.objects).forEach((key, value) => {
      if (this.objects[key].object.SetToRemove) {
        delete this.objects[this.objects[key].id]
      }
    })

    this.index = Object.keys(this.objects).length
  }

  init () {

  }

  draw () {
    if (this.input.activeTool === 'Pencil') {
      Graphic.Rect(this.interactCtx, this.input.pos, this.input.size, this.input.color, 1)
    }
    
    if (this.input.activeTool === 'Eraser') {
      Graphic.DrawImageSimple(this.interactCtx, this.toolImages[this.input.activeTool], this.input.pos, this.input.size, 1)
    }

    if (this.input.activeTool === 'Picker') {
      Graphic.Rect(this.interactCtx, this.input.pos, {w: 1, h: 1}, this.input.color, 1)
    }
    
    const inCanvasArea = (
      this.input.pos.x >= 0 &&
      this.input.pos.x <= this.window_size.w &&
      this.input.pos.y >= 0 &&
      this.input.pos.y <= this.window_size.h
    )

    // console.log(inCanvasArea)

    // if (inCanvasArea) console.log(inCanvasArea)

    if (this.input.click && inCanvasArea) {
      if (this.input.activeTool === 'Pencil') {
        Graphic.Rect(this.ctx, this.input.pos, this.input.size, this.input.color, 1)
      }

      if (this.input.activeTool === 'Eraser') {
        this.ctx.clearRect(this.input.pos.x, this.input.pos.y, this.input.size.w, this.input.size.h)
      }

      if (this.input.activeTool === 'Picker') {
        const color = this.ctx.getImageData(this.input.pos.x, this.input.pos.y, 1, 1).data
        const combinedColor = rgbToHex(color[0], color[1], color[2])
        this.input.color = combinedColor
        brushColor.value = combinedColor
        // console.log(this.input.color)
      }
    }
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
  }
}

function setColor(_main, _color) {
  if (_main.input.color !== _color) _main.input.color = _color
}

addEventListener('load', (e) => {
  const main = new (Main)()
  Screen.Init(main, canvas)
  Screen.Init(main, bg)
  Screen.Init(main, interact)
  Input.Input(main, canvas)
  Loader_Init(main.images)

  main.init()
  updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
  
  function updateInfoBar(_h1, _keys) {
    _h1.innerHTML = `[${main.input.activeTool}] ${_keys}`
    mouseCursor.style.cursor = main.cursors[main.input.activeTool]
  }

  saveButton.addEventListener('click', function(e) {
    saveImage()
  })

  clearCanvasButton.addEventListener('click', function(e) {
    main.ctx.clearRect(0, 0, canvas.width, canvas.height)
  })

  toolPencil.addEventListener('click', function(e) {
    main.input.activeTool = 'Pencil'
    updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
    // setColor(main, main.input.color)
  })

  toolEraser.addEventListener('click', function(e) {
    main.input.activeTool = 'Eraser'
    updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
    // setColor(main, main.input.color)
  })

  toolPicker.addEventListener('click', function(e) {
    main.input.activeTool = 'Picker'
    updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
    // setColor(main, main.input.color)
  })

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
    setColor(main, combinedColor)
    // if (main.input.color !== combinedColor) main.input.color = combinedColor
  })

  brushColor.addEventListener('input', function(e) {
    const color = e.target.value
    const combinedColor = hexToRGB(color)
    setColor(main, combinedColor)
    // if (main.input.color !== combinedColor) main.input.color = combinedColor
  })

  addEventListener('resize', (e) => {
    Screen.Resize(main, main.bgCtx, bg)
    Screen.Resize(main, main.ctx, canvas)
    Screen.Resize(main, main.interactCtx, interact)
  })

  const deltaTime = 1 / 60
  let accumulatedTime = 0
  let lastTime = 0

  function update (time) {
    accumulatedTime += (time - lastTime) / 1000

    while (accumulatedTime > deltaTime) {
      main.interactCtx.clearRect(0, 0, canvas.width, canvas.height)

      main.update(deltaTime)
      main.draw()

      accumulatedTime -= deltaTime
    }
    requestAnimationFrame(update)
    lastTime = time
  }
  update(0)
})

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRGB(hex){
  const r = parseInt(hex.substr(1,2), 16)
  const g = parseInt(hex.substr(3,2), 16)
  const b = parseInt(hex.substr(5,2), 16)
  return `rgb(${r}, ${g}, ${b})`
}

function saveImage(){
  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', 'Pixels.png');
  const canvas = document.getElementById('canvas');
  const dataURL = canvas.toDataURL('image/png');
  const url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
  downloadLink.setAttribute('href', url);
  downloadLink.click();
}
