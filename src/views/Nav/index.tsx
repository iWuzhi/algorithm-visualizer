/**
 * author iWuzhi
 * date 2021-02-07 21:02:42
 */

import React from 'react';
import { NavLink as Link, Redirect, useRouteMatch } from 'react-router-dom';
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

  const { section: selectdKey } =
    useRouteMatch<{
      category: string;
      section: string;
    }>('/:category/:section')?.params || {};

  const styles = useStyles();

  const subItems = ItemsConfig[activeKey] || [];

  if (!selectdKey) return <Redirect to={`/${activeKey}/insert`} />;

  return (
    <nav className={cx(styles.nav, 'border-r p-3 border-gray-300')}>
      <h4>{select}</h4>
      <MenuList style={{ marginTop: 8 }}>
        {subItems.map(({ key, name }) => {
          return (
            <MenuItem key={key} selected={selectdKey === key}>
              <Link
                to={`/${activeKey}/${key}`}
                className="block w-full"
                activeClassName="text-green-300"
              >
                {name}
              </Link>
            </MenuItem>
          );
        })}
      </MenuList>
    </nav>
  );
};

export default withSelect(Nav);
