import { useCallback, useEffect, useState } from "react";
import type { Todo } from "../../types";
import TodoList from "../TodoList/TodoList";
import TodoForm from "../TodoForm/TodoForm";
import todoService from "../../service/TodoService";
import Loader from "../Loader/Loader";

const Todos = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const getTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await todoService.getTodos();
      setTodos(data?.todos ?? []);
    } catch (e) {
      setIsLoading(false);
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const onSubmitForm = async (todo: Todo) => {
    setTodos([todo, ...todos]);
    await todoService.addTodo(todo);
  };

  const handleIsCompletedChange = (todoId: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (todoId: string) => {
    const newList = todos.filter((todo) => todo.id !== todoId);
    setTodos(newList);
  };

  return (
    <div className="container">
      {error && <p>Smotehing went wrong: {error}</p>}
      <TodoForm onSubmit={onSubmitForm} />
      {isLoading ? (
        <Loader />
      ) : (
        <TodoList
          handleIsCompletedChange={handleIsCompletedChange}
          deleteTodo={deleteTodo}
          todos={todos}
        />
      )}
    </div>
  );
};

export default Todos;
