import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, ScrollView, AsyncStorage } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Left, Body, Right, Title, Icon, Card, CardItem, Drawer, List, ListItem } from 'native-base';
import api from '../api';
import { Color } from '../themes/color';
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import dataService from '../network/dataService';
class Home extends Component {
    constructor(props) {
        super(props)
        api.setNavigationState(this.props.navigation)
        this.closeDrawer = this.closeDrawer.bind(this)
        this.openDrawer = this.openDrawer.bind(this)

    }

    componentDidMount() {
        setTimeout(() => { SplashScreen.hide() }, 2000)
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    async _logOut() {
        let result = await dataService.logOut()
        await AsyncStorage.removeItem('RFTK')
        if (result) {
            api.reset(0, 'login')
        }
    }

    render() {
        let { fullName, account, currentBalance, dob, email, phone, gender, identityCard, address, description, avatar } = this.props.userState.user
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={
                    <Container>
                        <Header
                            androidStatusBarColor={Color.colorStatusbar}
                            style={{ backgroundColor: Color.colorPrimari }}
                        >
                            <Body>
                                <Title>Menu</Title>
                            </Body>
                        </Header>
                        <Content>
                            <List>
                                <ListItem>
                                    <Text>Lịch sử rút tiền</Text>
                                </ListItem>
                                <ListItem
                                    onPress={() => {
                                        this.closeDrawer();
                                        api.navigate('historyAdd')
                                    }}
                                >
                                    <Text>Lịch sử cộng tiền</Text>
                                </ListItem>
                                <ListItem onPress={() => { this._logOut() }} >
                                    <Text>Đăng xuất</Text>
                                </ListItem>
                            </List>
                        </Content>
                    </Container>
                }
                onClose={() => this.closeDrawer()}
            >
                <Container style={{ backgroundColor: 'transparent' }} >
                    <Header
                        androidStatusBarColor={Color.colorStatusbar}
                        style={{ backgroundColor: Color.colorPrimari }}
                    >
                        <Left>
                            <Button
                                onPress={this.openDrawer}
                                transparent>
                                <Icon style={{ fontSize: 35 }} name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>VKShare</Title>
                        </Body>
                        <Right>

                        </Right>
                    </Header>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1, }}>
                        <ImageBackground
                            source={require('../img/bglg.png')}
                            style={{
                                width: api.getRealDeviceWidth(),
                                height: api.getRealDeviceHeight() / 2.3,
                                justifyContent: 'center',

                                position: 'absolute',
                                zIndex: -1,
                                top: 0
                            }}>

                            <View style={{ alignSelf: 'center', borderRadius: api.getRealDeviceWidth() / 6, overflow: 'hidden' }}>
                                <Image style={{
                                    width: api.getRealDeviceWidth() / 3,
                                    height: api.getRealDeviceWidth() / 3,
                                }} source={{ uri: avatar }} />
                            </View>
                            <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: 'bold', fontSize: 18 }}>{fullName.toUpperCase()}</Text>

                        </ImageBackground>

                        <Card
                            style={{ width: api.getRealDeviceWidth() - 50, alignSelf: 'center', marginTop: api.getRealDeviceHeight() / 2.7, borderRadius: 20, }}
                        >
                            <CardItem
                                bordered
                                style={{ borderRadius: 20, borderBottomColor: Color.colorPrimari }}
                            >
                                <Body>
                                    <Text style={{ alignSelf: 'center', fontSize: 15, color: Color.colorPrimari }}>
                                        TÀI KHOẢN : {currentBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem
                                bordered
                            >
                                <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon style={{ color: 'gray', marginRight: 10, }} name='md-person' />
                                    <Text style={{ fontSize: 15 }}>
                                        Tên đăng nhập : {account}
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem
                                bordered
                            >
                                <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon style={{ color: 'gray', marginRight: 10, }} name='md-clock' />
                                    <Text style={{ fontSize: 15 }}>
                                        Ngày sinh : {dob}
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem
                                bordered
                            >
                                <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon style={{ color: 'gray', marginRight: 10, }} name='md-mail' />
                                    <Text style={{ fontSize: 15 }}>
                                        Email : {email}
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem
                                bordered
                            >
                                <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon style={{ color: 'gray', marginRight: 10, }} name='ios-call' />
                                    <Text style={{ fontSize: 15 }}>
                                        Số điện thoại : {phone}
                                    </Text>
                                </Body>
                            </CardItem>

                            <CardItem
                                bordered
                            >
                                <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon style={{ color: 'gray', marginRight: 10, }} name='ios-contacts' />
                                    <Text style={{ fontSize: 15 }}>
                                        Giới tính : {gender}
                                    </Text>
                                </Body>
                            </CardItem>

                            <CardItem
                                bordered
                            >
                                <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon style={{ color: 'gray', marginRight: 10, }} name='md-card' />
                                    <Text style={{ fontSize: 15 }}>
                                        Số chứng minh thư : {identityCard}
                                    </Text>
                                </Body>
                            </CardItem>

                            <CardItem
                                bordered
                                style={{ borderRadius: 20, }}
                            >
                                <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon style={{ color: 'gray', marginRight: 10, }} name='ios-pin' />
                                    <Text style={{ fontSize: 15 }}>
                                        Địa chỉ : {address}
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>


                    </ScrollView>

                </Container>
            </Drawer>
        );
    }
}

mapStateToProps = (state) => {
    return {
        userState: state.userReducer,

    }
}

export default connect(mapStateToProps)(Home)