/**
 * Created by chimy on 2017/12/10.
 */
import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Button
} from "react-native";
export default class Detail extends Component {


    render() {
        let data = this.props.navigation;

        let title = data.state.params.title;
        let subTitle = data.state.params.subTitle;
        let image = data.state.params.image;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>详情</Text>

                <Button style={styles.button} title='返回'
                        onPress={()=> data.goBack()}></Button>
                <Image source={image} style={styles.productImage}></Image>
                <View style={styles.productText}>
                    <Text style={styles.productTitle}>{title}</Text>
                    <Text style={styles.productSubTitle}>{subTitle}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    },
    productImage: {
        marginLeft: 10,
        marginRight: 10,
        width: 40,
        height: 40,
        alignSelf: 'center'
    },
    productTitle: {
        flex: 3,
        fontSize: 16,
    },
    productSubTitle: {
        flex: 2,
        fontSize: 14,
        color: 'gray'
    },
    button: {
        flex: 1
    },
    productText: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
});