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
		<div class="tasks__clear button-group">
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
			scene: this.$store.state.scene,
			sceneInner: this.$store.state.scene.children
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
			for (var i = 0; i < this.scene.children.length; i++) {
				if (this.scene.children[i].id == this.parentID) {
					for (var j = 0; j < this.scene.children[i].children.length; j++) {
						if (this.scene.children[i].children[j].completed) {
							this.sceneInner[i].children = this.sceneInner[i].children.filter(this.inProgress)
							this.$store.commit('clearCompleted', { itog: this.sceneInner[i].children, id: this.parentID})
						}
					}
				}
			}
		},
		inProgress(task) {
      	  return !this.isCompleted(task);
      	},
      	isCompleted(task) {
      	  return task.completed;
      	},
		clearAll() {
			this.$store.commit('clearAll', {indexClearAll: this.parentID})			
		},

	}
};	
</script>
<style>
	.smooth-dnd-container.horizontal {
		display: inline-block;
	}
</style>