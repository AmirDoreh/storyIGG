import React, { Component } from 'react'
import { Route } from 'react-router'
import Home from '../pages/Home'
import Stories from '../pages/Stories'

class Mainlayout extends Component {
    constructor() {
        super()
        this.pages = [
            { path: '/', component: Home },
            { path: '/stories/:username', component: Stories },
        ]
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className='mainlayout'>
                {this.pages.map((item, index) => (
                    <Route exact={item.path === '/'} key={index} path={item.path} component={item.component} />
                ))}
            </div>
        )
    }
}

export default Mainlayout