import type { Todo } from "../types";
import { generateId } from "../utils/generateId";

export const todosMock: Todo[] = [
  {
    id: generateId(),
    userId: generateId(),
    title: "Title 1",
    body: "Description 1",
    isCompleted: false,
  },
  {
    id: generateId(),
    userId: generateId(),
    title: "Title 2",
    body: "Description 2",
    isCompleted: false,
  },
  {
    id: generateId(),
    userId: generateId(),
    title: "Title 3",
    body: "Description 3",
    isCompleted: false,
  },
  {
    id: generateId(),
    userId: generateId(),
    title: "Title 4",
    body: "Description 4",
    isCompleted: false,
  },
];
