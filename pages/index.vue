<template>
  <section class="container_wrap">
  	<div :class="navButtonClass" @click="toggleNav()">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
  	<div :class="navigatorClass"  class="navigator"></div>
  	<div class="content">
  		<div class="header"></div>
  		<div class="demo">
  			<div class="card-scene">
  				<div class="d-flex">
	  				<task-list></task-list>  		 
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
  				</div>
  			</div>
  		</div>
  	</div>
  </section>
</template>

<script>

  import TaskList from '~/components/TaskList';


  export default {
	name: "Cards",
	components: {
	  TaskList,
	},
	data() {
	  return {
      newColumn: '',
  		isNavOpen: false,
	  }
	},
	created() {
    
	},
	methods: {
		toggleNav: function() {
    	this.isNavOpen = !this.isNavOpen;
    },
    addColumn(){
      if (this.newColumn) {
        this.$store.commit('addColumn', {columnName: this.newColumn})
      }
      this.newColumn = '';
      // console.log(JSON.parse(localStorage.getItem("authToken", "children")))
    },


  	getCardPayload: function(columnId) {
  		return index => {
  		  return this.scene.children.filter(p => p.id === columnId)[0].children[
  		  index
  		  ];
  		};
	  },
	},
	computed: {
	    navButtonClass: function() {
	      return `nav-button${this.isNavOpen ? " open" : " closed"}`;
	    },
	    navigatorClass: function() {
	      return `navigator${this.isNavOpen ? " open" : " closed"}`;
	    },
	    headerClass: function() {
	      return `header${this.isNavOpen ? " open" : " closed"}`;
	    }
  },
  };
</script>

<style>
body {
  background-color: #abc;
}
*,
h1,
button {
  font-family: 'Nunito', sans-serif;
}
span.closed {
  float: right;
}
span.closed:hover {
  cursor: pointer;
}
.d-flex {
  display: flex;
}
.container_wrap {
	display: flex;
	width: 100%;
	height: 100%;
	/*position: fixed;*/
}
#task-list {
/*	display: flex;
	-ms-align-items: start;
	align-items: start;*/
	display: inline-block;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.tasks {
  display: inline-block;
  vertical-align: top;
  height: 100%;
  max-width: 300px;
  padding: 1em;
  margin: 5px;
  overflow: auto;
  background-color: #fff;
  box-shadow: 0px 0.25rem 1rem rgba(0,0,0,0.25);
}
.tasks__list {
  clear: both;
}
.tasks__item {
  margin-bottom: 0.5em;
  position: relative;
}
.tasks__item__toggle {
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 0.85em 2.25em 0.85em 1em;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,0.1);
}
.tasks__item__toggle:hover {
  background-color: rgba(0,0,0,0.1);
  border-color: rgba(0,0,0,0.15);
}
.tasks__item__toggle--completed {
  text-decoration: line-through;
  background-color: rgba(0,128,0,0.15);
  border-color: rgba(0,128,0,0.2);
}
.tasks__item__toggle--completed:hover {
  background-color: rgba(0,128,0,0.25);
  border-color: rgba(0,128,0,0.3);
}
.tasks__item__remove {
  position: absolute;
  height: 100%;
  top: 50%;
  right: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  margin: 0;
}
.tasks__item__remove i {
  vertical-align: middle;
}
.tasks__item__edit {
    position: absolute;
    height: 100%;
    width: 40px;
    top: 50%;
    right: 44px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    margin: 0;
}
.tasks__item__edit i {
  vertical-align: middle;
}
.nav-button{
  display: block;
  position: fixed;
  left: 10px;
  top: 20px;
  z-index: 3;
  width: 30px;
  height: 30px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .3s ease-in-out;
  -moz-transition: .3s ease-in-out;
  -o-transition: .3s ease-in-out;
  transition: .3s ease-in-out;
  cursor: pointer;
}

.nav-button.open{
  left: 310px;
}
.nav-button.open span{
  background: #ccc;
}

