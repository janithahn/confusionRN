import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import { baseUrl } from '../shared/baseurl';
import { connect } from 'react-redux';
import {Loading} from './LoadingComponent';

const mapStateToPros = state => {
    return{
        dishes: state.dishes,
        favorites: state.favorites
    }
}

class Favorites extends Component {
    static navigationOptions = {
        title: 'My Favorites'
    }

    render() {
        const {navigate} = this.props.navigation;

        const renderMenuItem = ({item, index}) => {
            return(
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    chevron={false}
                    onPress={() => navigate('Dishdetails', {dishId: item.id})}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                />
            );
        }

        if(this.props.dishes.isLoading) {
            return(<Loading/>);
        }else if(this.props.dishes.errMess) {
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );
        }else {
            return(
                <FlatList 
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }
}

export default connect(mapStateToPros)(Favorites);