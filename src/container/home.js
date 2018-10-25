import React, { Component } from 'react';
import { Text, View } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
export default class Home extends Component {
    render() {
        return (
            <Container style={{ backgroundColor: 'transparent' }} >
                <Content style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} >
                    <Text>Home</Text>
                </Content>
            </Container>
        );
    }
}