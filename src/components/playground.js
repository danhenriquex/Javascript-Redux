import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
})

const resetCount = () => ({
  type: 'RESET'
})

const setCount = ({ count }) => ({
  type: 'SET',
  count
})

// Reducers
// 1. Reducers are pure functions

const countReducer = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      }
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      }
    case 'SET':
      return {
        count: action.count
      }
    case 'RESET':
      return {
        count: 0
      }
    default:
      return state
  }
})

// Actions - Than an object that gets sent to the store

// countReducer.subscribe(() => {
//   console.log(countReducer.getState())
// })

countReducer.dispatch(incrementCount({ incrementBy: 5 }))

countReducer.dispatch(resetCount())

countReducer.dispatch(decrementCount({ decrementBy: 5 }))

countReducer.dispatch(setCount({ count: -100 }))
