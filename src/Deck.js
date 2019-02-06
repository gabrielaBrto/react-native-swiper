import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder, LayoutAnimation, UIManager } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.40;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            /***************************************/
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            /***************************************/
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD)
                    this.completeSwipe('right');
                else if (gesture.dx < -SWIPE_THRESHOLD)
                    this.completeSwipe('left');
                else
                    this.resetPosition();
            }
        });
        
        // setar um index para a carta
        this.state = { panResponder, position, index: 0 };
    }

/**     componentWillReceiveProps(nextProps){
        if(nextProps.data != this.props.data){
            this.setState({ index: 0 })
        }
    }
*/
    //animacao ao mudar de carta usando LayoutAnimation e UIManager
    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }
    
    completeSwipe(direction) {
        const x = (direction === 'right' ? SCREEN_WIDTH + 50 : -SCREEN_WIDTH - 50);
        
        Animated.timing(this.state.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete() {
        //index + 1 para que a proxima carta seja chamada
        this.setState({ index: this.state.index + 1 });
        //reset na posicao da proxima carta
        this.state.position.setValue({ x: 0, y: 0 });
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardStyle() {
        const { position } = this.state;
        const rotationX = SCREEN_WIDTH * 2;

        const rotate = position.x.interpolate({
            inputRange: [-rotationX, 0, rotationX],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    }
    
    renderCards() {
        if (this.state.index >= this.props.data.length) {
            return (
                <View style={styles.alert}>
                    <Text style={styles.textStyle}> Acabou o Conteúdo </Text>
                </View>
            )
        }
        return this.props.data.map((item, i) => {
            if (i < this.state.index)
                return null;
                
            //Animacao apenas para a carta que esta no topo
            if (i === this.state.index) {
                return (
                    <Animated.View style={[  this.getCardStyle() ]} {...this.state.panResponder.panHandlers} key={item.id}>
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            //cartas que nao estao no topo '
            return (
                <Animated.View key={item.id} style={ {transform: [{ rotate: '0deg'}]} }>
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        })
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        color: '#721c24'
    },
    alert: {
        borderWidth: 2,
        borderColor: '#f5c6cb',
        borderRadius:5,
        backgroundColor: '#f5c6cb',
        marginTop: 40,
        marginRight:30,
        marginLeft:30,
    }
});

export default Deck;