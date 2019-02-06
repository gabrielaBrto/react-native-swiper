/**
 * 1 Where is the item on the screen? Use Animated.ValueXY
 * 2 Where is the element moving to? Use Animated.Spring
 * 3 Which element are we moving? Use Animated.View
*/

import React, { Component } from 'react'
import { View, StyleSheet, Animated } from 'react-native' 

class Ball extends Component{
    componentWillMount(){
        /** Mostra a posicao atual do elemento no inicio 
         * No caso as coordenadas estao setadas para 0,0
         * primeira pergunta
         */
        this.position = new Animated.ValueXY(0,0)
        /** Para onde o elemento esta se movendo
         * ou seja atualizar a posicao do elemento
         * spring recebe os dados que queremos modificar
         * e entao startamos 
         */
        Animated.spring(this.position, { toValue: { x: 150, y: 250 } }).start()
    }
    
    /**
     * Qual elemento estamos movendo? No metodo componentWillMount
     * em nenhum momento dissemos qual elemento nos estamos movendo,
     * porem dentro da funcao render adicionamos o Animated.View 
     * e passamos this.position como prop.
     * 
     * Podemos colocar quantos elementos quisermos dentro da tag
     */

    render(){
        return(
            <Animated.View style={this.position.getLayout()}>
                <View style={styles.ball}/>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    ball: {
        height: 60,
        width: 60, 
        borderRadius: 30,
        borderWidth: 30,
        borderColor: '#000'
    }
})

export default Ball