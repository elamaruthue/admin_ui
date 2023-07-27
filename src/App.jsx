import React from 'react';
import './App.css';
import NavRoute from './routes';
import {Provider} from 'react-redux';
import { store } from './service/store/store';

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
