import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Store from "./redux/store/Store";
import App from "./App";
let store = Store();
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);

