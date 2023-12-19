import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout';
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import '@mantine/core/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
)
