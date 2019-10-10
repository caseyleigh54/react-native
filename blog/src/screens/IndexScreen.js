import React, { useContext, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {Context} from '../context/BlogContext';
import {Feather} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const IndexScreen = ({navigation}) => {
    const {state, addBlogPost, deleteBlogPost, getBlogPosts} = useContext(Context);
    useEffect(() => {
        getBlogPosts();

        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });
        return () => {
            listener.remove();
        };
    }, []);
    return (
        
            <View>
            <Text>Index Screen</Text>
            <Button title="Add Post" onPress={addBlogPost}/>
            <FlatList 
                data = {state}
                keyExtractor = {blogPost => blogPost.title}
                renderItem={({item}) => {
                    return <TouchableOpacity 
                    onPress={() => navigation.navigate('Show', {id: item.id})}>
                        <View style={styles.row}>
                        <Text style={styles.title}>{item.title}</Text>
                        <TouchableOpacity 
                            onPress={() => deleteBlogPost(item.id)}>
                            <Feather style={styles.icon} name="trash" />
                        </TouchableOpacity>
                    </View>
                    </TouchableOpacity>;
                }}
            />
        </View>
        
        
    );
};
IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather style={styles.navigationHeader} name="plus" size={30} />
            </TouchableOpacity>
    };
};
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    },
    navigationHeader: {
        marginRight: 15
    }
});

export default IndexScreen;