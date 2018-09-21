import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({

    state: {
      scene: {
        type: "container",
        props: {
          orientation: "horizontal"
        },
        children: [{
          id: 1,
          type: "container",
          name: "column_one",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          children: [{
            type: "task",
            id: 11,
            completed: false,
            props: {
              className: "card",
              style: { backgroundColor: '#fff' }
            },
            data: 'some text 1'
          }, {
            type: "task",
            id: 12,
            completed: false,
            props: {
              className: "card",
              style: { backgroundColor: '#fff' }
            },
              data: 'some text 2'
          }],
        },{
          id: 2,
          type: "container",
          name: "column_two",
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          children: [{
            type: "task2",
            id: 21,
            completed: false,
            props: {
              className: "card",
              style: { backgroundColor: '#fff' }
            },
            data: 'column two task 1'
          }, {
            type: "task2",
            id: 22,
            completed: false,
            props: {
              className: "card",
              style: { backgroundColor: '#fff' }
            },
            data: 'column two task 2'
          }],
        }],
      },
    },

    mutations: {
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
      },
      removeColumn(state, res){
        for (var i = 0; i < state.scene.children.length; i++) {
          if (state.scene.children[i].id == res.id) {
            state.scene.children.splice(i, 1)
          }
        }
      },
      changeColumn(state, res){
        state.scene = res.changeColumn
      },
      removeTask(state, res) {
        for (var i = 0; i < state.scene.children.length; i++) {
          if (state.scene.children[i].id == res.idColumn) {
            state.scene.children[i].children.splice(res.idTask, 1)
          }
        }
      }
    },

  

  })
}

export default createStore