import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store/configureStore';
import { addExpanse } from './actions/expenses'
import { setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'


const store = configureStore()

store.dispatch(addExpanse({ description: 'Water Bill' }))
store.dispatch(addExpanse({ description: 'Gas Bill' }))
store.dispatch(setTextFilter('water'))

console.log(store.getState())

const state = store.getState()

const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
console.log(visibleExpenses)

const jsx = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

ReactDOM.render(
  jsx,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
