import { assert } from './utils'

export function createImageElement(src) {
  assert(src, 'src must not be empty')

  const img = new Image()
  img.src = src

  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img)
    img.onerror = (e) => reject(e)
  })
}

export function
getImageSize(img) {
  assert(img instanceof Image, 'expected Image object')
  return new Size(img.width, img.height)
}

export class Size {
  constructor(width, height) {
    assert(
      ['undefined', 'number'].includes(typeof width) ||
      (typeof width === 'object' && typeof height === 'undefined'), 'width must be number or undefined')
    assert(['undefined', 'number'].includes(typeof height), 'height must be number or undefined')
    if (typeof width === 'object') {
      this.width = width.width
      this.height = width.height
    } else {
      this.width = width
      this.height = height
    }
  }

  resize(ratio) {
    if (ratio === undefined) {
      return new Size(this.width, this.height)
    }
    if (typeof ratio === 'number') {
      return new Size(this.width * ratio, this.height * ratio)
    }
    if (ratio instanceof Size) {
      return ratio
    }
    throw new Error('bad ratio value')
  }
}
