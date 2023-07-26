import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { colors } from "../styles/styles"
import { TouchableOpacity } from "react-native"
import { Avatar } from "react-native-paper"

const CategoryCard = ({name, id, deleteHandler}) => {
    return <View style={styles.container}>
        <Text style={styles.cardText}>
            {name}
        </Text>
        <TouchableOpacity onPress={()=> deleteHandler(id)}>
            <Avatar.Icon icon={"delete"} size={30} style={styles.deleteIcon}/>
        </TouchableOpacity>
    </View>
}

export default CategoryCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.color2,
        elevation: 6,
        margin: 10,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
    },
    cardText: {
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 1
    },
    deleteIcon : {
        backgroundColor: colors.color1,

    }
})
