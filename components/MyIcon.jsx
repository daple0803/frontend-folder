import { StyleSheet, TouchableOpacity } from "react-native"
import React from "react"
import { Avatar } from "react-native-paper"
import { colors } from "../styles/styles"

const MyIcon = ({ icon, handler }) => {
    return (
        <TouchableOpacity onPress={handler}>
            <Avatar.Icon icon={icon} size={40} 
            color={colors.color2}
            style={styles.icon} />
        </TouchableOpacity>
    )
}

export default MyIcon

const styles = StyleSheet.create({
    icon: {
        backgroundColor: colors.color1
    },
})
