<template id="task-item">
  <div>
    <li class="tasks__item">
      <button :class="className"
      @click.self="$emit('complete')"
      >
      {{ task.title }}
    </button>
    <button class="tasks__item__remove button alert pull-right"
    @click="$emit('remove')"
    >
    <i class="fa fa-times"></i>
  </button>
</li>
</div>
</template>
<script>
  export default {
  props: ['task'],
  computed: {
    className() {
      var classes = ['tasks__item__toggle'];
      if (this.task.completed) {
        classes.push('tasks__item__toggle--completed');
      }
      return classes.join(' ');
    }
  }
}
</script>