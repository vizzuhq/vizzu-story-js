function waitForSlidesToBeSet(vp, timeout) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()

    const checkSlides = () => {
      if (vp.slides !== undefined) {
        resolve(vp.slides)
      } else if (Date.now() - startTime >= timeout) {
        reject(new Error('Timeout: slides were not set within the specified time.'))
      } else {
        setTimeout(checkSlides, 100)
      }
    }

    checkSlides()
  })
}

function waitForAnimationEnd(vp, timeout) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()

    const checkAnimation = () => {
      if (!vp.animationQueue.isPlaying()) {
        resolve()
      } else if (Date.now() - startTime >= timeout) {
        reject(new Error('Timeout: animation was not finished within the specified time.'))
      } else {
        setTimeout(checkAnimation, 100)
      }
    }

    checkAnimation()
  })
}

export { waitForSlidesToBeSet, waitForAnimationEnd }
