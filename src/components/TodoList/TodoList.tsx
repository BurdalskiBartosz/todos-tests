import type { Todo } from "../../types";
import TodoItem from "../TodoItem/TodoItem";

type TodoListProps = {
  todos: Todo[];
  handleIsCompletedChange: (todoId: string) => void;
  deleteTodo: (todoId: string) => void;
};

const TodoList = ({
  todos,
  handleIsCompletedChange,
  deleteTodo,
}: TodoListProps) => {
  if (!todos?.length) return <p>There is no todos!</p>;

  return (
    <ul>
      <li>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            handleIsCompletedChange={handleIsCompletedChange}
          />
        ))}
      </li>
    </ul>
  );
};

export default TodoList;
