import React , {Component} from 'react'

interface IImagesProps {
  list: Array<object>
}
interface IImagesState {
  list: Array<object>
}

class ImageList extends Component<IImagesProps, IImagesState> {
  constructor(props: IImagesProps) {
    super(props);
    this.state = {
      list: []
    }
  }
  render() {
    return (
      <div>
        <img/>
      </div>
    )
  }
}
