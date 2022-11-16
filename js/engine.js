import * as Screen from './mod/screen.js'
import {Loader_Init, Loader_Image} from './mod/loader.js'
import * as Graphic from './mod/graphic.js'
import * as Input from './mod/input.js'

const mouseCursor = document.getElementsByTagName("body")[0];

// H1 Text Items
const infoText = document.querySelector('.brushTool')
const brushSize = document.querySelector('.brushSize')
const brushColor = document.querySelector('.brushColor')
const brushBlur = document.querySelector('.brushBlur')

// Top Panel Buttons
const saveButton = document.querySelector('.saveButton')

// Left Panel Buttons
const toolPencil = document.querySelector('.pencil')
const toolLine = document.querySelector('.line')
const toolEraser = document.querySelector('.eraser')
const toolPicker = document.querySelector('.picker')
const toolGrid = document.querySelector('.gridBtn')

// Right Panel Buttons
const clearCanvasButton = document.querySelector('.clearCanvasButton')

class Main {
  constructor () {
    this.ctx = canvas.getContext('2d')
    this.bgCtx = bg.getContext('2d')
    this.gridCtx = grid.getContext('2d')
    this.interactCtx = interact.getContext('2d')
    this.index = 0

    this.window_size = { w: 40, h: 40 }
    this.game_state = 'MainMenu'
    this.start_btn = false
    this.blockLimits = { min_x: 1, max_x: 7, min_y: 2, max_y: 10 }

    this.input = {
      startPos: { x: -5, y: -5 },
      pos: { x: -5, y: -5 },
      size: { w: 1, h: 1 },
      isTouching: false,
      click: false,
      released: false,
      color: '#000000',
      blur: 0,
      activeTool: 'Pencil',
      lastTool: 'Pencil',
    }

    this.visibleGrid = 'hidden'
    
    this.images = {
      Pencil: Loader_Image('../img/buttons/Pencil_Tool.png'),
      Line: Loader_Image('../img/buttons/Line_Tool.png'),
      Eraser: Loader_Image('../img/buttons/Eraser_Tool.png'),
      Picker: Loader_Image('../img/buttons/Picker_Tool.png'),
    }
    
    this.toolImages = {
      Pencil: '../img/buttons/Pencil_Tool.png',
      Line: '../img/buttons/Line_Tool.png',
      Eraser: '../img/buttons/Eraser_Tool.png',
      Picker: '../img/buttons/Picker_Tool.png',
    }

    this.cursors = {
      Pencil: this.images.Pencil,
      Line: this.images.Line,
      Eraser: this.images.Eraser,
      Picker: this.images.Picker,
    }

    this.toolInfo = {
      Pencil: `Left_Mouse: draw pixel | Ctrl: color picker | Shift: draw line | Alt: Erase | G: toggle grid`,
      Line: `Left_Mouse: draw a strait line`,
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
    gridVisibility (this.visibleGrid)
    // grid.style.visibility = this.visibleGrid
  }

  draw () {
    // Graphic.Rect(this.bgCtx, {x: 0, y: 0}, {w: canvas.width, h: canvas.height}, "Black", 0.1)

    if (this.input.activeTool === 'Pencil') {
      Graphic.Rect(this.interactCtx, this.input.pos, this.input.size, this.input.color, 1)
    }

    if (this.input.activeTool === 'Line') {
      Graphic.Rect(this.interactCtx, this.input.pos, {w: 1, h: 1}, this.input.color, 1)
    }
    
    if (this.input.activeTool === 'Eraser') {
      const color = this.ctx.getImageData(this.input.pos.x, this.input.pos.y, this.input.size.w, this.input.size.h).data
      const invertedColor = {r: color[0], g: color[1], b: color[2]}
      // const combinedColor = rgbToHex(invertedColor.r, invertedColor.g, invertedColor.b)

      const combinedColor = invertRGB(invertedColor)

      Graphic.Rect(this.interactCtx, this.input.pos, this.input.size, combinedColor, 0.5)
      // Graphic.DrawImageSimple(this.interactCtx, this.toolImages[this.input.activeTool], this.input.pos, this.input.size, 1)
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
        Graphic.Rect(this.ctx, this.input.pos, this.input.size, this.input.color, 1, this.input.blur)
      }

      if (this.input.activeTool === 'Eraser') {
        this.ctx.clearRect(this.input.pos.x, this.input.pos.y, this.input.size.w, this.input.size.h)
      }

      if (this.input.activeTool === 'Picker') {
        const color = this.ctx.getImageData(this.input.pos.x, this.input.pos.y, 1, 1).data
        const combinedColor = rgbToHex(color[0], color[1], color[2])
        this.input.color = combinedColor
        brushColor.value = combinedColor
        brushBlur.value = 0
        // console.log(this.input.color)
      }
    }

    if (this.input.activeTool === 'Line' && this.input.click) {
      Graphic.ActionLine(this.input.startPos, this.input.pos, this.input.color, this.interactCtx, 1)
      this.input.released = true
    } else {
      if (this.input.released) {
        Graphic.ActionLine(this.input.startPos, this.input.pos, this.input.color, this.ctx, 1)
        this.input.startPos = {x: -5, y: -5}
        this.input.released = false
      }
    }

    // Graphic.LineGrid(this.gridCtx, 1, {x: 5, y: 5}, {x: 3, y: 3})
    // Graphic.Line(this.interactCtx, {x: this.input.startPos.x, y: this.input.startPos.y}, {x: this.input.pos.x, y: this.input.pos.y}, 1, 3, this.input.color)
  }

