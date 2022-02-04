<template>
  <div>
    <div class="todo-list">
      <h3>Open Todos</h3>
      <ul>
        <li v-for="todo in openTodos" :key="todo.id">
          {{ todo.text }} - <span class="link" @click="removeTodo(todo.id)">Remove</span>
          | <span class="link" @click="markTodoAsDone(todo.id)">Mark as Done</span>
        </li>
      </ul>
    </div>
    <div class="todo-list">
      <h3>Done Todos</h3>
      <ul>
        <li v-for="todo in doneTodos" :key="todo.id">
          {{ todo.text }} - <span class="link" @click="removeTodo(todo.id)">Remove</span>
          | <span class="link" @click="markTodoAsDone(todo.id)">Mark as Done</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Todo',
  props: {
    msg: String,
  },
  setup() {
    const store = useStore();
    store.dispatch('loadTodosFromStore');
    const openTodos = computed(() => store.getters.getOpenTodos);
    const doneTodos = computed(() => store.getters.getDoneTodos);

    const removeTodo = (id) => {
      store.commit('removeTodo', { id });
    };

    const markTodoAsDone = (id) => {
      store.commit('markTodoAsDone', { id });
    };

    return {
      openTodos,
      doneTodos,
      removeTodo,
      markTodoAsDone,
    };
  },
};
</script>

<style scoped lang="scss">

.todo-list {
  margin-bottom: 100px;
}

.link {
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}

</style>
