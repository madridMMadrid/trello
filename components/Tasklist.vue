<template>
  <div  id="task-list">


    <div class="tasks" v-for="(col, index) in someTasks" :key="col.id">
      <!-- <Draggable> -->
        <h1>
          {{ col.columnName }}
          <transition name="fade">
            <small v-if="incomplete">({{ col.taskBody.length }} - {{ col.id }})</small>
          </transition>
        </h1>
        <my-input :parentID="col.id" :index="index"></my-input>
          <hr>

<Container >    
            <task-item 
              v-for="(task, index) in col.taskBody"  
              :key="index"
              :task="task"
              :index="index"
              :colid="col.id"
            ></task-item>

</Container>
      <!-- </Draggable> -->
    </div>
  </div>
</template>
<script>
  import TaskItem from '~/components/TaskItem.vue'
  import MyInput from '~/components/MyInput.vue'
  import { Container, Draggable } from "vue-smooth-dnd"
  import { applyDrag, generateItems } from "./utils"

  export default {
    components: {
      TaskItem,
      MyInput,
      Container, 
      Draggable
    },
    created(){
    },
    data() {
      return {
        className: '',
        someTasksInner: this.$store.state.columnTasks[2]['taskBody'],
        someTasks: this.$store.state.columnTasks
      };
    },
    computed: {
      incomplete() {
        return this.someTasksInner.filter(this.inProgress).length;
      },
    },
    methods: {
      onDrop: function(dropResult) {
        this.someTasksInner = applyDrag(this.someTasksInner, dropResult);
      },
      inProgress(task) {
        return !this.isCompleted(task);
      },
      isCompleted(task) {
        return task.completed;
      }
    }
  };
</script>