/**
 * author iWuzhi
 * date 2021-02-06 09:32:26
 */

import React from 'react';
import { Button } from 'gk-rc';

interface IProps {
  actions: any[];
}

const Toolbar: React.FC<IProps> = ({ actions }) => {
  return (
    <div className="flex border-b p-3 border-gray-300">
      <h3 className="flex-grow flex items-center text-green-300 font-serif italic font-semibold tracking-wide">
        Sort / Inset Sort
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
