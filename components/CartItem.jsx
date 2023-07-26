import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import React from "react"
import { colors } from "../styles/styles"
import { Avatar } from "react-native-paper"
import { iconOptions } from "../screens/ProductDetails"

const CartItem = ({
    name,
    amount,
    qty,
    stock,
    index,
    imgScr,
    id,
    decrementHandler,
    incrementHandler,
    navigate,
}) => {
    return (
        <View
            style={{
                flexDirection: "row",
                height: 100,
                marginVertical: 20,
            }}
        >
            <View
                style={{
                    width: "40%",
                    backgroundColor:
                        index % 2 === 0 ? colors.color1 : colors.color3,
                    borderTopRightRadius: 100,
                    borderBottomRightRadius: 100,
                }}
            >
                <Image
                    source={{
                        uri: imgScr,
                    }}
                    style={styles.img}
                />
            </View>
            <View
                style={{
                    width: "40%",
                    paddingHorizontal: 25,
                }}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 17,
                    }}
                    onPress={() => navigate.navigate("productdetails", { id })}
                >
                    {name}
                </Text>

                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 17,
                        fontWeight: "900",
                    }}
                >
                    {amount} ₫
                </Text>
            </View>
            <View style={styles.qtyContainer}>
                <TouchableOpacity
                    onPress={() =>
                        decrementHandler(id, name, amount, imgScr, stock, qty)
                    }
                >
                    <Avatar.Icon
                        icon={"minus"}
                        size={20}
                        style={{ ...iconOptions }}
                    />
                </TouchableOpacity>
                <Text style={styles.quantity}>{qty}</Text>
                <TouchableOpacity
                    onPress={() =>
                        incrementHandler(id, name, amount, imgScr, stock, qty)
                    }
                >
                    <Avatar.Icon
                        icon={"plus"}
                        size={20}
                        style={{
                            ...iconOptions,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    qtyContainer: {
        width: "20%",
        height: 80,
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "center",
    },
    img: {
        width: 200,
        height: "100%",
        resizeMode: "contain",
        top: "-20%",
        left: "10%",
    },
    quantity: {
        backgroundColor: colors.color4,
        height: 25,
        width: 25,
        textAlignVertical: "center",
        textAlign: "center",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.color5,
    },
})
