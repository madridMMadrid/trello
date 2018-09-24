<template>
      <Container 
        orientation="horizontal" 
        @drop="onColumnDrop($event)"
        drag-handle-selector=".column-drag-handle"
        @drag-start="dragStart"
      >
        <Draggable v-for="(column, index) in scene.children" :key="column.id">
          <div class="card-container">
            <h5>
              <div class="card-column-header">
                <span class="column-drag-handle">&#x2630;</span>
                   {{column.name}}
                <transition name="fade">
                  <small v-if="incomplete">({{ column.children.length }})</small>
                </transition>
                <span class="closed" @click="removeColumn(column.id)">X</span>
              </div>
            </h5>
            <my-input :parentID="column.id" :index="index"></my-input>
            <Container 
              group-name="col"
              @drop="(e) => onCardDrop(column.id, e)"
              @drag-start="(e) => log('drag start', e)"
              @drag-end="(e) => log('drag end', e)"
              :get-child-payload="getCardPayload(column.id)"
              drag-class="card-ghost"
              drop-class="card-ghost-drop"
            >
              <Draggable v-for="(card, index) in column.children" :key="card.id">
                <div class="card">
                  <button 
                    :class="!card.completed ? 'tasks__item__toggle' : 'tasks__item__toggle tasks__item__toggle--completed'"
                    @click.self="completeTask(card, column.id)" >
                    {{ card.data }}
                  </button>
                  <button class="tasks__item__remove button alert pull-right"
                    @click="removeTask(column.id,index)">
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              </Draggable>
            </Container>
          </div>
        </Draggable>
      </Container>
</template>
<script>

  import MyInput from '~/components/MyInput.vue'
  import { Container, Draggable } from "vue-smooth-dnd"
  import { applyDrag, generateItems } from "./utils"


  export default {
    components: { Container, Draggable, MyInput },
    created(){
      
    },
    data() {
      return {
        scene: this.$store.state.scene
      };
    },
    computed: {
      incomplete() {
        return this.scene.children.filter(this.inProgress).length;
      },
    },
    methods: {
      onColumnDrop: function(dropResult) {
        const scene = Object.assign({}, this.scene);
        scene.children = applyDrag(scene.children, dropResult);
        this.scene = scene;
        this.$store.commit('changeColumn', {changeColumn: this.scene})
      },
      onCardDrop: function(columnId, dropResult) {
        console.log(dropResult)
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
          const scene = Object.assign({}, this.scene);

          const column = scene.children.filter(p => p.id === columnId)[0];
          const columnIndex = scene.children.indexOf(column);

          const newColumn = Object.assign({}, column);
          newColumn.children = applyDrag(newColumn.children, dropResult);
          scene.children.splice(columnIndex, 1, newColumn);

          this.scene = scene;
          this.$store.commit('onCardDrop', {onCardDrop: this.scene})
        }
      },
      getCardPayload: function(columnId) {
        return index => {
          return this.scene.children.filter(p => p.id === columnId)[0].children[
            index
          ];
        };
      },
      removeColumn(id){
        this.$store.commit('removeColumn', {id: id})
      },
      dragStart: function(){
        console.log('drag started');
      },
      log: function(...params){
        console.log(...params);
      },
      inProgress(task) {
        return !this.isCompleted(task);
      },
      isCompleted(task) {
        return task.completed;
      },
      completeTask(tasks, id) {
        tasks.completed = !tasks.completed;
      },
      removeTask(idColumn, index) {
        this.$store.commit('removeTask', {idColumn: idColumn, idTask: index})
      },
    },
  };
</script>