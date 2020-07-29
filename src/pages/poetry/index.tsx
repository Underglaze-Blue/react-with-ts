import React, { Component } from 'react'
import {fetchPoetry} from '../../api'
import styled from "styled-components";
import {Button} from 'antd'

import {WithTranslation, withTranslation} from 'react-i18next';
import {RouteComponentProps, withRouter} from "react-router";

interface IPoetryProps extends WithTranslation, RouteComponentProps{}

interface IPoetryCommon {
  content: string
  origin: string
  author: string
}

interface IPoetryState extends IPoetryCommon{
  loading: boolean
}

interface IPoetryPromise extends IPoetryCommon{
  category: string
}

const PoetryMain = styled.main`
  flex: 0 0 30vw;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledH3 = styled.h3`
  color: white;
`

const StyledSpan = styled.span`
  font-size: 14px;
`

class Poetry extends Component<IPoetryProps, IPoetryState> {
  constructor(props:IPoetryProps) {
    super(props);
    this.state  = {
      content: '',
      origin: '',
      author: '',
      loading: false
    }
  }

  // 获取数据
  _fetchPoetry = () => {
    this.props.i18n.changeLanguage(this.props.i18n.language === 'zh-CN' ? 'en' : 'zh-CN')
    this.setState({
      loading: true
    })
    fetchPoetry().then(res => {
      const {content, origin, author} = res as IPoetryPromise
      this.setState({
        content, origin, author
      })
    }).finally(() => {
      this.setState({
        loading: false
      })
    })
  }

  componentWillMount() {
    this._fetchPoetry()
  }

  render(): React.ReactElement {
    const {t, i18n} = this.props
    return (
      <PoetryMain>
        <aside>
          <StyledH3>{this.state.origin}<StyledSpan>{this.state.author && `『${this.state.author}』`}</StyledSpan></StyledH3>
          <p>{this.state.content}</p>
        </aside>
        <Button loading={this.state.loading} onClick={() => {this._fetchPoetry()}} type="primary">
          刷新
        </Button>
        <span>{t('loading')}</span><span>{i18n.language}</span>
      </PoetryMain>
    );
  }
}

export default withRouter(withTranslation()(Poetry))
