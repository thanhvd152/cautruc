import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import api from '../api';
export default class Login extends Component {
    render() {
        return (
            <Container>
                <Header />
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                    </Form>
                    <Button onPress={() => { api.push('home1') }} >
                        <Text>Click Me!</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}