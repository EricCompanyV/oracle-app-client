import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SessionContextProvider } from "./contexts/SessionContext";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionContextProvider>
        <MantineProvider theme={{ fontFamily: 'Open Sans' }}m withGlobalStyles withNormalizeCSS>
          <App />
        </MantineProvider>
      </SessionContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
