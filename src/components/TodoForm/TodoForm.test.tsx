import { render, screen } from "@testing-library/react";
import TodoForm from "./TodoForm";
import userEvent from "@testing-library/user-event";

describe("TodoForm", () => {
  const renderComponent = () => {
    const onSubmitMock = jest.fn();
    const user = userEvent.setup();

    render(<TodoForm onSubmit={onSubmitMock} />);

    const todoTitleInput = screen.getByRole("textbox", {
      name: /todo title/i,
    });
    const todoDescriptionInput = screen.getByRole("textbox", {
      name: /todo description/i,
    });

    const button = screen.getByRole("button", { name: /add todo/i });

    return {
      onSubmitMock,
      button,
      todoTitleInput,
      todoDescriptionInput,
      user,
    };
  };

  it("should trigger submit on button click", async () => {
    const { button, user, onSubmitMock } = renderComponent();

    await user.click(button);

    expect(onSubmitMock).toBeCalledTimes(1);
  });

  it("should render form fields", async () => {
    const { todoTitleInput, todoDescriptionInput } = renderComponent();

    expect(todoTitleInput).toBeInTheDocument();
    expect(todoDescriptionInput).toBeInTheDocument();
  });

  it("should populate form fields when changing inputs value", async () => {
    const { user, todoTitleInput, todoDescriptionInput } = renderComponent();
    const item = {
      title: "item title",
      description: "item description",
    };

    await screen.findByRole("form");
    await user.type(todoTitleInput, item.title);
    await user.type(todoDescriptionInput, item.description);

    expect(todoTitleInput).toHaveValue(item.title);
    expect(todoDescriptionInput).toHaveValue(item.description);
  });
});
