<template>
  <div>
    <label for="">ToDo:</label>
    <input type="text" v-model="inputValue" @keypress.enter="addTodo" />
    <button @click="addTodo">Add</button>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'NewTodo',
  setup() {
    const store = useStore();
    const inputValue = computed({
      get: () => store.state.todoInput,
      set: (value) => store.commit('setToDoText', { text: value }),
    });

    const addTodo = () => {
      store.commit('addTodo');
    };

    return {
      inputValue,
      addTodo,
    };
  },
};
</script>

<style>

</style>
