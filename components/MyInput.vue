<template>
	<div>
		<div class="tasks__new input-group">
			<input type="text"
			class="input-group-field"
			v-model="myInput"
			@keyup.enter="addTask"
			placeholder="Добавить таск"
			>
			<span class="input-group-button">
				<button @click="addTask" 
					class="button"
					>
					<i class="fa fa-plus"></i> Add
				</button>
			</span>
		</div>
		<div class="tasks__clear button-group pull-right">
			<button class="button warning small"
				@click="clearCompleted"
				>
				<i class="fa fa-check"></i> Clear Completed
			</button>
			<button class="button alert small"
				@click="clearAll"
				>
				<i class="fa fa-trash"></i> Clear All
			</button>
		</div>
	</div>
</template>
<script>
export default {
	props: ['parentID', 'index'],
	data() {
		return {
			myInput: '',
			someTasksInner: this.$store.state.columnTasks[2]['taskBody'],
			someTasks: this.$store.state.columnTasks
		}
	},

	methods: {
		addTask(){
			if (this.myInput) {
				this.$store.commit('addTask', {currentID: this.parentID, title: this.myInput, completed: false})
				this.myInput = '';
			}
		},
		clearCompleted(index) {
			this.someTasksInner = this.someTasksInner.filter(this.inProgress);
			for (var i = 0; i < this.someTasks.length; i++) {
				if (this.someTasks[i].id == this.parentID) {
					for (var j = 0; j < this.someTasks[i].taskBody.length; j++) {
						if (this.someTasks[i].taskBody[j].completed) {
							this.someTasks[i].taskBody = this.someTasks[i].taskBody.filter(this.inProgress)
						}
					}
				}
			}
		},
		clearAll(index) {
			for (var i = 0; i < this.someTasks.length; i++) {
				if (this.someTasks[i].id == this.parentID) {
					this.someTasks[i].taskBody.splice(index)
				}
			}
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