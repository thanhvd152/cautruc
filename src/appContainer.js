
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import Home from './container/home';
import Login from './container/login';
import api from './api';

const AppUI = StackNavigator({
    home1: {
        screen: Home
    },
    login: {
        screen: Login
    },
}, {
        headerMode: 'none',
        mode: 'modal',
        cardStyle: {
            backgroundColor: 'rgba(0,0,0,0.3)',
            opacity: 1,
        },
    })

const AppScreen = StackNavigator({
    login: {
        screen: Login
    },
    home: {
        screen: Home
    },
}, {
        headerMode: 'none',
    })


const Main = StackNavigator({
    screenapp: {
        screen: props => <AppScreen setNavigationProps={api.setNavigationState(props.navigation)} />
    },
    ui: {
        screen: AppUI
    },

}, {
        headerMode: 'none',
        cardStyle: {
            backgroundColor: 'transparent',
            opacity: 1,
        },
    })

export default class AppContainer extends Component {
    render() {
        return <Main />
    }
}


