import React, { Component } from 'react'
import {fetchPoetry} from '../../api'
import styled from "styled-components";

interface IPoetryProps {}

interface IPoetryState {
  content: string
  origin: string
  author: string
}

interface IPoetryPromise extends IPoetryState{
  category: string
}

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
      author: ''
    }
  }
  componentWillMount() {
    fetchPoetry().then(res => {
      const {content, origin, author} = res as IPoetryPromise
      this.setState({
        content, origin, author
      })
    })
  }
  render(): React.ReactElement {
    return (
      <>
        <StyledH3>{this.state.origin}<StyledSpan>{this.state.author && `『${this.state.author}』`}</StyledSpan></StyledH3>
        <p>{this.state.content}</p>
      </>
    );
  }
}

export default Poetry
