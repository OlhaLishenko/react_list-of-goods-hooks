import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

enum SortType {
  'Sort alphabetically' = 'Sort alphabetically',
  'Sort by length' = 'Sort by length',
  'Reverse' = 'Reverse',
  'Reset' = 'Reset',
}

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const namesOfButtons: (keyof typeof SortType)[] =
  Object.values(SortType);

export const typesOfButtons = [
  'is-info',
  'is-success',
  'is-warning',
  'is-danger',
];

type GoodListProps = {
  visibleGoods: string[];
};

export const GoodList: React.FC<GoodListProps> = ({ visibleGoods }) => {
  return (
    <ul>
      {visibleGoods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};

function getPreparedGoods(
  goods: string[],
  sortField: keyof typeof SortType | '',
) {
  const updatedList: string[] = [...goods];

  if (sortField) {
    switch (sortField) {
      case 'Sort alphabetically':
        return updatedList.sort((a, b) => a.localeCompare(b));
      case 'Sort by length':
        return updatedList.sort((a, b) => a.length - b.length);
      case 'Reverse':
        return updatedList.reverse();
      default:
        return updatedList;
    }
  }

  return updatedList;
}

type ButtonsProps = {
  sortField: keyof typeof SortType | '';
  setSortField: React.Dispatch<
    React.SetStateAction<keyof typeof SortType | ''>
  >;
};

export const Buttons: React.FC<ButtonsProps> = ({
  sortField,
  setSortField,
}) => {
  return (
    <div className="buttons">
      {namesOfButtons.map((nameOfButton, index) => (
        <button
          type="button"
          key={nameOfButton}
          onClick={() => setSortField(nameOfButton)}
          className={classNames('button', `${typesOfButtons[index]}`, {
            'is-light': sortField !== nameOfButton,
          })}
        >
          {nameOfButton}
        </button>
      ))}
    </div>
  );
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<keyof typeof SortType | ''>('');

  const visibleGoods: string[] = getPreparedGoods(goodsFromServer, sortField);

  return (
    <div className="section content">
      <Buttons sortField={sortField} setSortField={setSortField} />

      <GoodList visibleGoods={visibleGoods} />
    </div>
  );
};
