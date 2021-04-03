import { v4 as uuidv4 } from 'uuid';

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