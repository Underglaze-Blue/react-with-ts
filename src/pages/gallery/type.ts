export interface IHelloProps {
  message?: string
  imageStore?: Array<string>,
  AddImage: (url: string) => void,
  RemoveImage: () => void
}

export interface IHelloState {
  message: string | undefined
  loading: boolean
}

export interface IImageStore {
  imageStore: Array<string>
}

export interface IGalleryProps {
  onAdd?: () => {}
  onSub?: () => {}
  items: Array<string>
}

export interface IGalleryState {
  items: Array<string>,
  visible: boolean,
  item: string
}
