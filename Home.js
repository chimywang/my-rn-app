/**
 * Created by chimy on 2017/12/10.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ScrollView,
    Dimensions,
    ListView,
    Alert,
    Image,
    TouchableHighlight,
    StatusBar,
    RefreshControl
} from "react-native";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});
const circleSize = 8;
const circleMargin = 5;
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            advertisements: [{
                // url: 'https://img13.360buyimg.com/cms/jfs/t4090/228/1399180862/217278/206073fe/5874e621Nc675c6d0.jpg',
                image: require('./image/5874e621Nc675c6d0.jpg'),
            }, {
                // url: 'https://img13.360buyimg.com/cms/jfs/t4090/228/1399180862/217278/206073fe/5874e621Nc675c6d0.jpg',
                //  url: require('./images/3479ae5a5298e4bf3f125e96bd94a473.jpg'),
                image: require('./image/5874e621Nc675c6d0.jpg'),
            }, {
                image: require('./image/5874e621Nc675c6d0.jpg'),
                // image: 'https://img13.360buyimg.com/cms/jfs/t4090/228/1399180862/217278/206073fe/5874e621Nc675c6d0.jpg',
            },
            ],
            searchText: '',
            currentPage: 0,
            dataSource: ds.cloneWithRows([
                {
                    image: require('./image/product-1.jpeg'),
                    title: '商品1',
                    subTitle: '描述1'
                }, {
                    image: require('./image/product-2.jpg'),
                    title: '商品2',
                    subTitle: '描述2'
                },
                {
                    image: require('./image/product-3.jpg'),
                    title: '商品3',
                    subTitle: '描述3'
                },
                {
                    image: require('./image/product-2.jpg'),
                    title: '商品4',
                    subTitle: '描述4'
                },
                {
                    image: require('./image/product-1.jpeg'),
                    title: '商品5',
                    subTitle: '描述5'
                },
                {
                    image: require('./image/product-2.jpg'),
                    title: '商品6',
                    subTitle: '描述6'
                },
                {
                    image: require('./image/product-1.jpeg'),
                    title: '商品7',
                    subTitle: '描述7'
                },
                {
                    image: require('./image/product-3.jpg'),
                    title: '商品8',
                    subTitle: '描述9'
                },
                {
                    image: require('./image/product-1.jpeg'),
                    title: '商品9',
                    subTitle: '描述69'
                },
                {
                    image: require('./image/product-2.jpg'),
                    title: '商品10',
                    subTitle: '描述10'
                }
            ]),
            isRefreshing: false,
        }
    }

    render() {

        const advertisementCount = this.state.advertisements.length;

        const indicatorWidth = circleSize * advertisementCount + circleMargin * advertisementCount * 2;
        const left = (Dimensions.get('window').width - indicatorWidth) / 2;
        return (
            <View style={styles.container}>

                <StatusBar backgroundColor={'blue'} barStyle={'default'} networkActivityIndicatorVisible={true}>

                </StatusBar>
                <View style={styles.search_bar}>
                    <TextInput style={styles.input} placeholder='搜索商品'
                               onChangeText={(text)=>{this.setState({searchText:text});console.log('搜索内容时'+ text)}}></TextInput>
                    <Button style={styles.button} title='搜索'
                            onPress={()=>Alert.alert('搜索内容 ：'+ this.state.searchText,null,null)}></Button>
                </View>
                <View style={styles.advertisement}>
                    <ScrollView
                        ref="scrollView"
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                    >
                        {this.state.advertisements.map((advertisement, index) => {
                            return (
                                <TouchableHighlight key={index}>
                                    <Image style={styles.advertisementContent}
                                           source={advertisement.image}
                                    >

                                    </Image>

                                </TouchableHighlight>
                            )
                        })}
                    </ScrollView>
                    <View style={[styles.indicator,{left:left}]}>
                        {this.state.advertisements.map((advertisement, index) => {
                            return (
                                <View key={index}
                                      style={(index === this.state.currentPage) ? styles.circleSelected : styles.circle}>

                                </View>
                            )
                        })
                        }
                    </View>
                </View>
                <View style={styles.products}>
                    <ListView dataSource={this.state.dataSource}
                              renderRow={this._renderRow}
                              renderSeparator={this._renderSeparator}
                              refreshControl={this._renderRefreshControl()}
                    ></ListView>
                </View>
            </View>
        );
    }

    componentDidMount() {
        this._startTimer();
    }

    componentWillUnount() {
        clearInterval(this.interval);
    }

    _renderRow = (rowData, sectionID, rowID) => {
        const {navigate} = this.props.navigation;
        return (
            <TouchableHighlight
                onPress={() =>navigate('Detail', { name: 'Jane',image: rowData.image,title: rowData.title,subTitle:rowData.subTitle})}>
                <View style={styles.row}>
                    <Image source={rowData.image} style={styles.productImage}></Image>
                    <View style={styles.productText}>
                        <Text style={styles.productTitle}>{rowData.title}</Text>
                        <Text style={styles.productSubTitle}>{rowData.subTitle}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };

    _renderSeparator(sectionID, rowID, adjacentRowHightlighted) {
        return (
            <View key={`${sectionID}-${rowID}`} style={styles.divider}>

            </View>
        )
    };

    _renderRefreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.isRefreshing}
                tintColor={'#FF0000'}
                onRefresh={this._onRefresh}
                title={'正在刷新数据，请稍后。。。'}
                titleColor={'#0000FF'}
            ></RefreshControl>
        )
    }

    _onRefresh = () => {
        this.setState({isRefreshing: true});

        // let that = this;
        setTimeout(() => {
            const products = Array.from(new Array(10)).map((value, index) => ({
                image: require('./image/product-1.jpeg'),
                title: '新商品' + (index + 1),
                subTitle: '新描述' + (index + 1)
            }));
            this.setState({isRefreshing: false, dataSource: ds.cloneWithRows(products)});
        }, 2000)
    };

    _startTimer() {
        this.interval = setInterval(() => {
            nextPage = this.state.currentPage + 1;
            if (nextPage >= 3) {
                nextPage = 0
            }
            this.setState({currentPage: nextPage});
            const offSetX = nextPage * Dimensions.get('window').width;
            this.refs.scrollView.scrollResponderScrollTo({x: offSetX, y: 0, animated: true})
        }, 2000)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0
    },
    search_bar: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        height: 40,
        flexDirection: 'row'
        // backgroundColor: 'red',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    advertisement: {
        height: 180,
        // backgroundColor: 'green',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    products: {
        flex: 1,

    },
    input: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 10
    },
    button: {
        flex: 1
    },
    row: {
        height: 60,
        // justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white'
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
    productText: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    advertisementContent: {
        width: Dimensions.get('window').width,
        height: 180
    },
    indicator: {
        position: 'absolute',
        top: 160,
        flexDirection: 'row'
    },
    circle: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: 'gray',
        marginHorizontal: circleMargin
    },
    circleSelected: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: 'white',
        marginHorizontal: circleMargin
    },
    divider: {
        height: 1,
        width: Dimensions.get('window').width - 5,
        marginLeft: 5,
        backgroundColor: 'lightgray'
    }

});
