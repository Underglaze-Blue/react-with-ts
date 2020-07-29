import React, {Component} from 'react'
import Create from './create'
import Gallery from './gallery'

interface IGalleryProps {

}

interface IGalleryState {

}

class IGallery extends Component<IGalleryProps, IGalleryState>{
  render() {
    return (
      <>
        <Create message="Click To Create Gallery"/>
        <Gallery/>
      </>
    )
  }
}

export default IGallery
