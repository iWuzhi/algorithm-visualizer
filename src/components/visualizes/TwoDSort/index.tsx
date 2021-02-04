/**
 * author iWuzhi
 * date 2021-02-03 20:54:30
 */

import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';

import Item, { IItems } from './Item';

export interface IRef {
  swapTwoItems: (a: number, b: number) => void;
}
type IProps = unknown;

const sortData = [3, 2, 1, 10, 4];

const IW_MAX = 48; // Item width max
const IW_MIN = 24; // Item width min

const TwoDSort: React.ForwardRefRenderFunction<IProps> = (props, ref) => {
  const size = sortData.length;
  const max = Math.max(...sortData);

  /* --------------------------- Compute item style --------------------------- */
  const [cw, setCW] = useState(0); // container width
  let iw = cw / size; // item width
  if (iw > IW_MAX) {
    iw = IW_MAX;
  } else if (iw > IW_MIN) {
    // Toast warning...
  } else {
    // Toast warning...
  }
  const sp = (cw - iw * size) / (size - 1); // space
  const tx = (i: number) => i * sp + i * iw; // translate-x
  const [items, setItems] = useState<IItems>([]);

  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (containerRef.current) {
      setCW(containerRef.current.clientWidth);
    }
  }, [containerRef]);

  const computeItems = (source: number[]) => {
    return source.map((h, i) => ({
      key: i,
      h,
      style: {
        width: iw,
        height: `${(h * 100) / max}%`,
        transform: `translateX(${tx(i)}px)`,
        transition: `transform ${sp / 120}s ease-in-out`,
      },
    }));
  };

  const swapTwoItems = (a: number, b: number) => {
    const nextItems = [...items];
    const temp = nextItems[a].style.transform;
    nextItems[a].style = {
      ...nextItems[a].style,
      transform: nextItems[b].style.transform,
    };
    nextItems[b].style = {
      ...nextItems[b].style,
      transform: temp,
    };
    setItems(nextItems);
  };

  useImperativeHandle(ref, () => ({
    swapTwoItems,
  }));

  useEffect(() => {
    setItems(computeItems(sortData));
  }, [cw]);

  return (
    <div className="h-80 pb-4 m-5 border-b border-gray-400 relative" ref={containerRef}>
      {items.map((item, index) => {
        return <Item key={index} {...item} />;
      })}
    </div>
  );
};

export default forwardRef<IRef, IProps>(TwoDSort);
