import axios from "axios";
import { config } from "../utils/config";
import type { Todo, TodoFromApi } from "../types";

type TodoServiceGetTodos = {
  status: number;
  todos: Todo[];
};

class TodoService {
  public getTodos = async (): Promise<TodoServiceGetTodos | undefined> => {
    const data = await axios.get<TodoFromApi[]>(config.apiUrl);

    const mappedTodos = this.mapTodos(data?.data);

    return {
      status: data.status,
      todos: mappedTodos ?? [],
    };
  };

  public addTodo = async (todo: Todo): Promise<boolean> => {
    await axios.post(config.apiUrl, { ...todo });
    return true;
  };

  private mapTodos = (todosFromApi: TodoFromApi[]): Todo[] => {
    return todosFromApi.map((todo) => ({
      ...todo,
      isCompleted: false,
    }));
  };
}

const todoService = new TodoService();

export default todoService;
