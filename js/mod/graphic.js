
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
  _ctx.save()
  _ctx.globalAlpha = _a
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
  _ctx.save()
  _ctx.globalAlpha = _a

  _ctx.drawImage(_image,
    _pos.x, _pos.y, _size.w, _size.h)

  _ctx.restore()
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

export function ActionLine(startPos, endPos, color, ctx, scale = 1) {
  // Author: Tom Cantwell
  // Address: https://cantwell-tom.medium.com/better-line-tool-for-pixel-art-fc999d3df5b5

  ctx.fillStyle = color;
  //create triangle object
  let tri = {}
  function getTriangle(x1,y1,x2,y2,ang) {
      if(Math.abs(x1-x2) > Math.abs(y1-y2)) {
          tri.x = Math.sign(Math.cos(ang));
          tri.y = Math.tan(ang)*Math.sign(Math.cos(ang));
          tri.long = Math.abs(x1-x2);
      } else { 
          tri.x = Math.tan((Math.PI/2)-ang)*Math.sign(Math.cos((Math.PI/2)-ang));
          tri.y = Math.sign(Math.cos((Math.PI/2)-ang));
          tri.long = Math.abs(y1-y2);
      }
  }
  // finds the angle of (x,y) on a plane from the origin
  function getAngle(x,y) { return Math.atan(y/(x==0?0.01:x))+(x<0?Math.PI:0); }
    let angle = getAngle(endPos.x-startPos.x,endPos.y-startPos.y); // angle of line
    getTriangle(startPos.x,startPos.y,endPos.x,endPos.y, angle);
    for(let i=0;i<tri.long;i++) {
        let thispoint = {x: Math.round(startPos.x + tri.x*i), y: Math.round(startPos.y + tri.y*i)};
        // for each point along the line
        ctx.fillRect(thispoint.x*scale, // round for perfect pixels
                    thispoint.y*scale, // thus no aliasing
                    scale,scale); // fill in one pixel, 1x1
    }
    //fill endpoint
    ctx.fillRect(Math.round(endPos.x)*scale, // round for perfect pixels
                    Math.round(endPos.y)*scale, // thus no aliasing
                    scale,scale); // fill in one pixel, 1x1
}

export function Rect (_ctx, _pos, _size, _color, _a) {
  _ctx.globalAlpha = _a
  _ctx.fillStyle = _color
  _ctx.fillRect(_pos.x, _pos.y, _size.w, _size.h)
  _ctx.globalAlpha = 1
}

export function LineGrid (_ctx, _thickness, _line_count, _offset) {
  _ctx.lineWidth = _thickness;

  Line(_ctx, {x: canvas.width * 0.5, y: 0}, {x: canvas.width *0.5, y: canvas.height}, {w: 0, h: 0}, _thickness, 'Grey' );
  Line(_ctx, {x: 0, y: canvas.height * 0.5}, {x: canvas.width, y: canvas.height * 0.5}, {w: 0, h: 0}, _thickness, 'Grey' );

  // Guide Lines Vertical Up
  for ( let x = 0; x < _line_count.x * 0.5; ++x ) {
    Line(_ctx, {x: canvas.width * 0.5 - _offset.x - _offset.x * x, y: 0}, {x: canvas.width *0.5 - _offset.x - _offset.x * x, y: canvas.height}, {w: 0, h: 0}, _thickness, 'Red' );
  }

  // Guide Lines Vertical Down
  for ( let x = 0; x < _line_count.x * 0.5; ++x ) {
    Line(_ctx, {x: canvas.width * 0.5 + _offset.x + _offset.x * x, y: 0}, {x: canvas.width *0.5 + _offset.x + _offset.x * x, y: canvas.height}, {w: 0, h: 0}, _thickness, 'Red' );
  }

    // Guide Lines Horizontal Left
    for ( let y = 0; y < _line_count.y * 0.5; ++y ) {
      Line(_ctx, {x: 0, y: canvas.height * 0.5 - _offset.y - _offset.y * y}, {x: canvas.width, y: canvas.height * 0.5 - _offset.y - _offset.y * y}, {w: 0, h: 0}, _thickness, 'Red' );
    }
  
    // Guide Lines Horizontal Right
    for ( let y = 0; y < _line_count.y * 0.5; ++y ) {
      Line(_ctx, {x: 0, y: canvas.height * 0.5 + _offset.y + _offset.y * y}, {x: canvas.width, y: canvas.height * 0.5 + _offset.y + _offset.y * y}, {w: 0, h: 0}, _thickness, 'Red' );
    }
}
