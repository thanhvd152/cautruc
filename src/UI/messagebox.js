import React, { Component } from 'react';
import { View, TouchableOpacity, Animated, Button } from 'react-native'
import { Container, CardItem, Body, Card, Text, Content, Right, } from 'native-base';
import api from '../api';
import { Color } from '../themes/color';
export default class Messagebox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            marginAni: new Animated.Value(-70)
        }
    }

    componentDidMount() {

        Animated.timing(this.state.marginAni, {
            toValue: 30,
            duration: 300,
        }).start();

    }

    render() {
        return (
            <Container style={{ backgroundColor: 'transparent' }} >
                <Content padder
                >
                    <Animated.View style={{ marginTop: this.state.marginAni }} >
                        <Card >
                            <CardItem>
                                <Body>
                                    <Text>
                                        {this.props.navigation.state.params.content + ''}
                                    </Text>
                                </Body>
                                <Right>
                                    <TouchableOpacity
                                        onPress={() => { api.pop() }}
                                        activeOpacity={1}
                                        style={{
                                            backgroundColor: '#fff',
                                            borderLeftColor: Color.colorPrimari,
                                            borderLeftWidth: 1, height: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            paddingLeft: 10,

                                        }}>
                                        <Text style={{ color: Color.colorPrimari }}> ĐÓNG </Text>
                                    </TouchableOpacity>
                                </Right>
                            </CardItem>
                        </Card>
                    </Animated.View>
                </Content>
            </Container>
        );
    }
}