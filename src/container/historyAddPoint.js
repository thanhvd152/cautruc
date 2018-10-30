import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, ScrollView, AsyncStorage, FlatList } from 'react-native'
import { Thumbnail, Container, Header, Content, Form, Item, Input, Label, Button, Left, Body, Right, Title, Icon, Card, CardItem, Drawer, List, ListItem } from 'native-base';
import api from '../api';
import { Color } from '../themes/color';
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import dataService from '../network/dataService';
var moment = require('moment');
class HistoryAddPoint extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: []
        }

    }

    componentDidMount() {
        this.getListHistory()
    }

    async getListHistory() {
        let where = { id: this.props.userState.user.id }
        let result = await dataService.getListHisAdd(0, 10, where)
        if (result) {
            this.setState({ dataList: result.data })
        }
    }



    render() {
        let { fullName, account, currentBalance, dob, email, phone, gender, identityCard, address, description, avatar } = this.props.userState.user
        return (
            <Container >
                <Header
                    androidStatusBarColor={Color.colorStatusbar}
                    style={{ backgroundColor: Color.colorPrimari }}
                >
                    <Left>
                        <Button
                            onPress={() => { api.pop() }}
                            transparent>
                            <Icon name='md-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Lịch sử cộng điểm</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>

                <FlatList
                    data={this.state.dataList}
                    extraData={this.state}
                    keyExtractor={(item) => item.id + ''}
                    renderItem={({ item }) =>
                        <List>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail source={require('../img/coins.png')} />
                                </Left>
                                <Body>
                                    <Text>Khách hàng : Vũ Đình Thanh</Text>
                                    <Text note numberOfLines={1}>Cộng {item.receivedMoney} vnđ</Text>
                                    <Text note numberOfLines={1}>{'25/05/2019'}</Text>
                                </Body>
                                <Right>
                                    <Button transparent>
                                        <Text>View</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                        </List>
                    }
                />

            </Container>

        );
    }
}

mapStateToProps = (state) => {
    return {
        userState: state.userReducer,

    }
}

export default connect(mapStateToProps)(HistoryAddPoint)