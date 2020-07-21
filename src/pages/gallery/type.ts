export interface IHelloProps {
  message?: string
  count?: number,
  AddImage: (url: string) => void,
  RemoveImage: () => void
}

export interface IHelloState {
  message: string | undefined
  count: number,
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
