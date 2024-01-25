import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import React from "react"
import { colors } from "../styles/styles"
import { Avatar } from "react-native-paper"

const ImageCard = ({ src, id, deleteHandler }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: src,
                }}
                style={styles.image}
            />
            <TouchableOpacity onPress={()=> deleteHandler(id)}>
                <Avatar.Icon icon={"delete"} size={30} style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}

export default ImageCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.color2,
        elevation: 6,
        margin: 10,
        padding: 15,
        alignItems: "center",
        borderRadius: 10,
        height: 300,
    },
    image: {
        width: "100%",
        height: "80%",
        resizeMode: "contain",
    },
    icon: {
      backgroundColor: colors.color1
    }
})
