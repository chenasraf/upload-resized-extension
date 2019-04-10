import * as React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { spacing, MAX_Z_INDEX } from '../lib/cssvars'
import { Size, createImageElement, getImageSize } from '../lib/resizer'
import ImageCanvas from './image_canvas.jsx'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0 , 0, 0.4);
  z-index: ${MAX_Z_INDEX};
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;

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
  max-width: calc(100vw - ${boxMargin * 2}px);
  max-height: calc(100vh - ${boxMargin * 2}px);
  min-width: 500px;
  margin: ${boxMargin}px;
  padding: ${boxMargin / 2}px;
  background: white;
  border-radius: 3px;
  overflow: auto;
`

const TopBar = styled.div``
const BottomBar = styled.div``

const BoxContent = styled.div`
  max-width: calc(100vw - ${boxMargin * 2}px);
  max-height: calc(100vh - 200px);
  overflow: auto;
`

const ImageContainer = styled.div``

const Metadata = styled.div`
  display: flex;
  margin-top: ${spacing * 2}px;
`

const Chip = styled.span`
  display: inline-block;
  background: #eee;
  border-radius: 1em;
  padding: 6px 9px;
  font-size: 0.95em;
  &:not(:last-child) {
    margin-right: ${spacing}px;
  }
`

export default class UploadResizer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageSize: new Size(),
      customSize: new Size(),
      image: null,
    }
  }

  async componentWillMount() {
    const image = await createImageElement(this.props.image)
    const imageSize = getImageSize(image);
    const customSize = imageSize.resize(this.props.ratio)
    this.setState({ image, imageSize, customSize })
  }

  render() {
    const { imageSize, customSize, image } = this.state
    const { onClose } = this.props

    return (
      <Overlay onClick={(e) => onClose && onClose(e)}>
        <Container onClick={(e) => e.stopPropagation()}>
          <Box>
            <TopBar>
              Final Size Preview
            </TopBar>

            <BoxContent>
              <ImageContainer>
                {image ? <ImageCanvas image={image} size={customSize} /> : 'Loading...'}
              </ImageContainer>
            </BoxContent>

            <Metadata>
              <Chip>
                Original Size: {imageSize.width}x{imageSize.height}
              </Chip>
              <Chip>
                New Size: {customSize.width}x{customSize.height}
                <select onChange={(e) => this.changeRatio(e.target.value)}
                  defaultValue={this.props.ratio}>
                  {[0.25, 0.5, 0.75].map((ratio) => {
                    return (
                      <option key={ratio} value={ratio}>
                        {ratio * 100}% of original
                      </option>
                    )
                  })}
                  <option value={1}>Original Size</option>
                </select>
              </Chip>
            </Metadata>
          </Box>
        </Container>
      </Overlay>
    )
  }

  changeRatio(ratio) {
    const { imageSize } = this.state
    const customSize = imageSize.resize(Number(ratio))
    this.setState({ customSize })
  }
}

UploadResizer.propTypes = {
  image: propTypes.string.isRequired,
  ratio: propTypes.oneOfType([
    propTypes.instanceOf(Size),
    propTypes.number,
  ]),
  onClose: propTypes.func,
}
