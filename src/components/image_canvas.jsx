import * as React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { Size } from '../lib/resizer'

const Container = styled.div``

export default class ImageCanvas extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   //
    // }
  }

  componentDidMount() {
    this.redraw()
  }

  componentWillUpdate(props) {
    this.redraw({ newSize: props.size })
  }

  canvasCtx() {
    return this.canvasRef && this.canvasRef.getContext('2d')
  }

  redraw({ newSize } = {}) {
    const { image } = this.props
    let { size } = this.props
    size = newSize || size
    const ctx = this.canvasCtx()
    this.canvasRef.width = size.width
    this.canvasRef.height = size.height
    ctx.clearRect(0, 0, size.width, size.height)
    ctx.drawImage(image, 0, 0, size.width, size.height)
  }

  render() {
    return (
      <Container>
        <canvas ref={(ref) => this.canvasRef = ref}></canvas>
      </Container>
    )
  }
}

ImageCanvas.propTypes = {
  image: propTypes.instanceOf(Image).isRequired,
  size: propTypes.oneOfType([
    propTypes.instanceOf(Size),
    propTypes.number,
  ])
}
