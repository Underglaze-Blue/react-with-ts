import React , {Component} from 'react'

interface IImagesProps {
  list?: Array<string>
}
interface IImagesState {
  list: Array<string>
}

class ImageList extends Component<IImagesProps, IImagesState> {
  constructor(props: IImagesProps) {
    super(props);
    this.state = {
      list: (this.props as IImagesState).list
    }
  }
  static defaultProps = {
    list: []
  }
  renderImg(item: string) {
    // https://api.ixiaowai.cn/api/api.php
    // https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302
    return <li key={item}><img alt="img" src="https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302" /></li>
  }
  render() {
    return (
      <ul>
        {this.state.list.map(item => {return this.renderImg(item)})}
      </ul>
    )
  }
}

export default ImageList
