import Vue from 'vue'
import Vuex from 'vuex'

// переделываем на localstorage
Vue.use(Vuex)


const createStore = () => {
  return new Vuex.Store({

    state: {
      scene: {
        type: "container",
        props: {
          orientation: "horizontal"
        },
        children: [],
      },
    },

    getters: {
      scene(state) {
        console.log('getters')
        return state.scene
      }
    },
    actions: {
      async getList (context) {
        const child = await JSON.parse(localStorage.getItem("authToken"))
        console.log(child, 'смотрим что в child')
        context.commit('getList', child.data)
      }
    },

    mutations: {
      getList (state, children) {
        state.scene = children
      },
      addTask(state,res){
        let numberTask = [] 
        for (var i = 0; i < state.scene.children.length; i++) {


          for (var j = 0; j < state.scene.children[i].children.length; j++) {
              numberTask.push(state.scene.children[i].children[j].id)
          }
          if (numberTask.length == 0) {
            numberTask.push(0)
          }
          let maxTask = Math.max.apply(Math, numberTask)

          if (state.scene.children[i].id == res.currentID) {
              state.scene.children[i].children.push({
                id: maxTask + 1,
                type: res.title,
                completed: false,
                props: {
                className: "card",
                  style: { backgroundColor: '#fff' }
                },
                data: res.title
              })
          }

        }
      },
      addColumn(state, res) {
        let numberColumn = [] 
        for (var i = 0; i < state.scene.children.length; i++) {
          numberColumn.push(state.scene.children[i].id)
        }
        if (numberColumn.length == 0) {
          numberColumn.push(0)
        }
        let maxColumn = Math.max.apply(Math, numberColumn)
        state.scene.children.push({
          id: maxColumn + 1,
          type: "container",
          name: res.columnName,
          completed: false,
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          children: []
        })
        localStorage.setItem("authToken", JSON.stringify(state))
      },
      removeColumn(state, res){
        for (var i = 0; i < state.scene.children.length; i++) {
          if (state.scene.children[i].id == res.id) {
            state.scene.children.splice(i, 1)
          }
        }

      },
      removeTask(state, res) {
        for (var i = 0; i < state.scene.children.length; i++) {
          if (state.scene.children[i].id == res.idColumn) {
            state.scene.children[i].children.splice(res.idTask, 1)
          }
        }
      },
      changeColumn(state, res){
        state.scene = res.changeColumn
      },
      onCardDrop(state, res){
        state.scene = res.onCardDrop
      },
      clearAll(state, res){
        for (var i = 0; i < state.scene.children.length; i++) {
          if (state.scene.children[i].id == res.indexClearAll) {
            state.scene.children[i].children.splice(0)
          }
        }
      },
      clearCompleted(state, res){
        console.log(res)
        for (var i = 0; i < state.scene.children.length; i++) {
          if (state.scene.children[i].id == res.id) {
            state.scene.children[i].children = res.itog
          }
        }
      },

    },

  })
}

export default createStore


//   {
        //   id: 2,
        //   type: "container",
        //   name: "column_two",
        //   props: {
        //     orientation: "vertical",
        //     className: "card-container"
        //   },
        //   children: [{
        //     type: "task2",
        //     id: 21,
        //     completed: false,
        //     props: {
        //       className: "card",
        //       style: { backgroundColor: '#fff' }
        //     },
        //     data: 'column two task 1'
        //   }, {
        //     type: "task2",
        //     id: 22,
        //     completed: false,
        //     props: {
        //       className: "card",
        //       style: { backgroundColor: '#fff' }
        //     },
        //     data: 'column two task 2'
        //   }],
        // }