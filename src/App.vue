<template>
  <NewTodo />
  <Todo />
</template>

<script>
import NewTodo from './components/NewTodo.vue';
import Todo from './components/Todo.vue';

export default {
  name: 'App',
  components: {
    Todo,
    NewTodo,
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
