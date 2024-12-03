import { render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";
import { Todo } from "../../types";

describe("TodoItem", () => {
  const renderComponent = (todo: Todo) => {
    const mockFn = jest.fn();
    render(
      <TodoItem
        todo={todo}
        handleIsCompletedChange={mockFn}
        deleteTodo={mockFn}
      />
    );
  };

  it('should render "Not done" when isCompleted is true', () => {
    const todo = {
      id: "1",
      userId: "1",
      title: "Title 1",
      body: "Description 1",
      isCompleted: true,
    };

    renderComponent(todo);

    expect(screen.getByText("Not Done")).toBeInTheDocument();
  });

  it('should render "Done" when isCompleted is false', () => {
    const todo = {
      id: "1",
      userId: "1",
      title: "Title 1",
      body: "Description 1",
      isCompleted: false,
    };

    renderComponent(todo);

    expect(screen.getByText("Done")).toBeInTheDocument();
  });
});
