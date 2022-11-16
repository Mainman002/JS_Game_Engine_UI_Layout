import * as Graphic from '../mod/graphic.js'
// import * as Collision from '../mod/collision.js'

export class Laser {
  constructor (main, pos) {
    this.main = main
    this.pos = pos
    this.size = { w: 8, h: 8 }
    this.color = 'Red'
    this.speed = 300
    this.SetToRemove = false
  }

  init () {

  }

  update (dt) {
    this.pos.y = this.pos.y - this.speed * dt

    if (this.pos.y < 16) {
      this.SetToRemove = true
      // this.main.ListDelete(this.main.lasers)
      this.main.ObjectDelete(this.main.objects)
      // this.main.MapDelete(this.main.objects, this.id)
      // this.main.DeleteInstance(this.main.lasers)
    }
  }

  draw () {
    Graphic.Rect(this.main.ctx, this.pos, this.size, this.color, 1)
  }
}
