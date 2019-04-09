import * as React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { spacing, MAX_Z_INDEX } from '../lib/cssvars'
import { Size, createImageElement, getImageSize } from '../lib/resizer'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0 , 0, 0.4);
  z-index: ${MAX_Z_INDEX};

  &, & * {
    box-sizing: border-box;
  }
`

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const boxPadding = spacing * 2;
const boxMargin = spacing * 2;
const Box = styled.div`
  min-width: 500px;
  max-width: calc(100vw - ${boxMargin * 2}px);
  margin: ${boxMargin}px;
  background: white;
  border-radius: 3px;
  padding: ${boxPadding}px;
`

const BoxContent = styled.div`
  max-height: calc(100vh - ${boxMargin * 2}px - ${boxPadding * 2}px);
  overflow-y: auto;
`

const ImageContainer = styled.div`
  max-width: 100%;
  overflow: auto;
`

export default class UploadResizer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      size: new Size(),
    }
  }

  async componentWillMount() {
    const img = await createImageElement(this.props.image)
    this.setState({ size: getImageSize(img) })
  }

  render() {
    const { size } = this.state

    return (
      <Overlay>
        <Container>
          <Box>
            <BoxContent>
              Image Preview:
              <ImageContainer>
                <img src={this.props.image} />
              </ImageContainer>

              <div>
                Original Size: {size.width}x{size.height}
              </div>
            </BoxContent>
          </Box>
        </Container>
      </Overlay>
    )
  }
}

UploadResizer.propTypes = {
  image: propTypes.string.isRequired,
}
