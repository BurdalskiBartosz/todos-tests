import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";

describe("TodoList", () => {
  it("should render info paragraph when empty arrary", () => {
    const mockFn = jest.fn();
    render(
      <TodoList
        todos={[]}
        handleIsCompletedChange={mockFn}
        deleteTodo={mockFn}
      />
    );

    expect(screen.getByText(/There is no todos/i)).toBeInTheDocument();
  });

  it("should render list of todos", () => {
    const todos = [
      {
        id: "1",
        userId: "1",
        title: "Title 1",
        body: "Description 1",
        isCompleted: false,
      },
      {
        id: "2",
        userId: "2",
        title: "Title 2",
        body: "Description 2",
        isCompleted: false,
      },
    ];

    const mockFn = jest.fn();
    render(
      <TodoList
        todos={todos}
        handleIsCompletedChange={mockFn}
        deleteTodo={mockFn}
      />
    );

    todos.forEach((todo) => {
      expect(screen.getByText(todo.title)).toBeInTheDocument();
    });
  });
});
