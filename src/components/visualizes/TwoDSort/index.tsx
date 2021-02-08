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

const TwoDSort: React.ForwardRefRenderFunction<IRef, IProps> = (props, ref) => {
  /* ---------------------------------- Props ---------------------------------- */
  const { source } = props;

  /* ----------------------------------- Consts ------------------------------- */
  const size = source.length;
  const max = Math.max(...source);

  /* --------------------------- Compute container style --------------------------- */
  const [cw, setCW] = useState(0); // container width
  const containerRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (containerRef.current) {
      setCW(containerRef.current.clientWidth);
    }
  }, [containerRef]);

  /* --------------------------- Compute Item style --------------------------- */
  let iw = cw / size; // item width
  if (iw > IW_MAX) {
    iw = IW_MAX;
  } else if (iw < IW_MIN) {
    iw = IW_MIN;
    // Toast warn because of overflow
  }
  const sp = (cw - iw * size) / (size - 1); // space
  const tx = (i: number) => i * sp + i * iw; // translate-x

  /* ------------------------------- Items state ------------------------------ */
  const [items, setItems] = useState<IItems>([]);
  const computeItems = (source: number[]) => {
    return source.map((h, i) => ({
      key: i,
      h,
      ref: React.createRef<HTMLDivElement>(),
      style: {
        width: iw,
        height: `${(h * 100) / max}%`,
        transform: `translateX(${tx(i)}px)`,
      },
    }));
  };
  useEffect(() => {
    setItems(computeItems(source));
  }, [source]);

  const swapTwoItems = (a: number, b: number) => {
    const preItems = [...items];
    const [sta, stb] = [preItems[a].style, preItems[b].style];

    const transform = (finish: () => void) => {
      const nextItems = [...preItems];

      /* ------------------------------- Transition ------------------------------- */
      const transitionTime = (sp / 120) * Math.abs(b - a);
      const transition = `transform ${transitionTime}s ease-in-out`;
      nextItems[a].ref.current.style.transition = transition;
      nextItems[b].ref.current.style.transition = transition;

      /* -------------------------------- Transform ------------------------------- */
      nextItems[a].ref.current.style.transform = stb.transform;
      nextItems[b].ref.current.style.transform = sta.transform;

      setTimeout(finish, transitionTime * 1000);
    };
    const swapData = () => {
      const nextItems = [...preItems];

      /* ---------------------------- Swicth Real data ---------------------------- */
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

  return (
    <>
      <div className="h-80 pb-4 m-5 border-b border-gray-400 relative" ref={containerRef}>
        {items.map((item, index) => {
          return <Item key={index} {...item} />;
        })}
      </div>
      <aside className="p-6">
        <h4 className="font-bold text-green-400">API</h4>
        <ul className="list-disc p-4">
          <li>
            <h4 className="font-bold text-green-400">
              swapTwoItems: (a: number, b: number) =&gt; void;
            </h4>
            <p className="py-2 text-gray-400">Swap two items with transition.</p>
          </li>
        </ul>
      </aside>
      <aside className="p-6">
        <h4 className="font-bold text-green-400">Description</h4>
        <p className="list-disc p-4 text-gray-400">...</p>
      </aside>
    </>
  );
};

export default forwardRef<IRef, IProps>(TwoDSort);
