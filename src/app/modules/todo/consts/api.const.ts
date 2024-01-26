export const CApiResources = {
  TodoEndpoint: {
    createPost: '/todos',
    getAllTodos: '/todos',
    updateTodo: (id: number | string) => `/todos/${id}`,
    removeTodo: (id: number | string) => `/todos/${id}`,
  },
};
