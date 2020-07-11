import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';

function RenderDish(props) {
    const dish = props.dish;

    if(dish != null) {
        return(
            <Card
                featuredTitle={dish.name}
                image={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
            >
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
            </Card>
        );
    }else {
        return(<View></View>);
    }
}

function Dishdetail(props) {
    return(
        <RenderDish dish={props.dish}/>
    );
}

export default Dishdetail;