  update (dt) {
    
  }
}

function setColor(_main, _color) {
  if (_main.input.color !== _color) _main.input.color = _color
}

function setBlur(_main, _blur) {
  if (_main.input.blur !== _blur) _main.input.blur = _blur
}

addEventListener('load', (e) => {
  const main = new (Main)()

  Screen.Init(main, canvas)
  Screen.Init(main, bg)
  Screen.Init(main, grid)
  Screen.Init(main, interact)

  Loader_Init(main.images)
  
  Input.Input(main, canvas)

  main.init()

  updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
  
  function updateInfoBar(_h1, _keys) {
    _h1.innerHTML = `[${main.input.activeTool}] ${_keys}`
    mouseCursor.style.cursor = `url(${main.toolImages[main.input.activeTool]}), default`
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
  })

  toolLine.addEventListener('click', function(e) {
    main.input.activeTool = 'Line'
    updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
  })

  toolEraser.addEventListener('click', function(e) {
    main.input.activeTool = 'Eraser'
    updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
  })

  toolPicker.addEventListener('click', function(e) {
    main.input.activeTool = 'Picker'
    updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
  })

  toolGrid.addEventListener('click', function(e) {
    gridVisibilityToggle()
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

  brushBlur.addEventListener('input', function(e) {
    setBlur(main, e.target.value)
    // if (main.input.color !== combinedColor) main.input.color = combinedColor
  })

  brushBlur.addEventListener('change', function(e) {
    setBlur(main, e.target.value)
    // if (main.input.color !== combinedColor) main.input.color = combinedColor
  })

  // Keyboard
  addEventListener("keydown", keyListenerPress);
  addEventListener("keyup", keyListenerRelease);

  addEventListener('resize', (e) => {
    Screen.Resize(main, main.bgCtx, bg)
    Screen.Resize(main, main.ctx, canvas)
    Screen.Resize(main, main.gridCtx, grid)
    Screen.Resize(main, main.interactCtx, interact)
  })

  function keyListenerPress (event) {
    this.key_state = (event.type === "keydown")?true:false;
  
    if (event.key === 'g') {
      gridVisibilityToggle()
    } else if (event.key === 'Control') {
      // main.input.lastTool = main.input.activeTool
      main.input.lastTool = 'Pencil'
      main.input.activeTool = 'Picker'
      updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
    } else if (event.key === 'Shift') {
      // main.input.lastTool = main.input.activeTool
      main.input.lastTool = 'Pencil' 
      main.input.activeTool = 'Line'
      updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
    } else if (event.key === 'Alt') {
      // main.input.lastTool = main.input.activeTool
      main.input.lastTool = 'Pencil' 
        main.input.activeTool = 'Eraser'
        updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
    }

    // switch(event.key) {
    //   case "g":
    //     gridVisibilityToggle()
    //   break
    //   case "Control":
    //     main.input.lastTool = main.input.activeTool
    //     main.input.activeTool = 'Picker'
    //     updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
    //     // toolSetPicker()
    //   break
    //   case "Shift":
    //     main.input.lastTool = main.input.activeTool 
    //     main.input.activeTool = 'Line'
    //     updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
    //   break
    //   case "Alt":
    //     main.input.lastTool = main.input.activeTool 
    //     main.input.activeTool = 'Eraser'
    //     updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
    //   break
    // }
  }

  function keyListenerRelease (event) {
    this.key_state = (event.type === "keydown")?true:false;

    if (event.key === 'Control' || event.key === 'Shift' || event.key === 'Alt') {
      main.input.activeTool = main.input.lastTool
      updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
    }
  
    // switch(event.key) {
    //   case "g":
    //     gridVisibilityToggle()
    //   break
    //   case "Control":
    //     main.input.activeTool = main.input.lastTool
    //     updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
    //     // toolSetPicker()
    //   break
    //   case "Shift":
    //     main.input.activeTool = main.input.lastTool
    //     updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
    //   break
    //   case "Alt":
    //     main.input.activeTool = main.input.lastTool
    //     updateInfoBar(infoText, main.toolInfo[main.input.activeTool])
    //   break
    // }
  }

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

function padZero(str, len) {
  len = len || 2;
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

function invertRGB(_color) {
  // invert color components
  const r = (255 - parseInt(_color.r, 16)).toString(16),
      g = (255 - parseInt(_color.g, 16)).toString(16),
      b = (255 - parseInt(_color.b, 16)).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
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

function gridVisibility (_visible) {
  grid.style.visibility = _visible
  main.visibleGrid = _visible
}

function gridVisibilityToggle () {
  if (main.visibleGrid === 'visible') {
    main.visibleGrid = 'hidden'
  } else {
    main.visibleGrid = 'visible'
  }
  gridVisibility(main.visibleGrid)
}

function addCanvasLayer(_name) {
  const canv = document.createElement(_name);
  canv.id = _name;

  document.body.appendChild(canv); // adds the canvas to the body element
  // document.getElementById('someBox').appendChild(canv); // adds the canvas to #someBox
}

