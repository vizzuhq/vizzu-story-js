class AnimationNode {
  constructor(configObject, animOptions) {
    this.configObject = configObject;
    this.animOptions = animOptions;
    this.next = null;
  }
}

class AnimationQueue {
  constructor(vizzu) {
    this.head = null;
    this.tail = null;
    this.vizzu = vizzu;
    this.playing = false;
    this.paused = false;
    this.controller = null;

    this.vizzu.on("animation-complete", () => {
      this.playing = false;
      this.next();
    });
  }

  enqueue(newConfigObject, newAnimOptions) {
    const configObject = this._recursiveCopy(newConfigObject);
    console.log(configObject[0].target)
    const  animOptions= this._recursiveCopy(newAnimOptions);
    if (this.tail && 
      this.tail.configObject === configObject && 
      this.tail.animOptions === animOptions) return;
    
    const newNode = new AnimationNode(configObject, animOptions);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    if (!this.playing) {
      this.play();
    }
  }

  dequeue() {
    if (!this.head) return;

    const removedNode = this.head;
    this.head = this.head.next;
    return removedNode;
  }

  insertqueue(configObject, animOptions) {
    if (!this.head) return;
    const firstAnimation = this.head;
    const newAnimation = new AnimationNode(configObject, animOptions);

    if (!firstAnimation.next) {
       // There's no animation after the first one
      firstAnimation.next = newAnimation;
      // The new animation becomes the last in the queue
      this.tail = newAnimation;
    } else {
      // There's already an animation after the first one
      newAnimation.next = firstAnimation.next;
      firstAnimation.next = newAnimation;
    }
  }

  isEmpty() {
    return this.head === null;
  }

  clear() {
    this.head = null;
    this.tail = null;
  }

  peek() {
    return this.head;
  }

  play() {
    if (!this.head) return;
    this.playing = true;
    const firstAnimation = this.head;
    if (firstAnimation.animOptions.playState === "paused") {
      this.paused = true;
      firstAnimation.animOptions.playState = "running";
    }
    console.log(firstAnimation.configObject[0].target, firstAnimation.animOptions)
    console.log("play",firstAnimation.configObject)
    this.vizzu.animate(firstAnimation.configObject, firstAnimation.animOptions)
      .activated.then((control) => {
        this.controller = control;
        if (this.paused) {
          this.controller.pause();
        } 
      });
  }

  next() {
    this.controller = null;

    this.dequeue();

    if (!this.head) {
      this.playing = false;
      return;
    }

    this.play();
  }

  pause() {
    if (!this.controller) return;

    this.paused = true;
    this.controller.pause();
  }

  manualUpdate(configObject, animOptions) { 

    if(this.controller) {
      this.controller.play();
      this.controller.stop();
    }

    if (!this.head) {
      this.enqueue(configObject, animOptions);
      return;
    };

    // Override the configuration and options of the first animation
    this.head.configObject = configObject;
    this.head.animOptions = animOptions;
    this.play();
  }

  abort() {
    if (!this.controller) return;

    this.paused = false;
    this.controller.stop();
    this.controller = null;
    this.dequeue();
    this.next();
  }

  isPaused() {
    return this.paused;
  }

  hasNext() {
    return !!this.head && !!this.head.next;
  }

  continue() {
    if (!this.controller) return;
    this.controller.play();
    if (this.head?.animOptions?.direction === "reverse") {
      this.controller.reverse();
    }
    this.paused = false;
  }

  _recursiveCopy(obj) {
    // If the value is null or not an object, simply return it
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    if (obj instanceof Function) {
      // If a function is found, return it
      return obj;
    }

    if (obj instanceof Array) {
      // Copy the array and recursively copy its elements
      const copyArray = [];
      obj.map((arrayElement) => copyArray.push(arrayElement));
      return copyArray;
    }

    const copyObj = {};
    for (const key in obj) {
      // Copy key-value pairs
      if (key in obj) {
        copyObj[key] = this._recursiveCopy(obj[key]);
      }
    }
    return copyObj;
  }
}

export default AnimationQueue;
