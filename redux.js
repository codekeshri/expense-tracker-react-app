import { redux } from "redux";
// const redux = require("redux");

// create the store and subscribe to reducer
const counterReducer = (state = { counter: 0 }, action) => {
  return { counter: state.counter + 1 };
};
const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  const latestState = store.getState();
};

store.subscribe(counterSubscriber);

store.dispatch({ type: "increment" });

// components dispatch/triggers actions to reducer function which changes the central data store
// and when data updated in central store, subscribing component notified to update the data
// that's how redux work
