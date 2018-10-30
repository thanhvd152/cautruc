
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AsyncStorage
} from 'react-native';
import { Root } from 'native-base'
import { StackNavigator, createStackNavigator } from 'react-navigation'
import Home from './container/home';
import Login from './container/login';
import Loading from './UI/loading';
import Messagebox from './UI/messagebox'
import HistoryAddPoint from './container/historyAddPoint'
import SignUp from './container/signUp'
import api from './api';
import dataService from './network/dataService';
import axios from 'axios'
import config from './config';

const AppScreen = (isLogin) => {
    return createStackNavigator({
        login: {
            screen: Login
        },
        home: {
            screen: Home
        },
        signup: {
            screen: SignUp
        },
        historyAdd: {
            screen: HistoryAddPoint
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
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false
        }
    }

    async _refreshToken() {
        let token = await AsyncStorage.getItem('RFTK')
        if (token) {
            api.setToken(token)
            let result = await dataService.refreshToken(undefined)
            if (result) {
                api.setUserInfo(result.loginInfo)
                this.setState({ isLogin: true })
            }
        }

    }

    componentDidMount() {
        this._refreshToken()

    }

    render() {
        const Layout = AppScreen(this.state.isLogin);
        return <Layout />

    }
}


