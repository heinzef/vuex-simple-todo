<template>
  <button @click="undo">Undo</button>
  <NewTodo />
  <Todo />
</template>

<script>
import { useStore } from 'vuex';

import NewTodo from './components/NewTodo.vue';
import Todo from './components/Todo.vue';

export default {
  name: 'App',
  components: {
    Todo,
    NewTodo,
  },
  setup() {
    const store = useStore();

    const undo = () => {
      store.commit('undo');
    };

    return {
      undo,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
