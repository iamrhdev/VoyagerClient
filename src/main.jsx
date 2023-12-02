import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import store from "../src/features/storeConfig.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ChakraBaseProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ChakraBaseProvider>
  </Provider>
);
