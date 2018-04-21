import React from 'react';
import {Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './Home';
import Category from './Category';
import Recipe from '../Recipe'

class Navigation extends React.Component {
	render() {
    return (
      <HashRouter>
      <div className='container'>
              		<div className="navbar">
                			<ul className="navbar-nav">
                  			<NavLink className="nav-link" to="/"><i className="home large icon" /></NavLink>
                        <NavLink className="nav-link" to="/category"> Category </NavLink>
                        <NavLink className="nav-link" to="/recipes"> Recipe </NavLink>
                  		</ul>
              		</div>
              		<div>
                		<Route exact path = "/" component={Home}/>
                    <Route exact path = "/category" component={Category}/>
                    <Route exact path = "/recipes" component={Recipe}/>
              		</div>
             
        </div>
      </HashRouter>
    );
  }
}

export default Navigation;