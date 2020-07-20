import React, { Component } from 'react'
import { Card } from 'antd'
import styled from 'styled-components'
import { ImageUrl } from '../models'

const GalleryContainer = styled.div`
  display: flex;
`
const StyledCard = styled(Card)`
  width: 240px;
  height: 180px;
  margin: 12px;

  .ant-card-body {
    padding: 12px;
  }
`
const Image = styled.img`
  width: 100%;
  height: 100%;
`

interface IGalleryProps {
  onAdd?: () => {}
  onSub?: () => {}
  items: ImageUrl[]
}

interface IGalleryState {
  items: ImageUrl[]
}


class Gallery extends Component<IGalleryProps, IGalleryState> {
  constructor(props: IGalleryProps) {
    super(props)
    this.state = {
      items: this.props.items
    }
  }

  _onRenderCard(items: ImageUrl[] ): React.ReactElement[] {
    const cards: React.ReactElement[] = []
    items.forEach( (item: ImageUrl, index: number) => {
      cards.push((
        <StyledCard key={index}>
          <Image src={item} />
        </StyledCard>
      ))
    })
    return (cards)
  }

  render(): React.ReactElement {
    const { items } = this.state
    return (
      <GalleryContainer>
        {this._onRenderCard(items)}
      </GalleryContainer>
    )
  }
}

export default Gallery