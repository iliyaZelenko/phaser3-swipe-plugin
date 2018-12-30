interface PluginInterface {
  UP: string
  RIGHT: string
  DOWN: string
  LEFT: string
}

interface ConfigInterface {
  offset: number
}

const defaultConfig: ConfigInterface = {
  offset: window.innerWidth * .1
}

// TODO сделать свой starter для typescript
// TODO выложить плагин для свайпа
export default class SwipePlugin extends Phaser.Plugins.BasePlugin implements PluginInterface {
  public UP: string = 'up'
  public RIGHT: string = 'right'
  public DOWN: string = 'down'
  public LEFT: string = 'left'

  public config: ConfigInterface = defaultConfig

  private xDown?: number
  private yDown?: number

  constructor (pluginManager) {
    super(pluginManager)
  }

  // start () {
  init (data) {
    this.configure(data)

    // const scene = this.game.scene
    // const input = this.game.input
    // const touch = this.game.input.touch

    // on('step'
    // this.game.events.on('step', () => {
    //   // console.log(this.game.input.activePointer.isDown)
    //   // console.log(this.game.input.pointers[0].isDown)
    // })

    this.game.canvas.addEventListener('touchstart', this.onTouchstart.bind(this))
    this.game.canvas.addEventListener('touchend', this.onTouchend.bind(this))
  }

  private onTouchstart (e) {
    const firstTouch = this.getTouch(e)

    this.xDown = firstTouch.clientX
    this.yDown = firstTouch.clientY
  }

  private onTouchend (e) {
    if (!this.xDown || !this.yDown) {
      return
    }

    const {
      clientX: xUp,
      clientY: yUp
    } = this.getTouch(e)
    const xDiff = this.xDown - xUp
    const yDiff = this.yDown - yUp
    const xDiffAbs = Math.abs(this.xDown - xUp)
    const yDiffAbs = Math.abs(this.yDown - yUp)

    if (Math.max(xDiffAbs, yDiffAbs) < this.config.offset) {
      return
    }

    if (xDiffAbs > yDiffAbs) {
      this.sendEvent(xDiff > 0 ? this.LEFT : this.RIGHT)
    } else {
      this.sendEvent(yDiff > 0 ? this.UP : this.DOWN)
    }
  }

  private getTouch (e) {
    return e.changedTouches[0]
  }

  private configure (data) {
    Object.assign(this.config, data)
  }

  private sendEvent (dir) {
    this.game.events.emit('swipe', dir)
  }
}
