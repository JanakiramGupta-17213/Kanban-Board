import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Board, { moveCard } from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';
import "./styles.css";

// Initial state
const initialState = {
  board: {
    columns: [
      {
        id: 1,
        title: "Planning",
        backgroundColor: "#fff",
        cards: [
          {
            id: 1,
            title: "Project 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum."
          },
          {
            id: 2,
            title: "Project 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum."
          },
          {
            id: 3,
            title: "Project 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum."
          }
        ]
      },
      {
        id: 2,
        title: "Development",
        cards: [
          {
            id: 9,
            title: "Project 4",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum."
          }
        ]
      },
      {
        id: 3,
        title: "Testing",
        cards: [
          {
            id: 10,
            title: "Project 5",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum."
          },
          {
            id: 11,
            title: "Project 6",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum."
          }
        ]
      },
      {
        id: 4,
        title: "Launch",
        cards: [
          {
            id: 12,
            title: "Project 7",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum."
          },
          {
            id: 13,
            title: "Project 8",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum."
          }
        ]
      }
    ]
  },
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

const ControlledBoard = () => {
  const dispatch = useDispatch();
  const controlledBoard = useSelector((state) => state.board);

  const handleCardMove = (cardId, sourceLaneId, targetLaneId, position) => {
    const updatedBoard = JSON.parse(JSON.stringify(controlledBoard));
    const sourceLane = updatedBoard.columns.find((col) => col.id === sourceLaneId);
    const targetLane = updatedBoard.columns.find((col) => col.id === targetLaneId);
    const cardIndex = sourceLane.cards.findIndex((card) => card.id === cardId);
    const [movedCard] = sourceLane.cards.splice(cardIndex, 1);
    targetLane.cards.splice(position, 0, movedCard);

    dispatch({ type: 'SET_BOARD', payload: updatedBoard });
  };

  return (
    <Board
    onCardMove={handleCardMove}
    allowRemoveLane={false}
    allowRenameColumn={false}
    allowRemoveCard={false}
    disableColumnDrag
    initialBoard={controlledBoard}
    />
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h4><u><i>Controlled board Example</i></u></h4>
        <p>The demo currently showcases the card movement functionality.</p>
        <ControlledBoard />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
