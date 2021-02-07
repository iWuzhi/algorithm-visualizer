/**
 * author iWuzhi
 * date 2021-02-07 21:02:42
 */

import React, { useState } from 'react';
import cx from 'classnames';
import { MenuItem, MenuList } from '@material-ui/core';

import withSelect, { ISelect } from './withSelect';

import { useStyles } from './style';

interface IItem {
  key: string;
  name: string;
}
export interface IProps {
  activeKey: string;
  items: IItem[];
}

const ItemsConfig: { [key: string]: unknown[] } = {
  sort: [
    {
      key: 'insert',
      name: 'Insert',
    },
    {
      key: 'merge',
      name: 'Merge',
    },
  ],
};
const Nav: React.FC<IProps & ISelect> = (props) => {
  const { select, activeKey } = props;

  const [selectdKey, setSelecteddKey] = useState<string>('insert');

  const styles = useStyles();

  const subItems = ItemsConfig[activeKey] || [];

  const onItemClick = (e: React.MouseEvent<HTMLElement>, key: string) => {
    e.preventDefault();
    setSelecteddKey(key);
  };

  return (
    <nav className={cx(styles.nav, 'border-r p-3 border-gray-300')}>
      <h4>{select}</h4>
      <MenuList style={{ marginTop: 8 }}>
        {subItems.map(({ key, name }) => {
          return (
            <MenuItem key={key} selected={selectdKey === key} onClick={(e) => onItemClick(e, key)}>
              {name}
            </MenuItem>
          );
        })}
      </MenuList>
    </nav>
  );
};

export default withSelect(Nav);
