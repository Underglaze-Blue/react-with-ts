import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ImageUrl } from '../../models'
import {Modal, Button, Card} from 'antd'
import {download} from '../../utils'
import styled from "styled-components";

interface IImageStore {
  imageStore: Array<string>
}

interface IGalleryProps {
  onAdd?: () => {}
  onSub?: () => {}
  items: Array<string>
}

interface IGalleryState {
  items: Array<string>,
  visible: boolean,
  item: string
}

const GalleryContainer = styled.div`
  display: flex;
  width: 95vw;
  flex-wrap: wrap;
`
const StyledCard = styled(Card)`
  width: 260px;
  margin: 12px;
  .ant-card-body {
    padding: 10px 8px;
    display: flex;
    flex-direction: column;
  }
`
const Image = styled.img`
  width: 100%;
  height: calc(180px - 16px);
  object-fit: contain
`

const ShowImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const StyledSpan = styled.span`
  width: 100%;
  text-align: center;
  display: inline-block;
`



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
      <GalleryContainer style={{width: '100%', height: '100%'}}>
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
