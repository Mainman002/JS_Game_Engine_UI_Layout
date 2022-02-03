import * as Graphic from '../mod/graphic.js'
import * as Collision from '../mod/collision.js'

export class Block {
  constructor (main, pos, size, color) {
    this.main = main
    // this.image = main.images.player_sprites;
    this.pos = pos
    this.size = size
    this.color = color
    this.touching = false
    // this.dir = {x: 0, y: 0};
    // this.speed = 300;
  }

  init () {

  }

  draw () {
    // if (this.touching) {
    Graphic.Rect(this.main.ctx, this.pos, this.size, this.color, 1)
    // } else {
    //   Rect(this.main.ctx, this.pos, this.size, 'Teal', 1)
    // }
  }

  update (dt) {
    const mouse = Collision.InsideArea(this.main.input.pos, this.main.input.size)
    const area = Collision.InsideArea(this.pos, this.size)

    // const mouse = Collision.IntersectArea(this.main.input.pos, this.main.input.size)
    // const area = Collision.IntersectArea(this.pos, this.size)

    this.touching = Collision.CompareAreas(mouse, area)

    if (this.touching && this.main.input.click) {
      this.color = this.main.input.color
    }
  }
}
