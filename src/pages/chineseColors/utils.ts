import {Colors, TupleColor} from '../../type'
import React, {createRef} from 'react'

export const colorsSort = (colorsArr: Array<Colors>) => {
  colorsArr.sort((prev, next) =>{
    if (rgb2hsv(prev.RGB)[0] === rgb2hsv(next.RGB)[0])
      return rgb2hsv(next.RGB)[1] - rgb2hsv(prev.RGB)[1];
    else
      return rgb2hsv(next.RGB)[0] - rgb2hsv(prev.RGB)[0];
  });
  return colorsArr
}

const drawArcAndLine = (cmyk: TupleColor<number, 4>, rgb: TupleColor<number, 3>) => {
  let canvas = React.createElement('canvas'),
    context = canvas.getContext('2d'),
    lineHeight = 278 - 150;

  canvas.width = 50;
  canvas.height = 278;
  cmyk.forEach( (v, i) => {
    let ctx = context,
      endAngle = (-90 + (360 * v/100)) * (Math.PI/180);

    if (v == 0) endAngle = 1.5 * Math.PI;
    context.beginPath();
    context.arc(14,31.3 * (i+1),9,1.5 * Math.PI, endAngle);
    context.lineWidth = 6;
    context.strokeStyle = 'white';
    context.stroke();
  });
  context.lineWidth = 1;
  context.moveTo(18,150);
  context.lineTo(18,150 + lineHeight * (rgb[0]/255))
  context.moveTo(21,150);
  context.lineTo(21,150 + lineHeight * (rgb[1]/255))
  context.moveTo(24,150);
  context.lineTo(24,150 + lineHeight * (rgb[2]/255))
  context.stroke();
  return canvas;
};

const rgb2hsv = (rgb: TupleColor<number, 3>) => {
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
