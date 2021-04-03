import { createStore, combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';

// timestamps
// 33400, 10, -203

export const setTextFilter = (text) => ({
  type: 'SET_TEXT_FILTER',
  text
})

export const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})

export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})

export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})

export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})

// ADD_EXPANSE

export const addExpanse = (
  { description = '', note = '', amount = 0, createdAt = 0 } = {}
) => ({
  type: 'ADD_EXPANSE',
  expense: {
    id: uuidv4(),
    description,
    amount,
    note,
    createdAt,
  }
})

export const removeExpanse = (
  { id } = {}
) => ({
  type: 'REMOVE_EXPANSE',
  id
})

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// Get visible expenses

const z = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1
    }
  })
}

// Filters reducers

const filtersReducerDefaultState = { text: '', sortBy: 'date', startDate: undefined, endDate: undefined }

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        date: 'date'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state
  }
}

// expenses reducers

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
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

// store.subscribe(() => {
//   const state = store.getState()
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
//   console.log(visibleExpenses)
// })

// const expenseOne = store.dispatch(addExpanse({ description: 'Rent', amount: 100, createdAt: 1000 }))
// const expenseTwo = store.dispatch(addExpanse({ description: 'Coffee', amount: 300, createdAt: -100 }))

// store.dispatch(removeExpanse({ id: expenseOne.expense.id }))

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// store.dispatch(setTextFilter('coffee'))
// store.dispatch(setTextFilter())

// store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// store.dispatch(setStartDate(0))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(1250))

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
)

const demoState = {
  expenses: [{
    id: 'asduhauidh',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
}

const user = {
  name: 'Danilo',
  age: 24
}

// console.log({ ...user, location: 'João Pessoa' })
