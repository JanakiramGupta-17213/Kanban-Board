// store.js
import { createStore } from 'redux';

// Initial state
const initialState = {
  board: { columns: [] }, // Initial board state
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...state, board: action.payload };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
