import React from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
import {ColorAccent} from "../Theming/Colors";

const Header = ({title}) => {
    return (
        <View style={styles.header}>

            <Text style={styles.headerTitle}>
                {title}
            </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 100,
        backgroundColor:  ColorAccent.accent,
        paddingTop: 36,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    }
})
export default Header;
