import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';

function Menu(props) {

    const renderMenuItem = ({item, index}) => {
        return(
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                chevron={true}
                onPress={() => props.onPress(item.id)}
                leftAvatar={{source: {uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}}
            />
        );
    }

    return(
        <FlatList
            data={props.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}

export default Menu;