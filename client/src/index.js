import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './utils/Router';
import Layout from './components/Layout';
import { Provider } from 'react-redux'
import store from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Layout>
            <Router />
        </Layout>
    </Provider>
);
