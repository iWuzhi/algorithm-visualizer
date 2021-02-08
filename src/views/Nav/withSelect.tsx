/**
 * author iWuzhi
 * date 2021-02-07 21:02:42
 */

import React from 'react';
import { NavLink as Link, useRouteMatch, Redirect } from 'react-router-dom';
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

const withSelect = (NavFC: React.FC<IProps & ISelect>): React.FC<unknown> => {
  const WithSelectNav = (props: unknown) => {
    const { category: activeKey } =
      useRouteMatch<{
        category: string;
      }>('/:category')?.params || {};

    if (!activeKey) return <Redirect to="/sort" />;
    const select = (
      <Select value={activeKey}>
        {ItemsConfig.map(({ key, name }) => {
          return (
            <MenuItem key={key} value={key}>
              <Link to={`/${key}`}>{name}</Link>
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
