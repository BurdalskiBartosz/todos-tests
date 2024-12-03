import { act, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Todos from "./Todos";
import userEvent from "@testing-library/user-event";
import { Todo } from "../../types";
import { todosMock } from "../../mocks";

jest.mock("axios");

describe("Todos", () => {
  const renderComponent = (todos: Todo[]) => {
    const user = userEvent.setup();

    jest.spyOn(axios, "get").mockResolvedValue({
      data: todos,
    });

    render(<Todos />);

    const todoTitleInput = screen.getByRole("textbox", {
      name: /todo title/i,
    });
    const todoDescriptionInput = screen.getByRole("textbox", {
      name: /todo description/i,
    });

    return {
      user,
      todoTitleInput,
      todoDescriptionInput,
    };
  };

  it("should render list of todos", async () => {
    renderComponent(todosMock);

    await waitFor(() => {
      todosMock.forEach((todo) => {
        expect(screen.getByText(todo.body)).toBeInTheDocument();
      });
    });
  });

  it("should correclty delete todo", async () => {
    const { user } = renderComponent([todosMock[0]]);

    await waitFor(() => {
      const todo = screen.getByText("Title 1");
      expect(todo).toBeInTheDocument();
    });

    const button = screen.getByRole("button", {
      name: /remove/i,
    });

    await user.click(button);
    await waitFor(() => {
      const todo = screen.queryByText("Title 1");
      expect(todo).not.toBeInTheDocument();
    });
  });

  it("should correctly complete todo", async () => {
    const { user } = renderComponent([todosMock[0]]);

    await waitFor(() => {
      const doneBtn = screen.getByText("Done");
      expect(doneBtn).toBeInTheDocument();
    });

    const button = screen.getByRole("button", {
      name: /done/i,
    });

    await user.click(button);
    await waitFor(() => {
      expect(screen.getByText("Not Done")).toBeInTheDocument();
    });
  });

  it("should correctly add new todo to list", async () => {
    const { user, todoTitleInput, todoDescriptionInput } = renderComponent([]);

    const newTodo = {
      title: "Lorem ipsum title",
      description: "Lorem ipsum description",
    };

    const submitButton = screen.getByRole("button");

    await screen.findByRole("form");
    await user.type(todoTitleInput, newTodo.title);
    await user.type(todoDescriptionInput, newTodo.description);

    expect(todoTitleInput).toHaveValue(newTodo.title);
    expect(todoDescriptionInput).toHaveValue(newTodo.description);

    await user.click(submitButton);

    expect(screen.getByText(newTodo.title)).toBeInTheDocument();
    expect(screen.getByText(newTodo.description)).toBeInTheDocument();
  });

  it("should show loading when data is fetching and hide when it's done", async () => {
    const { rerender } = render(<Todos />);

    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();

    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: [],
    });

    rerender(<Todos />);

    await waitFor(() => {
      expect(screen.queryByText(/loading\.\.\./i)).not.toBeInTheDocument();
    });
  });

  it("should show error message when error occur", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Network error"));
    const { rerender } = render(<Todos />);

    rerender(<Todos />);

    await waitFor(() => {
      expect(
        screen.getByText(/smotehing went wrong: network error/i)
      ).toBeInTheDocument();
    });
  });
});
