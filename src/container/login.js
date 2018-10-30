import React, { Component } from 'react';
import { Toast, Container, Header, Content, Thumbnail, Form, Item, Input, Label, Button, Text, View } from 'native-base';
import { ImageBackground, StatusBar, Image, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native'
import api from '../api';
import { Color } from '../themes/color'
import dataService from '../network/dataService';
import SplashScreen from 'react-native-splash-screen'

export default class Login extends Component {
    constructor(props) {
        super(props)
        api.setNavigationState(this.props.navigation)
        this.state = {
            userName: '',
            pass: ''
        }
    }

    componentDidMount() {
        setTimeout(() => { SplashScreen.hide() }, 2000)
    }


    async setStore(token) {
        try {
            await AsyncStorage.setItem('RFTK', token)
        } catch (error) {
            console.log(error)
        }

    }

    async login() {
        if (this.state.userName.length == 0) return api.showMessage('Vui lòng nhập email')
        if (this.state.pass.length == 0) return api.showMessage('Vui lòng nhập mật khẩu')
        api.showLoading()
        let result = await dataService.signIn('public', this.state.userName, this.state.pass)
        this.setStore(result.loginInfo.token)
        api.pop()
        if (result) {
            if (result.loginInfo.roleId.includes(2)) {
                api.setToken(result.loginInfo.token)
                api.setUserInfo(result.loginInfo)
                api.reset(0, 'home')
            } else {
                api.showMessage('Bạn không có quyền truy cập')
            }

        } else {
            this.setState({
                userName: '',
                pass: ''
            })
        }
    }

    render() {
        return (
            <Container>
                <StatusBar
                    backgroundColor={Color.colorStatusbar}
                // barStyle="light-content"
                />
                <ImageBackground
                    style={{ flex: 1, alignItems: 'center' }}
                    source={require('../img/bglg.png')}
                >
                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps='always'
                    >

                        <Image style={{
                            width: api.getRealDeviceWidth() / 3,
                            height: api.getRealDeviceWidth() / 3,
                            marginTop: api.getRealDeviceHeight() / 5,
                            alignSelf: 'center'
                        }} source={require('../img/iconVK.png')} />

                        <View style={{ marginTop: 30 }} >
                            <Item
                                style={{
                                    backgroundColor: 'rgba(248,248,255,0.5)',
                                    borderColor: 'transparent',
                                    width: api.getRealDeviceWidth() - 50,

                                }}
                                rounded>
                                <Input
                                    value={this.state.userName}
                                    onChangeText={(userName) => { this.setState({ userName }) }}
                                    selectionColor={'#fff'}
                                    placeholderTextColor='#dddddd'
                                    style={{
                                        textAlign: 'center',
                                        color: '#fff'
                                    }} placeholder='Nhập email hoặc tên đăng nhập' />
                            </Item>
                            <Item

                                style={{
                                    backgroundColor: 'rgba(248,248,255,0.5)',
                                    borderColor: 'transparent',
                                    width: api.getRealDeviceWidth() - 50,
                                    marginTop: 5,

                                }}
                                rounded>
                                <Input
                                    secureTextEntry={true}
                                    value={this.state.pass}
                                    onChangeText={(pass) => { this.setState({ pass }) }}
                                    selectionColor={'#fff'}
                                    placeholderTextColor='#dddddd'
                                    style={{
                                        textAlign: 'center',
                                        color: '#fff'
                                    }} placeholder='Nhập mật khẩu của bạn' />
                            </Item>
                            <Button
                                onPress={() => { this.login() }}
                                block light style={{ backgroundColor: '#fff', borderRadius: 25, height: 50, marginTop: 15 }}>
                                <Text style={{ color: Color.colorSuccess, fontWeight: 'bold', backgroundColor: 'transparent' }}>Đăng nhập</Text>
                            </Button>
                            <Text style={{ alignSelf: 'center', marginTop: 10, color: '#fff', backgroundColor: 'transparent' }} >Bạn chưa có tài khoản ? Vui lòng <Text onPress={() => { api.navigate('signup') }} style={{ color: '#fff', fontWeight: 'bold', textDecorationLine: 'underline', backgroundColor: 'transparent' }}>ĐĂNG KÝ</Text> </Text>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </Container>
        );
    }
}