export type Todo = {
  userId: string;
  id: string;
  title: string;
  body: string;
  isCompleted: boolean;
};

export type TodoFromApi = {
  userId: string;
  id: string;
  title: string;
  body: string;
};
