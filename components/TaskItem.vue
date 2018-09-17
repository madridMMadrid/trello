<template>		        
	<Draggable class="tasks__item" tag="li" >
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
			someTasksInner: this.$store.state.columnTasks[2]['taskBody'],
			someTasks: this.$store.state.columnTasks
		};
	},
	computed: {
		className() {
			var classes = ['tasks__item__toggle'];
			if (this.completeTask) {
				classes.push('tasks__item__toggle--completed');
			}
			return classes.join(' ');
		},
	},
	created(){
	},
	methods: {
		onDrop: function(dropResult) {
			this.someTasksInner = applyDrag(this.someTasksInner, dropResult);
		},

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
	}
};
</script>