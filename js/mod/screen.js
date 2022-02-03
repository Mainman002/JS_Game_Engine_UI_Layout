export function Init (_main, _canvas) {
  _canvas.width = _main.window_size.w
  _canvas.height = _main.window_size.h
  _canvas.style.width = `${_main.window_size.w}px`
  _canvas.style.height = `${_main.window_size.h}px`

  this.Resize(_main, _main.ctx, _canvas)

  // gameOver;
}

export function Edge (_canvas) {
  return {
    left: 0,
    right: _canvas.width,
    up: 0,
    down: _canvas.height
  }
}

export function Resize (_main, _ctx, _canvas) {
  const border = 16

  const aspectList = {
    box: { w: 5, h: 4 },
    wide: { w: 6.5, h: 4 }
  }

  const aspect = aspectList.box

  const ImgSmooth = false
  let w = window.innerWidth
  let h = w * (aspect.h / aspect.w)

  if (h < window.innerHeight) {
    // Check window width
    w = window.innerWidth
    h = w * (aspect.h / aspect.w)
  } else {
    // Check window height
    h = window.innerHeight
    w = h * (aspect.w / aspect.h)
  }

  if (_main.debug) console.log('Resized', 'W', Math.floor(w), 'H', Math.floor(h))

  _canvas.style.width = `${w - border}px`
  _canvas.style.height = `${h - 62 - border}px`

  // Graphic sharpness
  _ctx.mozImageSmoothingEnabled = ImgSmooth
  _ctx.msImageSmoothingEnabled = ImgSmooth
  _ctx.imageSmoothingEnabled = ImgSmooth

  scrollTo(0, 1)
}

