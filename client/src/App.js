import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Checkout from './components/Checkout';
import Order from './components/Admin/Order';
import User from './components/Admin/User';
import Product from './components/Admin/Product';
import About from './components/About';





class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Nav></Nav>
        </header>
        <main>
          <Switch>
            <Route path="/signUp" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/adminorder" component={Order} />
            <Route path="/adminuser" component={User} />
            <Route path="/adminproduct" component={Product} />
            <Route path="/about" component={About} />
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    )
  }
}

export default App;

