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
    left: 100,
    right: 100 + _canvas.width,
    up: 100,
    down: 100 + _canvas.height
  }
}

export function Resize (_main, _ctx, _canvas) {
  const border = 72

  const aspectList = {
    box: { w: 4, h: 3 },
    wide: { w: 6.5, h: 4 }
  }

  const aspect = aspectList.box

  const ImgSmooth = false
  let w = window.innerWidth
  let h = w
  // let h = w * (aspect.h / aspect.w)

  if (h < window.innerHeight) {
    // Check window width
    w = window.innerWidth
    h = w
  } else {
    // Check window height
    h = window.innerHeight
    w = h
  }

  if (_main.debug) console.log('Resized', 'W', Math.floor(w), 'H', Math.floor(h))

  _canvas.style.width = `${w - border * 2}px`
  _canvas.style.height = `${h - border * 2}px`

  // Graphic sharpness
  _ctx.mozImageSmoothingEnabled = ImgSmooth
  _ctx.msImageSmoothingEnabled = ImgSmooth
  _ctx.imageSmoothingEnabled = ImgSmooth

  scrollTo(0, 1)
}

