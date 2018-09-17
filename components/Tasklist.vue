<template>
  <div  id="task-list">

    <Container 
        orientation="horizontal" 
        @drop="onColumnDrop($event)"
        drag-handle-selector=".column-drag-handle"
        @drag-start="dragStart"
      >

    <Draggable class="tasks" v-for="(col, index) in someTasks" :key="col.id">
        <h5>
          <div class="card-column-header">
            <span class="column-drag-handle">&#x2630;</span>
              {{ col.columnName }}
            <transition name="fade">
              <small v-if="incomplete">({{ col.taskBody.length }})</small>
            </transition>
          </div>
        </h5>
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

    </Draggable>
    
      <div class="tasks">
        <div class="tasks__new input-group">
          <input type="text"
          class="input-group-field"
          v-model="newColumn"
          @keyup.enter="addColumn"
          placeholder="Добавить колонку"
          >
          <span class="input-group-button">
            <button 
              @click="addColumn" 
              class="button"
              >
              <i class="fa fa-plus"></i> Add Col
            </button>
          </span>
        </div>
      </div>
  </Container>


    

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
        newColumn: '',
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
      addColumn(){
        if (this.newColumn) {
          this.$store.commit('addColumn', {columnName: this.newColumn})
          this.newColumn = '';
        }
      },
      onDrop: function(dropResult) {
        this.someTasksInner = applyDrag(this.someTasksInner, dropResult);
      },
      inProgress(task) {
        return !this.isCompleted(task);
      },
      isCompleted(task) {
        return task.completed;
      },
      onColumnDrop: function(dropResult) {
        this.someTasks = applyDrag(this.someTasks, dropResult);
      },
      dragStart: function(){
        console.log('drag started');
      },
      log: function(...params){
        console.log(...params);
      }
    }
  };
</script>