/**
 * author iWuzhi
 * date 2021-02-03 20:54:30
 */

import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';

import Item, { IItems } from './Item';

export interface IRef {
  swapTwoItems: (a: number, b: number) => void;
}
type IProps = {
  source: number[];
};

const IW_MAX = 48; // Item width max
const IW_MIN = 24; // Item width min

const TwoDSort: React.ForwardRefRenderFunction<IProps> = (props, ref) => {
  const { source } = props;
  const size = source.length;
  const max = Math.max(...source);

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

  const transition = `transform ${sp / 120}s ease-in-out`;
  const computeItems = (source: number[]) => {
    return source.map((h, i) => ({
      key: i,
      h,
      ref: React.createRef(),
      style: {
        width: iw,
        height: `${(h * 100) / max}%`,
        transform: `translateX(${tx(i)}px)`,
        transition,
      },
    }));
  };

  const swapTwoItems = (a: number, b: number) => {
    const preItems = [...items];
    const [sta, stb] = [preItems[a].style, preItems[b].style];
    const transform = (finish: () => void) => {
      const nextItems = [...preItems];
      nextItems[a].ref.current.style.transition = transition;
      nextItems[b].ref.current.style.transition = transition;

      nextItems[a].ref.current.style.transform = stb.transform;
      nextItems[b].ref.current.style.transform = sta.transform;

      setTimeout(finish, 1000);
    };
    const swapData = () => {
      const nextItems = [...preItems];
      nextItems[a].ref.current.style.transition = 'none';
      nextItems[b].ref.current.style.transition = 'none';
      const tpa = nextItems[a],
        tpb = nextItems[b];
      nextItems[a] = tpb;
      nextItems[a].style = {
        ...stb,
        transform: sta.transform,
      };
      nextItems[b] = tpa;
      nextItems[b].style = {
        ...sta,
        transform: stb.transform,
      };
      setItems(nextItems);
    };
    // Transform first
    transform(swapData);
  };

  useImperativeHandle(ref, () => ({
    swapTwoItems,
  }));

  useEffect(() => {
    setItems(computeItems(source));
  }, [source]);

  return (
    <div className="h-80 pb-4 m-5 border-b border-gray-400 relative" ref={containerRef}>
      {items.map((item, index) => {
        return <Item key={index} {...item} style={{ ...item.style }} />;
      })}
    </div>
  );
};

export default forwardRef<IRef, IProps>(TwoDSort);
