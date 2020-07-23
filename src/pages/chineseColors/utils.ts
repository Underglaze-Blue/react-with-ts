import {Colors, TupleColor} from '../../type'

export const colorsSort = (colorsArr: Array<Colors>) => {
  colorsArr.sort((prev, next) =>{
    if (rgb2hsv(prev.RGB)[0] === rgb2hsv(next.RGB)[0])
      return rgb2hsv(next.RGB)[1] - rgb2hsv(prev.RGB)[1];
    else
      return rgb2hsv(next.RGB)[0] - rgb2hsv(prev.RGB)[0];
  });
  return colorsArr
}

export const rgb2hsv = (rgb: TupleColor<number, 3>) => {
  let [r, g, b] = rgb
  r = r / 255;
  g = g / 255;
  b = b / 255;

  let h = 0, s, v;
  let min = Math.min(r, g, b);
  let max = v = Math.max(r, g, b);
  let difference = max - min;

  if (max === min) {
    h = 0;
  } else {
    switch(max){
      case r: h = (g - b) / difference + ( g < b ? 6 : 0 ); break;
      case g: h = 2.0 + (b - r) / difference; break;
      case b: h = 4.0 + (r - g) / difference; break;
    }
    h = Math.round(h * 60);
  }

  if (max === 0) {
    s = 0;
  } else {
    s = 1 - min / max;
  }

  s = Math.round(s * 100);
  v = Math.round(v * 100);

  return [h, s, v];
}