.nav-button span{
  display: block;
  position: absolute;
  height: 4px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

/* Icon 3 */

.nav-button  span:nth-child(1) {
  top: 0px;
}

.nav-button  span:nth-child(2),.nav-button  span:nth-child(3) {
  top: 8px;
}

.nav-button  span:nth-child(4) {
  top: 16px;
}

.nav-button.open span:nth-child(1) {
  top: 18px;
  width: 0%;
  left: 50%;
}

.nav-button.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.nav-button.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.nav-button.open span:nth-child(4) {
  top: 8px;
  width: 0%;
  left: 50%;
}

.navigator{
  width: 350px;
  flex-shrink: 0;
  box-shadow: 0px 2px 5px #ccc;
  background-color: white;
  z-index: 1;
  transition: width .3s ease-in-out;
  overflow: hidden;
}

.navigator.closed{
  width: 0;
}

.navigator-content{
  padding-top: 0px;
  width: 350px;
  height: 100%;
  overflow-y: auto;
}

.navigator-header h3{
  padding-left: 10px;
}

.divider{
  height: 1px;
  border-bottom: 1px solid #ddd;
  margin-top: -2px;
}

.menu-section h4{
  color: #444;
  padding-left: 10px;
}

.menu-section ul{
  color: #666;
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-section li{
  font-size: 14px;
  margin: 0;
  padding: 10px;
  padding-left: 30px;
  cursor: pointer;
  margin-bottom: 5px;
}

.menu-section li:hover{
  background-color: ghostwhite;
}

.menu-section li.selected{
  background-color: ghostwhite;  
}

.content{
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  background-color: #f8f9fa;
  min-width: 0;
}

.demo {
  flex: 1;
  overflow: auto;
  min-width: 0;
}

.header{
  height: 60px;
  background-color: #41b883;
  box-shadow: 2px 0px 4px #ccc;
  z-index: 0;
  color: white;
  font-size: 20px;
  padding: 0 50px;
  vertical-align: middle;
  line-height: 60px;
}

.header.open{
  padding: 0 20px;
}

@media (max-width: 700px) {
  .navigator {
	position: fixed;
	height: 100%;
	left: 0;
	top: 0;
	bottom: 0;
  }
  
  .nav-button {
	display: block;
  }
}

.demo-panel{
  flex:1;
  overflow-x: auto;
  background-color: #f8f9fa;
}

.nav-panel{
  flex-shrink: 0;
  width: 300px;
}

.demo-navigator{
  list-style: none;
  box-sizing: border-box;
  position: fixed;
  width: 300px;
  bottom: 0px;
  top: 0px;
  left: 0px;
  padding: 0px;
  margin: 0;
  box-shadow: 1px 0px 5px #ccc;
  z-index: 1;  
}

.demo-navigator li{
  height: 50px;
  display: block;
}

.demo-header {
  height: 50px;
  background-color: #eee;
}

.source-code{  
  float: right;
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
  cursor: pointer;
}

.source-code img{
  width: 30px;
  height: 30px;
  vertical-align: middle;
}

.source-code span{
  font-size: 14px;
  color: #eee;
  margin-left: 10px;
  vertical-align: middle;
}

.demo-navigator button {
  border: 1px solid #348;
  text-align: center;
  height: 100%;
  width : 100%;
  display: block;
  background-color: rgb(64, 105, 182);
  cursor: pointer;
  outline: 0;
  color: white;
  border-top: 1px solid rgb(116, 137, 223);
  border-bottom: 1px solid rgb(43, 76, 185);
  transition: all .2s ease;
  font-size: 16px;
}

.demo-navigator button:hover {
  background-color: rgb(47, 94, 182);
}


.simple-page{
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  /*margin-top: 50px;
  margin-bottom: 50px;*/
}

.simple-page-scroller{
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  overflow-y: auto;
  height: 80vh;
}

.draggable-item{
  height: 50px;
  line-height: 50px;
  text-align: center;
  width : 100%;
  display: block;
  background-color: #fff;
  outline: 0;
  border: 1px solid rgba(0,0,0,.125);
  margin-bottom: 2px;
  margin-top: 2px;
}

.draggable-item-horizontal{
	height: 300px;
	padding: 10px;
	line-height: 100px;
	text-align: center;
	/* width : 200px; */
	display: block;
	background-color: #fff;
	outline: 0;
	border: 1px solid rgba(0,0,0,.125);
	margin-right: 4px;
}

.form-demo{
  width: 650px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  display: flex
}

.form{
  flex: 3;
  /* width: 500px; */
  /* background-color: #f3f3f3; */
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 6px;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.08), 0px 3px 3px rgba(0,0,0,0.08);
}

.form-fields-panel{
  flex: 1;
  margin-right: 50px;
}

.form-field{
  height: 50px;
  width: 250px;
  line-height: 30px;
  vertical-align: middle;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #eee;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #ddd;
  /* background-color: #eee; */
  cursor: move;
  
}

.form-line {
  padding: 20px 30px;
  background-color: #f8f9fa;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: all .3s ease;
  transition-property: border-color, background-color;
  cursor: move;
}

.form-line.selected {
  /* border: 1px solid #ddd; */
  background-color: #f8f9fa;
  /* box-shadow: 0px 0px 10px 10px #ccc; */
}

.form-ghost{
  transition: 0.18s ease;
  box-shadow: 1px 1px 5px 2px rgba(0,0,0,0.08);
}

.form-ghost-drop{
  box-shadow: 0 0 2px 5px rgba(0,0,0,0.0);
}

.form-submit-button{
  border: 0;
  width: 100%;
  vertical-align: middle;
  height: 40px;
  color: #eee;
  background-color: cornflowerblue;
  cursor: pointer;
}

.label {
  margin-bottom: 5px; 
}

.field {
  cursor: auto;
}

.field input, .field textarea, .field select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: none;
  transition: border-color .3s ease;
}

.field input[type="radio"], .field input[type="checkbox"] {
  width: auto;
}

.field input:focus, textarea:focus {
  border: 1px solid #80bdff;
  box-shadow: 0 0 3px 0px #80bdff;
}

.field-group input, .field-group textarea, .field-group select{
  width: 49%;
  margin-right: 2%;
}

input:last-child{
  margin-right: 0;
}

.dragging {
  background-color: yellow;
}

.card-scene{
  padding: 20px;
  height: 100vh;
  /* background-color: #fff; */
}

.card-container{
  width: 320px;
  padding: 10px;
  margin: 5px;
  margin-right: 15px;
  background-color: #f3f3f3;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24);
}

.card{
  margin: 5px;
  /* border: 1px solid #ccc; */
  background-color: white;
  /*box-shadow: 0 1px 1px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24);*/
  /*padding: 10px;*/
  position: relative;
}

.card-column-header{
  font-size: 18px;
}

.column-drag-handle{
  cursor: move;
  padding: 5px; 
}

.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg)
}

.card-ghost-drop{
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg)
}

.opacity-ghost {
  transition: all .18s ease;
  opacity: 0.8;
  /* transform: rotateZ(5deg); */
  background-color: cornflowerblue;
  box-shadow: 3px 3px 10px 3px rgba(0,0,0,0.3);
}

.opacity-ghost-drop {
  opacity: 1;
  /* transform: rotateZ(0deg); */
  background-color: white;
  box-shadow: 3px 3px 10px 3px rgba(0,0,0,0.0);
}


</style>

