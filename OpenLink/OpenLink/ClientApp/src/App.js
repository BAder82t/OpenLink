import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { FetchDataAxios } from './components/FetchDataAxios';

import './custom.css'
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/fetch-data-axios' component={FetchDataAxios} />
            <Route path='/login' component={LoginPage} />
            <Route path='/dashboard' component={Dashboard} />
      </Layout>
    );
  }
}
