import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import reducers from "./reducers";

let initialState = {};

let store = configureStore(
  {
    reducer: reducers,
  },
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
setupListeners(store.dispatch);
export default store;
