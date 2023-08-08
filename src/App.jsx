import React, { useEffect, useState } from "react";
import "./App.css";
import NavRoute from "./routes";
import { Provider } from "react-redux";
import { dispatch, store } from "./service/store/store";
import { getElement } from "./utils/localStore";
import { loginSuccess } from "./service/redux/type/login";

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <NavRoute />
      </Provider>
    </div>
  );
}

export default App;
