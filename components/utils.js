
export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
};

// const task = [{
//   title: 'Make todo list',
//   completed: false
// }, {
//   title: 'Go skydiving',
//   completed: false
// }];

// export const className = () => {
//       var classes = ['tasks__item__toggle'];
//       if (this.task.completed) {
//         classes.push('tasks__item__toggle--completed');
//       }
//       return classes.join(' ');
//     }

export const generateItems = (count, creator) => {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(creator(i))
  }
  return result
};
