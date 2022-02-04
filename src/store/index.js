import { createStore } from 'vuex';

const saveToStore = (todos) => {
  localStorage.setItem('test_todos', JSON.stringify(todos));
};

export default createStore({
  state: {
    todos: [],
    todoInput: '',
  },
  getters: {
    getOpenTodos: (state) => state.todos.filter((todo) => todo.done === false),
    getDoneTodos: (state) => state.todos.filter((todo) => todo.done === true),
  },
  mutations: {
    setToDoText(state, { text }) {
      state.todoInput = text;
    },
    addTodo(state) {
      const nextId = state.todos.length > 0 ? state.todos[0].id + 1 : 1;
      const todoObj = {
        id: nextId,
        text: state.todoInput,
        done: false,
      };
      state.todos = [todoObj, ...state.todos];
      state.todoInput = '';
      saveToStore(state.todos);
    },
    removeTodo(state, { id }) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
      saveToStore(state.todos);
    },
    markTodoAsDone(state, { id }) {
      const mutatedTodos = [...state.todos];
      const idx = mutatedTodos.findIndex((todo) => todo.id === id);
      if (idx !== -1) {
        mutatedTodos[idx].done = true;
      }
      state.todos = [...mutatedTodos];
      saveToStore(state.todos);
    },
  },
  actions: {
    loadTodosFromStore: ({ state }) => {
      const todosAsString = localStorage.getItem('test_todos') || null;
      if (todosAsString) {
        state.todos = [...JSON.parse(todosAsString)];
      }
    },
  },
  modules: {
  },
});
