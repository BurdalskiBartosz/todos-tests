import { FormEvent } from "react";
import type { Todo } from "../../types";
import { generateId } from "../../utils/generateId";

type TodoFormProps = {
  onSubmit: (todo: Todo) => void;
};

const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);

    const newTodo = {
      id: generateId(),
      userId: generateId(),
      title: formData.get("title") as string,
      body: formData.get("body") as string,
      isCompleted: false,
    };

    onSubmit(newTodo);
  };

  return (
    <div className="w-full max-w-xs">
      <form
        aria-label="form"
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Todo Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            placeholder="Todo Title"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="body"
          >
            Todo Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="body"
            name="body"
            placeholder="Todo Description"
          ></textarea>
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
