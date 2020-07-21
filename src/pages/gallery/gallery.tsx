import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ImageUrl } from '../../models'
import {Modal, Button} from 'antd'
import {download} from '../../utils'
import {GalleryContainer ,StyledCard, ShowImage, StyledSpan, Image} from './style'
import {IImageStore, IGalleryProps, IGalleryState} from "./type";

const mapStateToProps = (state: IImageStore) => {
  return {
    items: state.imageStore
  }
}

class Gallery extends Component<IGalleryProps, IGalleryState> {
  constructor(props: IGalleryProps) {
    super(props)
    this.state = {
      items: this.props.items,
      visible: false,
      item: ''
    }
  }

  _onRenderCard(items: ImageUrl[] ): React.ReactElement[] {
    const cards: React.ReactElement[] = []
    items.forEach( (item: ImageUrl, index: number) => {
      cards.push((
        <StyledCard onClick={() => this.showImage(item)} key={index}>
          <Image src={item} />
          <StyledSpan>{index + 1}</StyledSpan>
        </StyledCard>
      ))
    })
    return (cards)
  }

  showImage = (src: string) => {
    this.setState({
      item: src,
      visible: true
    })
  }
  handleOk = () => {
    this.setState({
      item: '',
      visible: false
    })
  }

  downloadImage = (src: string) => {
    download(src)
  }

  render(): React.ReactElement {
    const { items } = this.props
    return (
      <GalleryContainer>
        {this._onRenderCard(items)}
        <Modal
          title="Show Image"
          visible={this.state.visible}
          width="75vw"
          closable={false}
          centered
          footer={[
            <Button key="download" onClick={() => this.downloadImage(this.state.item)}>
              下载
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              确定
            </Button>
          ]}
        >
          <ShowImage src={this.state.item}/>
        </Modal>
      </GalleryContainer>
    )
  }
}

export default connect(mapStateToProps)(Gallery)
