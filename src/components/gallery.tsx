import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd'
import styled from 'styled-components'
import { ImageUrl } from '../models'

const GalleryContainer = styled.div`
  display: flex;
  width: 95vw;
  flex-wrap: wrap;
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
  width: calc(240px - 24px);
  height: calc(180px - 24px);
  object-fit: contain
`

interface IGalleryProps {
  onAdd?: () => {}
  onSub?: () => {}
  items: ImageUrl[]
}

interface IGalleryState {
  items: ImageUrl[]
}

const mapStateToProps = (state: ImageUrl[]) => {
  return {
    items: state
  }
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
    const { items } = this.props
    return (
      <GalleryContainer>
        {this._onRenderCard(items)}
      </GalleryContainer>
    )
  }
}

export default connect(mapStateToProps)(Gallery)
