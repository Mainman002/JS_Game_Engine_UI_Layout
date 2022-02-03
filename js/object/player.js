import * as Screen from '../mod/screen.js'
import * as Graphic from '../mod/graphic.js'
import * as Collision from '../mod/collision.js'
import { Laser } from './laser.js'

const canvas = document.getElementById('canvas')

export class Player {
  constructor (main, pos, size, color) {
    this.main = main
    this.image = main.images.player_sprites
    this.pos = pos
    this.size = size
    this.color = color
    this.dir = { x: 0, y: 0 }
    this.speed = 300
    this.amount = 0
    this.touching = false
    this.shooting = false
  }

  init () {
    // this.main.lasers.push(new Laser(this.main, this.pos))
  }

  draw () {
    if (this.touching) {
      Graphic.Rect(this.main.ctx, this.pos, this.size, 'Red', 1)
    } else {
      Graphic.Rect(this.main.ctx, this.pos, this.size, 'Teal', 1)
    }

    Graphic.DrawImage(this.main.ctx, this.image,
      { x: 0, y: 0 },
      { w: 36, h: 42 },
      { x: this.pos.x + this.size.w * 0.5, y: this.pos.y + this.size.h * 0.5 },
      { w: this.size.w, h: this.size.h }, 1)
  }

  update (dt) {
    if (this.shooting && this.main.index < 10) {
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 8, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 7, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 6, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 5, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 4, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 3, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 2, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 2, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 3, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 4, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 5, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 6, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 7, y: this.pos.y }))
      this.main.ObjectInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 8, y: this.pos.y }))

      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 19, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 18, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 17, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 16, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 15, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 14, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 13, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 12, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 11, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 10, y: this.pos.y }))

      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 9, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 8, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 7, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 6, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 5, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 4, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 3, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 2, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9 * 1, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x - 9, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x + 9, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x + 9 * 2, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x + 9 * 3, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x + 9 * 4, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x + 9 * 5, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x + 9 * 6, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x + 9 * 7, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x + 9 * 8, y: this.pos.y }))
      // this.main.ListInstance(this.main.lasers, new Laser(this.main, { x: this.pos.x + 9 * 9, y: this.pos.y }))

      // if (this.shooting && this.main.objects.size < 80) {
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 19, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 18, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 17, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 16, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 15, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 14, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 13, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 12, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 11, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 10, y: this.pos.y }))

      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 9, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 8, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 7, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 6, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 5, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 4, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 3, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9 * 2, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x - 9, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 2, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 3, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 4, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 5, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 6, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 7, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 8, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 9, y: this.pos.y }))

      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 10, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 11, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 12, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 13, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 14, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 15, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 16, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 17, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 18, y: this.pos.y }))
      // this.main.MapInstance(this.main.objects, new Laser(this.main, { x: this.pos.x + 9 * 19, y: this.pos.y }))

      // console.log(this.main.objects.values())
      // this.main.lasers.push(new Laser(this.main, `laser_${this.main.objects.length}`, { x: this.pos.x, y: this.pos.y }))
    }

    // Bounds check
    if (this.pos.x < Screen.Edge(canvas).left - this.size.w) {
      this.pos.x = Screen.Edge(canvas).right
    } else if (this.pos.x > Screen.Edge(canvas).right) {
      this.pos.x = Screen.Edge(canvas).left - this.size.w
    }

    if (this.pos.y < Screen.Edge(canvas).up - this.size.h) {
      this.pos.y = Screen.Edge(canvas).down
    } else if (this.pos.y > Screen.Edge(canvas).down) {
      this.pos.y = Screen.Edge(canvas).up - this.size.h
    }

    // const mouse = InsideArea(this.main.input.pos, this.main.input.size)
    // const area = InsideArea(this.pos, this.size)

    const mouse = Collision.IntersectArea(this.main.input.pos, this.main.input.size)
    const area = Collision.IntersectArea(this.pos, this.size)

    this.touching = Collision.CompareAreas(mouse, area)

    // console.log( this.main.input.pos );

    // console.log( mouse.left );
    // console.log( Collision.CompareAreas( mouse, area ) );

    // touch
    if (this.main.input.isTouching) {
      if (this.pos.x <= Screen.Edge(canvas).right - 64) {
        if (this.pos.x > (this.main.input.pos.x + 2) - (this.size.w * 0.5)) {
          this.pos.x = Math.floor(this.pos.x - this.speed * dt)
        }
      } else {
        this.pos.x = Screen.Edge(canvas).right - 64
      }

      if (this.pos.x >= Screen.Edge(canvas).left) {
        if (this.pos.x < (this.main.input.pos.x - 2) - (this.size.w * 0.5)) {
          this.pos.x = Math.floor(this.pos.x + this.speed * dt)
        }
      } else {
        this.pos.x = Screen.Edge(canvas).left
      }

      // if (this.pos.y > (this.main.input.pos.y + 2) - (this.size.h * 0.5)) {
      //   this.pos.y = Math.floor(this.pos.y - this.speed * dt)
      // }

      // if (this.pos.y < (this.main.input.pos.y - 2) - (this.size.h * 0.5)) {
      //   this.pos.y = Math.floor(this.pos.y + this.speed * dt)
      // }
    }

    // Gamepad
    if (this.main.gamepads) {
      if (this.main.controller.gamepadLeft) {
        this.pos.x = Math.floor(this.pos.x - this.speed * dt)
      }

      if (this.main.controller.gamepadRight) {
        this.pos.x = Math.floor(this.pos.x + this.speed * dt)
      }

      if (this.main.controller.gamepadUp) {
        this.pos.y = Math.floor(this.pos.y - this.speed * dt)
      }

      if (this.main.controller.gamepadDown) {
        this.pos.y = Math.floor(this.pos.y + this.speed * dt)
      }
    }
  }
}
