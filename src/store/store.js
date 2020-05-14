import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

import rootReducer from "../reducers";

const initialState = {};
const middleware = [thunk];

function configureStore(initialState = {}) {
  const middleware = [thunk];
  if (typeof window !== "undefined") {
    middleware.push(createLogger({ collapsed: true }));
  }
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}
export default configureStore;
