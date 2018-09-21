<template>		      
	<!-- <div> -->
		 <!-- <Container >     -->
        <Draggable 
          class="tasks__item" 
          tag="li"
          
        >
			<button 
				:class="!task.completed ? 'tasks__item__toggle' : 'tasks__item__toggle tasks__item__toggle--completed'"
				@click.self="completeTask(task)" >
				{{ task.title }}
			</button>
			<button class="tasks__item__remove button alert pull-right"
				@click="removeTask(index)">
				<i class="fa fa-times"></i>
			</button>
		</Draggable>
<!-- </Container> -->
	<!-- </div> -->
</template>
<script>
import { Container, Draggable } from "vue-smooth-dnd"
import { applyDrag, generateItems } from "./utils"

export default {
	props: ['task', 'index', 'colid'],
	components: {
		Container, 
		Draggable
	},

	data() {
		return {
			// someTasksInner: this.$store.state.columnTasks[2]['taskBody'],
			someTasks: this.$store.state.columnTasks
		};
	},
	computed: {

	},
	created(){
		console.log(this.task)
	},
	methods: {
		// onDrop: function() {
		// 	// this.someTasksInner = applyDrag(this.someTasksInner, dropResult);
		// 	console.log('перенос состоялся')
		// },

		completeTask(tasks) {
			tasks.completed = !tasks.completed;
		},
		removeTask(index) {
			for (var i = 0; i < this.someTasks.length; i++) {
				if (this.someTasks[i].id == this.colid) {
					this.someTasks[i].taskBody.splice(index, 1)
				}
			}
		},
	},
};
</script>