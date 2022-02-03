
export function DrawText (_ctx, _text, _align, _font, _pos, _size, _color, _a) {
  _ctx.globalAlpha = _a
  _ctx.textAlign = _align
  _ctx.fillStyle = _color

  if (_font) {
    _ctx.font = `${_size}px ${_font}`
  } else {
    _ctx.font = `${_size}px ${'Noto Sans'}`
  }

  _ctx.fillText(`${_text}`, _pos.x, _pos.y)
  _ctx.globalAlpha = 1
}

export function DrawImage (_ctx, _image, _frame, _spriteSize, _pos, _size, _a) {
  _ctx.globalAlpha = _a

  _ctx.save()
  _ctx.translate(_pos.x, _pos.y)
  // _ctx.rotate(_rot);

  _ctx.drawImage(_image,
    _frame.x, _frame.y, _spriteSize.w, _spriteSize.h,
    _pos.x - _pos.x - _size.w * 0.5, _pos.y - _pos.y - _size.h * 0.5,
    _size.w, _size.h)

  _ctx.restore()
  _ctx.globalAlpha = 1.0
}

export function DrawImageSimple (_ctx, _image, _pos, _size, _a) {
  _ctx.globalAlpha = _a

  _ctx.drawImage(_image,
    _pos.x, _pos.y, _size.w, _size.h)
  _ctx.globalAlpha = 1.0
}

export function Line (_ctx, _PosStart, _PosEnd, offset, _thickness, _color) {
  _ctx.strokeStyle = _color
  _ctx.lineWidth = _thickness

  if (!offset) {
    offset = { w: offset.w, h: offset.h }
  }

  // draw a red line
  _ctx.beginPath()
  _ctx.moveTo(_PosEnd.x + offset.w * 0.5, _PosEnd.y + offset.h * 0.5)
  _ctx.lineTo(_PosStart.x + offset.w * 0.5, _PosStart.y + offset.h * 0.5)
  _ctx.stroke()
}

export function Rect (_ctx, _pos, _size, _color, _a) {
  _ctx.globalAlpha = _a
  _ctx.fillStyle = _color
  _ctx.fillRect(_pos.x, _pos.y, _size.w, _size.h)
  _ctx.globalAlpha = 1
}
