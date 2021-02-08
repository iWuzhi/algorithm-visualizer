/**
 * author iWuzhi
 * date 2021-02-06 09:32:26
 */

import React from 'react';
import { NavLink as Link, useParams } from 'react-router-dom';
import { Button } from 'gk-rc';

interface IProps {
  actions: any[];
}

const Toolbar: React.FC<IProps> = ({ actions }) => {
  const { category, section } = useParams<{
    category: string;
    section: string;
  }>();
  return (
    <div className="flex border-b p-3 border-gray-300">
      <h3 className="flex-grow flex items-center font-serif italic font-semibold tracking-wide">
        <Link to={`/${category}`} activeClassName="text-green-300 text-2xl">
          {category}
        </Link>
        <span className="px-2 text-gray-400">/</span>
        <span className="text-sm text-gray-500 self-end pb-1">{section}</span>
      </h3>
      <div>
        {actions.map((action, index) => {
          return (
            <Button
              key={index}
              variant="outlined"
              color={action.type}
              onClick={action.onClick}
              style={{ marginLeft: 24 }}
            >
              {action.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Toolbar;
