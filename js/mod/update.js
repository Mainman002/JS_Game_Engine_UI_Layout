export class Update {
  constructor (main) {
    this.canvas = document.getElementById('canvas')
    this.main = main
    this.deltaTime = 1 / 60
    this.accumulatedTime = 0
    this.lastTime = 0
    this.time = 0
  }

  Init () {
    this.Start(0)
  }

  ClearCanvas (_ctx, _canvas) {
    _ctx.clearRect(0, 0, _canvas.width, _canvas.height)
  }

  Start (time) {
    this.accumulatedTime += (time - this.lastTime) / 1000

    while (this.accumulatedTime > this.deltaTime) {
      this.ClearCanvas(this.main.ctx, this.canvas)

      this.main.update(this.deltaTime)
      this.main.draw()

      this.accumulatedTime -= this.deltaTime
    }
    requestAnimationFrame(this.Start)
    // setTimeout(update, 1000/60, performance.now());
    this.lastTime = time
  }
}
