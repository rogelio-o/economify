import React, { Component } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import componentQueries from 'react-component-queries';
import { LayoutRoute, MainLayout } from 'components/Layout';
import TransactionsPage from 'pages/transactions/TransactionsPage';
import TransactionFormPage from 'pages/transactions/TransactionFormPage';
import BanksAccountsPage from 'pages/banks_accounts/BanksAccountsPage';
import CreateBankAccountPage from 'pages/banks_accounts/CreateBankAccountPage';
import UpdateBankAccountPage from 'pages/banks_accounts/UpdateBankAccountPage';
import StatisticsPage from 'pages/StatisticsPage';
import './styles/app.scss';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <Switch>
          <LayoutRoute
            exact
            path="/"
            layout={MainLayout}
            component={TransactionsPage}
          />
          <LayoutRoute
            exact
            path="/transactions/form"
            layout={MainLayout}
            component={TransactionFormPage}
          />
          <LayoutRoute
            exact
            path="/banks/accounts"
            layout={MainLayout}
            component={BanksAccountsPage}
          />
          <LayoutRoute
            exact
            path="/banks/accounts/create"
            layout={MainLayout}
            component={CreateBankAccountPage}
          />
          <LayoutRoute
            exact
            path="/banks/accounts/:bank_account_id"
            layout={MainLayout}
            component={UpdateBankAccountPage}
          />
          <LayoutRoute
            exact
            path="/statistics"
            layout={MainLayout}
            component={StatisticsPage}
          />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
