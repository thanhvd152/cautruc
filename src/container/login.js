import React, { Component } from 'react';
import { Toast, Container, Header, Content, Thumbnail, Form, Item, Input, Label, Button, Text, View } from 'native-base';
import { ImageBackground, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native'
import api from '../api';
import { Color } from '../themes/color'
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


    }

    login() {
        api.showMessage('Vui lòng nhập email')
        api.showLoading()
        // if (this.state.userName.length == 0) return api.showMessage('Vui lòng nhập email')
        // if (this.state.pass.length == 0) return api.showMessage('Vui lòng nhập mật khẩu')
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
                                    selectionColor={Color.colorSuccess}
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
                                    selectionColor={Color.colorSuccess}
                                    placeholderTextColor='#dddddd'
                                    style={{
                                        textAlign: 'center',
                                        color: '#fff'
                                    }} placeholder='Nhập mật khẩu của bạn' />
                            </Item>
                            <Button
                                onPress={() => { this.login() }}
                                block light style={{ backgroundColor: '#fff', borderRadius: 25, height: 50, marginTop: 15 }}>
                                <Text style={{ color: Color.colorSuccess, fontWeight: 'bold', }}>Đăng nhập</Text>
                            </Button>
                            <Text style={{ alignSelf: 'center', marginTop: 10, color: '#fff' }} >Quên mật khẩu ?</Text>
                            <Text style={{ alignSelf: 'center', marginTop: 10, color: '#fff' }} >Bạn chưa có tài khoản ? Vui lòng <Text style={{ color: '#fff', fontWeight: 'bold', textDecorationLine: 'underline' }}>ĐĂNG KÝ</Text> </Text>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </Container>
        );
    }
}