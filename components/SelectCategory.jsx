import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native"
import React from "react"
import { Avatar, Headline } from "react-native-paper"
import { colors } from "../styles/styles"

const SelectCategory = ({
    visible,
    setVisible,
    setCategory,
    setCategoryID,
    categories = [],
}) => {
    const selectCategoryHandler = (item) => {
        setCategory(item.category)
        setCategoryID(item._id)
        setVisible(false)
    }

    return (
        visible && (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                    <Avatar.Icon
                        icon={"close"}
                        size={30}
                        style={styles.close}
                    />
                </TouchableOpacity>
                <Headline style={styles.heading}>Chọn danh mục</Headline>
                <ScrollView>
                    {categories.map((item) => (
                        <Text
                            key={item._id}
                            style={styles.text}
                            onPress={() => selectCategoryHandler(item)}
                        >
                            {item.category}
                        </Text>
                    ))}
                </ScrollView>
            </View>
        )
    )
}

export default SelectCategory
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.color2,
        position: "absolute",
        padding: 35,
        borderRadius: 20,
        width: "90%",
        height: "90%",
        alignSelf: "center",
        elevation: 6,
        top: 50,
    },
    close: {
        alignSelf: "flex-end",
        backgroundColor: colors.color1,
    },
    heading: {
        textAlign: "center",
        marginVertical: 10,
        backgroundColor: colors.color1_light2,
        borderRadius: 5,
        padding: 3,
        color: colors.color2,
    },
    text: {
        fontSize: 17,
        fontWeight: "300",
        textTransform: "uppercase",
        marginVertical: 10,
    },
})
