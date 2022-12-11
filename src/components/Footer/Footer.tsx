import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { ComplitedStatus } from '../../types/ComplitedStatus';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setFilteredTodos: (todos: Todo[]) => void;
  remove: (id: number[]) => void;
};

export const Footer = React.memo<Props>(({
  todos,
  setFilteredTodos,
  remove,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(ComplitedStatus.ALL);

  const filterByCompleteStatus = useMemo(() => {
    return [...todos].filter(todo => {
      switch (selectedStatus) {
        case ComplitedStatus.ACTIVE:
          return !todo.completed;
        case ComplitedStatus.COMPLITED:
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [selectedStatus, todos]);

  useEffect(() => {
    setFilteredTodos(filterByCompleteStatus);
  }, [filterByCompleteStatus]);

  const completedTodos = useMemo(() => {
    return [...todos].filter(todo => todo.completed === true);
  }, [todos]);

  const notCompletedTodos = todos.length - completedTodos.length;

  const handleClick = () => {
    const ids = [...completedTodos].map(todo => todo.id);

    remove(ids);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: selectedStatus === ComplitedStatus.ALL },
          )}
          onClick={() => setSelectedStatus(ComplitedStatus.ALL)}
        >
          {ComplitedStatus.ALL}
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: selectedStatus === ComplitedStatus.ACTIVE },
          )}
          onClick={() => setSelectedStatus(ComplitedStatus.ACTIVE)}
        >
          {ComplitedStatus.ACTIVE}
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: selectedStatus === ComplitedStatus.COMPLITED },
          )}
          onClick={() => setSelectedStatus(ComplitedStatus.COMPLITED)}
        >
          {ComplitedStatus.COMPLITED}
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { 'notification hidden': !completedTodos.length },
        )}
        onClick={handleClick}
      >
        Clear completed
      </button>
    </footer>
  );
});
