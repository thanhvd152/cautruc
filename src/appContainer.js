
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AsyncStorage
} from 'react-native';
import { Root } from 'native-base'
import { StackNavigator } from 'react-navigation'
import Home from './container/home';
import Login from './container/login';
import Loading from './UI/loading';
import Messagebox from './UI/messagebox'
import api from './api';

const AppScreen = (isLogin) => {
    return StackNavigator({
        login: {
            screen: Login
        },
        home: {
            screen: Home
        },
        /////UI component //////////
        message: {
            screen: Messagebox
        },
        loading: {
            screen: Loading
        },
    }, {
            headerMode: 'none',
            initialRouteName: isLogin ? 'home' : 'login',
            mode: 'modal',
            cardStyle: {
                backgroundColor: 'transparent',
                opacity: 1,
            },
        })
}


export default class AppContainer extends Component {

    render() {
        const Layout = AppScreen(false);
        return <Layout />

    }
}


