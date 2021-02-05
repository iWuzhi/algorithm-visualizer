/**
 * author iWuzhi
 * date 2021-02-03 20:54:30
 */

import React, { forwardRef } from 'react';

interface IItem {
  h: number; // sort number
  color?: string;
  style?: React.CSSProperties;
}
export type IItems = IItem[];

const Item: React.FC<IItem> = ({ h, style }, ref) => {
  return (
    <div
      className="absolute bottom-0 bg-yellow-200 text-green-400 text-center"
      style={style}
      ref={ref}
    >
      {h}
    </div>
  );
};

export default forwardRef(Item);
