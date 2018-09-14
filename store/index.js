import Vuex from 'vuex'


const createStore = () => {
  return new Vuex.Store({
    state: {
      columnTasks: [{
        id: 1,
        columnName: 'test1',
        taskBody: [{
          id: 3,
          title: 'Make todo list 1',
          completed: false
        }],
      },{
        id: 2,
        columnName: 'test2',
        taskBody: [{
          id: 4,
          title: 'Make todo list 2',
          completed: false
        },
        {
          id: 7,
          title: 'Make todo list 7',
          completed: false
        }],
      },{
        id: 3,
        columnName: 'test3',
        taskBody: [{
          id: 5,
          title: 'Make todo list 3',
          completed: false
        }],
      }],
    },

    mutations: {
      increment (state) {
        state.column++
      },
      addTask(state,res){

        for (var i = 0; i < state.columnTasks.length; i++) {
          for (var j = 0; j < state.columnTasks[i].taskBody.length; j++) {
              var number = [] 
              number.push(state.columnTasks[i].taskBody[j].id)

              var max = Math.max(number)
          }
          if (state.columnTasks[i].id == res.currentID) {

              state.columnTasks[i].taskBody.push({

                id: max + 1,
                title: res.title,
                completed: false
            })
          }
        }
      },
      addColumn(state, res) {
        for (var i = 0; i < state.columnTasks.length; i++) {
              var number = [] 
              number.push(state.columnTasks[i].id)
              var max = Math.max(number)
        }

         state.columnTasks.push({
                id: max + 1,
                columnName: res.columnName,
                taskBody: []
            })
            console.log(max);
      }
    },

  })
}

export default createStore