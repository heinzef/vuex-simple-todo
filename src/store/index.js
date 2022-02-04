import { createStore } from 'vuex';

const saveToStore = (todos) => {
  localStorage.setItem('test_todos', JSON.stringify(todos));
};

export default createStore({
  state: {
    todos: [],
    todoInput: '',
    historyState: {},
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
      state.historyState = { ...state };
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
      state.historyState = { ...state };
      state.todos = state.todos.filter((todo) => todo.id !== id);
      saveToStore(state.todos);
    },
    markTodoAsDone(state, { id }) {
      state.historyState = { ...JSON.parse(JSON.stringify(state)) };
      const mutatedTodos = [...state.todos];
      const idx = mutatedTodos.findIndex((todo) => todo.id === id);
      if (idx !== -1) {
        mutatedTodos[idx].done = true;
      }
      state.todos = [...mutatedTodos];
      saveToStore(state.todos);
    },
    undo(state) {
      if (state.historyState && state.historyState.todoInput !== undefined) {
        state.todoInput = state.historyState.todoInput;
        state.todos = [...state.historyState.todos];
        state.historyState = { ...state.historyState.historyState };
        saveToStore(state.todos);
      }
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
