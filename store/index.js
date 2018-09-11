import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      column: 4,
      columnNames: ["Lorem", "Ipsum", "Consectetur", "Eiusmod"],
    //   test: {
    //     type: "container",
    //     props: {
    //       orientation: "horizontal"
    //     },
    //     children: generateItems(4, i => ({
    //       id: `column${i}`,
    //       type: "container",
    //       name: state.columnNames[i],
    //       props: {
    //         orientation: "vertical",
    //         className: "card-container"
    //       },
    //       children: generateItems(1, j => ({
    //         type: "draggable",
    //         id: `${i}${j}`,
    //         props: {
    //           className: "card",
    //         },
    //       }))
    //     }))
    //   }
    },
    mutations: {
      increment (state) {
        state.column++
      },
      addName(state, name) {
        state.columnNames.push(name)
      }
    }
  })
}

export default createStore