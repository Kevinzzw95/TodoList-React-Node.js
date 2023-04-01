import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import TasksProvider from './contexts/task.context';
import TagProvider from './contexts/tag.context';

axios.defaults.baseURL = 'http://localhost:5000/'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TagProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </TagProvider>
  </React.StrictMode>
);

