<template>

  <div>
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
                  <el-button class="tasks__item__edit button alert pull-right" type="text" @click="outerVisible = true">
                    <i class="fa fa-pencil-square-o"></i>
                  </el-button>
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
      <el-dialog title="Outer Dialog" :visible.sync="outerVisible">
            <div class="wrapper_info">
              <div class="wrapper">
                <div class="sample">
                  <form @submit.prevent="formSubmited = true" v-if="!formSubmited">
                    <div class="progress">
                      <div class="progress-bar" :style="progressWidth"></div>
                    </div>
                    <div>
                      <app-input v-for="(item, index) in  info"
                      :name="item.name"
                      :value="item.value"
                      :pattern="item.pattern"
                      :key="index"
                      @changedata="onChangeData(index, $event)"
                      >
                    </app-input>
                  </div>
                  <button class="btn btn-primary" :disabled="done < info.length">
                    Send Data
                  </button>
                </form>
                <div v-else>
                  <table class="table table-bordered">
                    <tr v-for="(item, index) in  info">
                      <td>{{ item.name }}</td>
                      <td>{{ item.value }}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
              label="comment"
              prop="text"
              :rules="[
                { required: true, message: 'Введите текст'},
              ]"
            >
              <el-input type="age" v-model.number="numberValidateForm.text" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('numberValidateForm')">Отправить коментарий</el-button>
              <el-button @click="resetForm('numberValidateForm')">Стереть</el-button>
            </el-form-item>
          </el-form>
          <el-dialog
              width="30%"
              title="Внутренний диалог"
              :visible.sync="innerVisible"
              append-to-body>
              <div class="inner_wrapper_info">
                <p>some comment</p>
              </div>
          </el-dialog>
          <div slot="footer" class="dialog-footer">
            <el-button @click="outerVisible = false">Закрыть</el-button>
            <el-button type="primary" @click="innerVisible = true">Открыть внутренний диалог</el-button>
          </div>
      </el-dialog>

  </div>
</template>
<script>

  import MyInput from '~/components/MyInput.vue'
  import taskInfo from '~/components/taskInfo.vue'
  import AppInput from '~/components/Input';
  import { Container, Draggable } from "vue-smooth-dnd"
  import { applyDrag, generateItems } from "./utils"


  export default {
    components: { Container, Draggable, MyInput, taskInfo, AppInput },
    created(){
      
    },
    data() {
      return {
        scene: this.$store.state.scene,
        outerVisible: false,
        innerVisible: false,
        numberValidateForm: {
          text: ''
        },
        info: [
          {
            name: 'Name',
            value: '',
            pattern: /^[a-zA-Z ]{2,30}$/
          },
          {
            name: 'Phone',
            value: '',
            pattern: /^[0-9]{7,14}$/
          },
          {
            name: 'Email',
            value: '',
            pattern: /.+/
          },
          {
            name: 'Some Field 1',
            value: '',
            pattern: /.+/
          },
          {
            name: 'Some Field 2',
            value: '',
            pattern: /.+/
          }
        ],
        controls: [],
        done: 0,
        formSubmited: false
      };
    },
    computed: {
      incomplete() {
        return this.scene.children.filter(this.inProgress).length;
      },

      progressWidth(){
        return {
          width: (this.done / this.info.length * 100) + '%'
        }
      }

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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      onChangeData(index, data){
        this.info[index].value = data.value;
        this.controls[index] = data.valid;

        let done = 0;

        for(let i = 0; i < this.controls.length; i++){
          if(this.controls[i]){
            done++;
          }
        }

        this.done = done;
      }
    },
    created(){
      for(let i = 0; i < this.info.length; i++){
        this.controls.push(false);
      }
    },
  };
</script>
<style scoped>
  .wrapper{
    max-width: 600px;
    margin: 20px auto;
  }
  .progress {
      height: 20px;
      margin-bottom: 20px;
      overflow: hidden;
      background-color: #f5f5f5;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
      box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
  }
  .progress-bar {
      float: left;
      width: 0;
      height: 100%;
      font-size: 12px;
      line-height: 20px;
      color: #fff;
      text-align: center;
      background-color: #337ab7;
      -webkit-box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
      box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
      -webkit-transition: width .6s ease;
      -o-transition: width .6s ease;
      transition: width .6s ease;
  }
</style>