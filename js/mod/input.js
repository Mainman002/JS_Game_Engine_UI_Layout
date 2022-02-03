const canvas = document.getElementById('canvas')

export function Input (_main, _canvas) {
  // handle touch input
  oncontextmenu = function (event) {
    event.preventDefault()
    event.stopPropagation()
    return false
  }

  addEventListener('mousemove', (e) => {
    const bounds = _canvas.getBoundingClientRect()

    // console.log(_main.input);

    // get the mouse coordinates, subtract the _canvas top left and any scrolling
    _main.input.pos.x = e.pageX - bounds.left - scrollX
    _main.input.pos.y = e.pageY - bounds.top - scrollY

    // first normalize the mouse coordinates from 0 to 1 (0,0) top left
    // off _canvas and (1,1) bottom right by dividing by the bounds width and height
    _main.input.pos.x /= bounds.width
    _main.input.pos.y /= bounds.height

    // then scale to _canvas coordinates by multiplying the normalized coords with the _canvas resolution
    _main.input.pos.x *= _canvas.width
    _main.input.pos.y *= _canvas.height

    // Floor position values to whole numbers
    _main.input.pos.x = Math.floor(_main.input.pos.x - _main.input.size.w * 0.5)
    _main.input.pos.y = Math.floor(_main.input.pos.y - _main.input.size.h * 0.5)

    if (!_main.input.isTouching) {
      _main.input.isTouching = true
    }
  })

  addEventListener('mousedown', (e) => {
    if (_main.input.isTouching) {
      _main.input.click = true
      // _main.input.click = false
      // _main.input.isTouching = false
    }
  })

  addEventListener('mouseup', (e) => {
    if (_main.input.isTouching) {
      _main.input.isTouching = false
      _main.input.click = true
      _main.input.click = false
    }
  })

  addEventListener('touchstart', (e) => {
    this.GetTouchPos(_main, canvas, e)

    if (!_main.input.isTouching) {
      _main.input.isTouching = true
      _main.input.click = true
    }
  })

  addEventListener('touchmove', (e) => {
    this.GetTouchPos(_main, canvas, e)

    if (!_main.input.isTouching) {
      _main.input.isTouching = true
      _main.input.click = true
    }
  })

  addEventListener('touchend', (e) => {
    if (_main.input.isTouching) {
      _main.input.isTouching = false
      _main.input.click = true
      _main.input.click = false
    }
  })

  addEventListener('touchcancel', (e) => {
    if (_main.input.isTouching) {
      _main.input.isTouching = false
    }
  })

  // handle gamepad input
  addEventListener('gamepadconnected', (e) => {
    if (!_main.gamepads[e.gamepad.index]) {
      _main.gamepads[e.gamepad.index] = {}
      _main.gamepads[e.gamepad.index].id = e.gamepad.index
    }
  })

  addEventListener('gamepaddisconnected', (e) => {
    if (_main.gamepads[e.gamepad.index]) {
      delete _main.gamepads[e.gamepad.index]
    }
  })
}

export function GetTouchPos (_main, _canvas, e) {
  const bounds = _canvas.getBoundingClientRect()

  if (e.touches[0]) {
    if (!_main.input.pos.x || !_main.input.pos.y) {
      _main.input.pos.x = 0
      _main.input.pos.y = 0
    }

    // get the mouse coordinates, subtract the _canvas top left and any scrolling
    _main.input.pos.x = e.touches[0].pageX - bounds.left - scrollX
    _main.input.pos.y = e.touches[0].pageY - bounds.top - scrollY

    // first normalize the mouse coordinates from 0 to 1 (0,0) top left
    // off _canvas and (1,1) bottom right by dividing by the bounds width and height
    _main.input.pos.x /= bounds.width
    _main.input.pos.y /= bounds.height

    // then scale to _canvas coordinates by multiplying the normalized coords with the _canvas resolution
    _main.input.pos.x *= _canvas.width
    _main.input.pos.y *= _canvas.height

    // Floor position values to whole numbers
    _main.input.pos.x = Math.floor(_main.input.pos.x)
    _main.input.pos.y = Math.floor(_main.input.pos.y)
  }
}
