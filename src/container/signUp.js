import React, { Component } from 'react';
import { Toast, Container, Header, Content, Thumbnail, Form, Item, Input, Label, Button, Text, View, Icon, DatePicker } from 'native-base';
import { ImageBackground, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import axios from 'axios'
import api from '../api';
import { Color } from '../themes/color'
var moment = require('moment');
import ImagePicker from 'react-native-image-crop-picker';
import config from '../config';
import dataService from '../network/dataService';
let chosenDate = null
export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            pass: '',
            rePass: '',
            email: '',
            fullName: '',
            gender: '',
            identityCard: '',
            address: '',
            description: '',
            avatar: '',
            companyName: '',
            companyAddress: '',
            phone: ''
        }
        this.setDate = this.setDate.bind(this);
        this._openCamera = this._openCamera.bind(this)
        this._openPicker = this._openPicker.bind(this)
    }

    componentDidMount() {


    }


    async _signUp() {
        let checkEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (this.state.userName.length == 0) return api.showMessage('Vui lòng nhập tên đăng nhập')
        if (this.state.pass.length == 0) return api.showMessage('Vui lòng nhập mật khẩu')
        if (this.state.rePass.length == 0) return api.showMessage('Vui lòng xác nhận mật khẩu')
        if (!chosenDate) return api.showMessage('Vui lòng chọn ngày sinh')
        if (this.state.email.length == 0) return api.showMessage('Vui lòng nhập email')
        if (this.state.fullName.length == 0) return api.showMessage('Vui lòng nhập họ tên')
        if (this.state.gender.length == 0) return api.showMessage('Vui lòng chọn giới tính')
        if (this.state.identityCard.length == 0) return api.showMessage('Vui lòng nhập chứng minh thư')
        if (this.state.address.length == 0) return api.showMessage('Vui lòng nhập địa chỉ')
        if (this.state.avatar.length == 0) return api.showMessage('Vui lòng cập nhật avatar')
        if (this.state.pass != this.state.rePass) return api.showMessage('Mật khẩu đã nhập không trùng nhau')
        if (!checkEmail.test(this.state.email)) return api.showMessage('Vui lòng nhập email đúng định dạng')
        let result = await dataService.signUp('public',
            this.state.userName,
            this.state.phone,
            this.state.email,
            this.state.pass,
            this.state.fullName,
            chosenDate,
            this.state.gender,
            this.state.identityCard,
            this.state.address,
            this.state.description,
            this.state.idAvt,
            this.state.companyName,
            this.state.companyAddress
        )
        if (result) {
            api.pop()
            api.showMessage(result.message)
        }
    }


    async _uploadAvartar(image) {
        let file = {
            uri: image.path,
            type: image.mime,
            name: 'avatar.jpg'
        }
        let data = new FormData()
        data.append('images', file)
        let result = await axios.post(config.HOST + '/api/file-management/upload-image', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Api-Version": 'public'
            },
        })
        if (result.status != 200) api.showMessage('Có lỗi xảy ra vui lòng thử lại sau!')
        this.setState({
            avatar: result.data.created[0].url,
            idAvt: result.data.created[0].id
        })
        console.log(result)

    }

    _openCamera() {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            cropperActiveWidgetColor: Color.colorPrimari,
            cropperStatusBarColor: Color.colorStatusbar,
            cropperToolbarColor: Color.colorPrimari,
            cropperToolbarTitle: 'Cắt ảnh'
        }).then(image => {
            this._uploadAvartar(image)
            console.log(image)
        });
    }

    _openPicker() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            cropperActiveWidgetColor: Color.colorPrimari,
            cropperStatusBarColor: Color.colorStatusbar,
            cropperToolbarColor: Color.colorPrimari,
            cropperToolbarTitle: 'Cắt ảnh'
        }).then(image => {
            console.log(image);
        });
    }

    setDate(value) {
        chosenDate = moment(value).format('YYYY-MM-DD')
    }

    _renderDate() {
        return <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(moment().year() - 70, 1, 1)}
            maximumDate={new Date(moment().year(), 12, 31)}
            locale={"vi"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Chọn ngày sinh"
            textStyle={{ color: "#dddddd" }}
            placeHolderTextStyle={{ color: "#dddddd" }}
            onDateChange={this.setDate}
        />
    }


    onSelectGender(index, value) {
        this.setState({
            gender: index == 0 ? 'male' : 'female'
        })
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
                    <View style={{ backgroundColor: 'transparent', width: api.getRealDeviceWidth(), padding: 10 }}>
                        <Icon onPress={() => { api.pop() }} name='md-arrow-back' style={{ color: "#fff", backgroundColor: 'transparent' }} />
                    </View>
                    <ScrollView
                        style={{ flex: 1, }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps='always'

                    >
                        <TouchableOpacity
                            onPress={this._openCamera}
                            activeOpacity={0.8}
                            style={{
                                borderRadius: api.getRealDeviceWidth() / 6,
                                overflow: 'hidden',
                                alignSelf: 'center',
                                marginTop: 10,

                            }}>
                            {this.state.avatar ? <Image style={{
                                width: api.getRealDeviceWidth() / 3,
                                height: api.getRealDeviceWidth() / 3,
                            }} source={{ uri: this.state.avatar }} /> :
                                <View
                                    style={{
                                        width: api.getRealDeviceWidth() / 3,
                                        height: api.getRealDeviceWidth() / 3,
                                        backgroundColor: 'rgba(248,248,255,0.5)',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Icon style={{ fontSize: 60, color: '#dddddd' }} name='ios-camera-outline' />
                                </View>}
                        </TouchableOpacity>
                        <View style={{ marginTop: 30 }} >
                            <Item
                                style={{

                                    width: api.getRealDeviceWidth() - 50,
                                    marginTop: 5,

                                }}
                            >
                                <Icon style={{ color: '#dddddd' }} name='md-person' />
                                <Input
                                    style={{ color: '#fff' }}
                                    value={this.state.userName}
                                    onChangeText={(userName) => { this.setState({ userName }) }}
                                    placeholderTextColor="#dddddd"
                                    selectionColor='#fff'
                                    placeholder='Tên đăng nhập (*) ' />
                            </Item>
                            <Item
                                style={{

                                    width: api.getRealDeviceWidth() - 50,
                                    marginTop: 5,

                                }}
                            >
                                <Icon style={{ color: '#dddddd' }} name='md-call' />
                                <Input
                                    style={{ color: '#fff' }}
                                    keyboardType='phone-pad'
                                    value={this.state.phone}
                                    onChangeText={(phone) => { this.setState({ phone }) }}
                                    placeholderTextColor="#dddddd"
                                    selectionColor='#fff'
                                    placeholder='Số điện thoại (*) ' />
                            </Item>
                            <Item
                                style={{

                                    width: api.getRealDeviceWidth() - 50,
                                    marginTop: 5,

                                }}
                            >
                                <Icon style={{ color: '#dddddd' }} name='ios-mail' />
                                <Input
                                    style={{ color: '#fff' }}
                                    value={this.state.email}
                                    onChangeText={(email) => { this.setState({ email }) }}
                                    placeholderTextColor="#dddddd"
                                    selectionColor='#fff'
                                    placeholder='Email (*) ' />
                            </Item>
                            <Item
                                style={{

                                    width: api.getRealDeviceWidth() - 50,
                                    marginTop: 5,

                                }}
                            >
                                <Icon style={{ color: '#dddddd' }} name='md-key' />
                                <Input
                                    style={{ color: '#fff' }}
                                    value={this.state.pass}
                                    onChangeText={(pass) => { this.setState({ pass }) }}
                                    secureTextEntry={true}
                                    placeholderTextColor="#dddddd"
                                    selectionColor='#fff'
                                    placeholder='Mật khẩu (*) ' />
                            </Item>
                            <Item
                                style={{

                                    width: api.getRealDeviceWidth() - 50,
                                    marginTop: 5,

                                }}
                            >
                                <Icon style={{ color: '#dddddd' }} name='md-key' />
                                <Input
                                    style={{ color: '#fff' }}
                                    value={this.state.rePass}
                                    onChangeText={(rePass) => { this.setState({ rePass }) }}
                                    secureTextEntry={true}
                                    placeholderTextColor="#dddddd"
                                    selectionColor='#fff'
                                    placeholder='Nhập lại mật khẩu (*) ' />
                            </Item>
                            <Item
                                style={{

                                    width: api.getRealDeviceWidth() - 50,
                                    marginTop: 5,

                                }}
                            >
                                <Icon style={{ color: '#dddddd' }} name='ios-person' />
                                <Input
                                    style={{ color: '#fff' }}
                                    value={this.state.fullName}
                                    onChangeText={(fullName) => { this.setState({ fullName }) }}
                                    placeholderTextColor="#dddddd"
                                    selectionColor='#fff'
                                    placeholder='Họ và tên (*) ' />
                            </Item>

                            <Item
                                style={{
                                    height: 50,
                                    width: api.getRealDeviceWidth() - 50,
                                    marginTop: 5,

                                }}
                            >
                                <Icon style={{ color: '#dddddd' }} name='md-calendar' />
                                {this._renderDate()}
                            </Item>

                            <Item
                                style={{

                                    width: api.getRealDeviceWidth() - 50,
                                    marginTop: 5,

                                }}
                            >
                                <Icon style={{ color: '#dddddd' }} name='md-transgender' />
                                <RadioGroup
                                    color='#fff'
                                    style={{ flexDirection: 'row' }}
                                    onSelect={(index, value) => this.onSelectGender(index, value)}
                                    selectedIndex={this.state.gender ? 0 : 1}
                                >
                                    <RadioButton style={{ padding: 10, alignItems: 'center', justifyContent: 'center', }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5, color: "#dddddd" }}>{'Nam'}</Text>
                                    </RadioButton>
                                    <RadioButton style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5, color: "#dddddd" }}>{'Nữ'}</Text>
                                    </RadioButton>
                                </RadioGroup>
                            </Item>


                            <Item
                                style={{

                                    width: api.getRealDeviceWidth() - 50,
                                    marginTop: 5,

                                }}
                            >
                                <Icon style={{ color: '#dddddd' }} name='md-card' />
                                <Input
                                    style={{ color: '#fff' }}
                                    keyboardType='numeric'
                                    value={this.state.identityCard}
                                    onChangeText={(identityCard) => { this.setState({ identityCard }) }}
                                    placeholderTextColor="#dddddd"
                                    selectionColor='#fff'
                                    placeholder='Số CMND (*) ' />
                            </Item>

                            <Item
                                style={{

                                    width: api.getRealDeviceWidth() - 50,
                                    marginTop: 5,

                                }}
                            >
                                <Icon style={{ color: '#dddddd' }} name='md-flag' />
                                <Input
                                    style={{ color: '#fff' }}
                                    value={this.state.address}
                                    onChangeText={(address) => { this.setState({ address }) }}
                                    placeholderTextColor="#dddddd"
                                    selectionColor='#fff'
                                    placeholder='Địa chỉ (*) ' />
                            </Item>

                            <Item
                                style={{

                                    width: api.getRealDeviceWidth() - 50,
                                    marginTop: 5,

                                }}
                            >
                                <Icon style={{ color: '#dddddd' }} name='md-information-circle' />
                                <Input
                                    style={{ color: '#fff' }}
                                    value={this.state.description}
                                    onChangeText={(description) => { this.setState({ description }) }}
                                    placeholderTextColor="#dddddd"
                                    selectionColor='#fff'
                                    placeholder='Mô tả bản thân  ' />
                            </Item>

                            <Item
                                style={{

                                    width: api.getRealDeviceWidth() - 50,
                                    marginTop: 5,

                                }}
                            >
                                <Icon style={{ color: '#dddddd' }} name='ios-briefcase' />
                                <Input
                                    style={{ color: '#fff' }}
                                    value={this.state.companyName}
                                    onChangeText={(companyName) => { this.setState({ companyName }) }}
                                    placeholderTextColor="#dddddd"
                                    selectionColor='#fff'
                                    placeholder='Tên công ty' />
                            </Item>

                            <Item
                                style={{

                                    width: api.getRealDeviceWidth() - 50,
                                    marginTop: 5,

                                }}
                            >
                                <Icon style={{ color: '#dddddd' }} name='md-pin' />
                                <Input
                                    style={{ color: '#fff' }}
                                    value={this.state.companyAddress}
                                    onChangeText={(companyAddress) => { this.setState({ companyAddress }) }}
                                    placeholderTextColor="#dddddd"
                                    selectionColor='#fff'
                                    placeholder='Địa chỉ công ty' />
                            </Item>

                            <Button
                                onPress={() => { this._signUp() }}
                                block light style={{ backgroundColor: '#fff', borderRadius: 25, height: 50, marginTop: 15, marginBottom: 20 }}>
                                <Text style={{ color: Color.colorSuccess, fontWeight: 'bold', backgroundColor: 'transparent' }}>Đăng ký</Text>
                            </Button>

                        </View>
                    </ScrollView>
                </ImageBackground>
            </Container>
        );
    }
}