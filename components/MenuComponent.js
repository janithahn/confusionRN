import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Menu'
    };

    render(){
        const renderMenuItem = ({item, index}) => {
            return(
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    chevron={true}
                    onPress={() => navigate('Dishdetail', {dishId: item.id})}
                    leftAvatar={{source: {uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}}
                />
            );
        }

        const {navigate} = this.props.navigation

        return(
            <FlatList
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default Menu;