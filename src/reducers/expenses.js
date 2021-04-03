// expenses reducers

const expensesReducerDefaultState = []

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPANSE':
      return [
        ...state,
        action.expense
      ]
    case 'REMOVE_EXPANSE':
      return state.filter(({ id }) => id !== action.id)
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense
        }
      })
    default:
      return state
  }
}
