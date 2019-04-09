// https://css-tricks.com/snippets/javascript/replacements-setinterval-using-requestanimationframe/
export function requestInterval(callback: () => any, delay: number) {
  const nextFrame = window.requestAnimationFrame

  let start = Date.now()
  let stop: boolean
  const tick = () => {
    if (Date.now() - start >= delay) {
      start = Date.now()
      callback()
    }
    stop || nextFrame(tick)
  }
  nextFrame(tick)

  return {
    clear() {
      stop = true
    }
  }
}

export function stepInterval(tick: (step: number) => any, totalMs: number, steps: number) {
  return new Promise(resolve => {
    let step = 0
    const intent = requestInterval(() => {
      step <= steps
        ? tick(step++)
        : (intent.clear(), resolve())
    }, totalMs / steps)
  })
}
