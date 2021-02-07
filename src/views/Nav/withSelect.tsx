/**
 * author iWuzhi
 * date 2021-02-07 21:02:42
 */

import React, { useState } from 'react';
import { Select, MenuItem } from '@material-ui/core';

import { IProps } from '.';

export interface ISelect {
  select: JSX.Element;
}

const ItemsConfig = [
  {
    key: 'sort',
    name: 'Sort',
  },
];

const withSelect = (NavFC: React.FC<IProps & ISelect>): React.ComponentType<IProps> => {
  const WithSelectNav = (props: IProps) => {
    const [activeKey, setActiveKey] = useState<string>('sort');

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setActiveKey(e.target.value);
    };

    const select = (
      <Select value={activeKey} onChange={onChange}>
        {ItemsConfig.map(({ key, name }) => {
          return (
            <MenuItem key={key} value={key}>
              {name}
            </MenuItem>
          );
        })}
      </Select>
    );
    return <NavFC {...props} select={select} activeKey={activeKey} />;
  };
  return WithSelectNav;
};

export default withSelect;
