export type TupleColor<T, TLength> = [T, ...T[]] & { length: TLength }

export interface Colors {
  CMYK: TupleColor<number, 4>
  RGB: TupleColor<number, 3>
  hex: string
  name: string
  pinyin: string
}

export interface ColorInfoType extends Colors{
  gray: number
}
