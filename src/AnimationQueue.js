class AnimationNode {
  constructor(configObject, animOptions, parameters) {
    this.configObject = configObject
    this.animOptions = animOptions
    this.parameters = parameters
    this.next = null
  }
}

class AnimationQueue {
  constructor(vizzu) {
    this.head = null
    this.tail = null
    this.vizzu = vizzu
    this.playing = false
    this.paused = false
    this.controller = null
    this.direction = 'normal'
    this.lastAnimation = null
    this._lastParameters = null
    this.seekerEnabled = false

    this.vizzu.on('animation-complete', () => {
      this.playing = false
      this.next()
    })
  }

  enqueue(configObject, animOptions, parameters = null) {
    if (
      this.tail &&
      this.tail.configObject === configObject &&
      this.tail.animOptions === animOptions &&
      this.tail.parameters === parameters
    )
      return

    const newNode = new AnimationNode(configObject, animOptions, parameters)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }

    if (!this.playing) {
      this.play()
    }
  }

  dequeue() {
    if (!this.head) return

    const removedNode = this.head
    this.head = this.head.next
    return removedNode
  }

  insertqueue(configObject, animOptions) {
    if (!this.head) return
    const firstAnimation = this.head
    const newAnimation = new AnimationNode(configObject, animOptions)

    if (!firstAnimation.next) {
      // There's no animation after the first one
      firstAnimation.next = newAnimation
      // The new animation becomes the last in the queue
      this.tail = newAnimation
    } else {
      // There's already an animation after the first one
      newAnimation.next = firstAnimation.next
      firstAnimation.next = newAnimation
    }
  }

  isLast(node) {
    if (!node || !node.next) return true
    return node.next === null
  }

  isEmpty() {
    return this.head === null
  }

  clear() {
    this.head = null
    this.tail = null
  }

  peek() {
    return this.head
  }

  play() {
    this.playing = false
    if (!this.head) return

    const firstAnimation = this.head
    if (firstAnimation.animOptions.playState === 'paused') {
      this.paused = true
      firstAnimation.animOptions.playState = 'running'
    }

    if (firstAnimation.animOptions.direction === 'reverse') {
      this.direction = 'reverse'
    } else {
      this.direction = 'normal'
    }
    this.seekerEnabled = true
    if (firstAnimation.parameters.steppType !== 'normal') {
      this.seekerEnabled = false
    }

    // change speed when the current animate is not a last
    let configObject = firstAnimation.configObject

    if (!this.isLast(firstAnimation)) {
      configObject = this._speedUp(firstAnimation.configObject)
    }

    let startSlideConfig = null
    if (configObject.length > 1) {
      startSlideConfig = configObject[0]
      this.vizzu.feature('rendering', false)
      this.vizzu.animate(startSlideConfig.target, 0)
    }
    this.vizzu.animate(configObject, firstAnimation.animOptions).activated.then((control) => {
      this.playing = true
      this._lastParameters = firstAnimation.parameters || null
      this.vizzu.feature('rendering', true)
      this.controller = control

      if (this.paused) {
        control.pause()
      }
    })

    this.lastAnimation = {
      configObject,
      animOptions: firstAnimation.animOptions
    }
    if (!this.paused && this.direction === 'reverse' && startSlideConfig !== null) {
      this.vizzu.animate(startSlideConfig.target, 0)
    }
  }

  next() {
    this.dequeue()

    if (!this.head) {
      this.playing = false
      return
    }

    this.play()
  }

  pause() {
    if (!this.controller) return

    this.playing = false
    this.paused = true
    this.controller.pause()
  }

  reverse() {
    if (!this.controller) return
    this.playing = true
    this.direction = 'reverse'
    this.controller.reverse()
    this.controller.play()
  }

  seekStart(percent) {
    this.playing = false
    this.controller.cancel()
    this.vizzu.feature('rendering', false)
    if (this.lastAnimation.configObject.length > 1) {
      this.vizzu.animate(this.lastAnimation.configObject[0].target, {
        position: 1,
        duration: '0s'
      })
    }
    this.vizzu
      .animate(this._speedUp(this.lastAnimation.configObject), this.lastAnimation.animOptions)
      .activated.then((control) => {
        this.controller = control
        control.pause()
        this.pushed = true
        control.seek((this._currentSeek || percent) + '%')
        this.vizzu.feature('rendering', true)
      })
  }

  seek(percent) {
    if (!this.controller) return
    this._currentSeek = percent
    this.controller.seek(percent + '%')
  }

  getParameter(key) {
    if (this._lastParameters && key in this._lastParameters) {
      return this._lastParameters[key]
    }
    return null
  }

  manualUpdate(configObject, animOptions, slideNumber) {
    if (this.controller) {
      this.controller.play()
      this.controller.stop()
    }

    if (!this.head) {
      this.enqueue(configObject, animOptions, slideNumber)
      return
    }

    // Override the configuration and options of the first animation
    this.head.configObject = configObject
    this.head.animOptions = animOptions
    this.play()
  }

  abort() {
    if (!this.controller) return

    this.playing = false
    this.paused = false
    this.controller.stop()
    this.controller = null
    this.dequeue()
    this.next()
  }

  isPaused() {
    return this.paused
  }

  isPlaying() {
    return this.playing
  }

  hasNext() {
    return !!this.head && !!this.head.next
  }

  continue() {
    if (!this.controller) return

    this.paused = false
    this.playing = true

    this.controller.play()
  }

  _speedUp(configObject, duration = '500ms') {
    if (configObject instanceof Array) {
      return configObject.map((elem) => {
        return { target: elem.target, options: { duration } }
      })
    }

    if (configObject instanceof Object && configObject.target) {
      return {
        target: configObject.target,
        options: { duration }
      }
    }
    return {
      target: configObject,
      options: { duration }
    }
  }
}

export default AnimationQueue
