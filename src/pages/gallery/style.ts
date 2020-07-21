import styled from 'styled-components'
import {Button, Card} from "antd";

export const GalleryContainer = styled.div`
  display: flex;
  width: 95vw;
  flex-wrap: wrap;
`
export const StyledCard = styled(Card)`
  width: 240px;
  margin: 12px;
  .ant-card-body {
    padding: 10px 8px;
    display: flex;
    flex-direction: column;
  }
`
export const Image = styled.img`
  width: calc(240px - 24px);
  height: calc(180px - 24px);
  object-fit: contain
`

export const ShowImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export const StyledSpan = styled.span`
  width: 100%;
  text-align: center;
  display: inline-block;
`

export const StyledButton = styled(Button)`
  margin: 0 16px;
  width: 54px;
  .anticon, 
  .anticon-loading, 
  .ant-btn-loading-icon{
    padding-right: 0!important;
  }
`

