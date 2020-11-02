import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost'; ---> NEW METHODE WITH ASYNCCOMPONENT.
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
    //tout ce qui se trouve entre les () est importer que lorsque cette fonction est executer.
    //et cette fonciton me sera executer une fois que nous aurons rendu AsyncNewPost a l'ecran.
})

class Blog extends Component {
    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <h1>Blog</h1>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/posts"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f'
                                }}>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                                }}  
                                activeClassName="my-active"
                                activeStyle={{
                                color: '#fa923f'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth && <Route path="/new-post" component={AsyncNewPost} />}
                    <Route path="/posts" component={Posts} />
                    <Redirect to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;