import { InvoicesDB, StocksDB } from "./database";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Billing from "./Components/Billing"
import Invoices from "./Components/Invoices"
import Facts from "./Components/Facts"
import Stocks from "./Components/Stocks"
import AddStocks from "./Components/AddStocks"
import EditStocks from "./Components/EditStocks"

function App() {
  StocksDB.getItem("Stocks").then(item => {
    if(item.length <= 0){
      StocksDB.setItem("Stocks",[]);
    }
  }).catch(err=>StocksDB.setItem("Stocks",[]));

  InvoicesDB.getItem("Invoices").then(item => {
    if(item.length <= 0){
      InvoicesDB.setItem("Invoices",[]);
    }
  }).catch(err=>InvoicesDB.setItem("Invoices",[]));

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Billing />
          </Route>
          <Route exact path="/invoices">
            <Invoices />
          </Route>
          <Route exact path="/facts">
            <Facts />
          </Route>
          <Route exact path="/stocks">
            <Stocks />
          </Route>
          <Route exact path="/stocks-edit/:id">
            <EditStocks />
          </Route>
          <Route exact path="/stocks-add/">
            <AddStocks />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
