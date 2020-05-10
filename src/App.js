import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import Store from "./store/store";
import AppRouter from "./routes/routes";

import { loadUser } from "./actions/authActions";
const store = Store();

const App = () => {
  useEffect(function() {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
