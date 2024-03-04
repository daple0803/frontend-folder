import { View, Text, TouchableOpacity, Image } from "react-native"
import React from "react"
import { colors } from "../styles/styles"
import { Button } from "react-native-paper"

const ProductCard = ({
    stock,
    name,
    price,
    image,
    id,
    addToCardHandler,
    i,
    navigate,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigate.navigate("productdetails", { id })}
        >
            <View
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 15,
                    width: 250,
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: 20,
                    borderRadius: 20,
                    height: 400,
                    backgroundColor:
                        i % 2 === 0 ? colors.color1 : colors.color2,
                }}
            >
                <Image
                    source={{
                        uri: image,
                    }}
                    style={{
                        width: "100%",
                        height: 200,
                        resizeMode: "contain",
                        position: "absolute",
                        left: 45,
                        top: 105,
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        padding: 20,
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    <Text
                        numberOfLines={2}
                        style={{
                            color: i % 2 === 0 ? colors.color2 : colors.color3,
                            fontSize: 25,
                            fontWeight: "300",
                            width: "60%",
                        }}
                    >
                        {name}
                    </Text>

                    {stock === 0 ? (
                        <Text
                        numberOfLines={2}
                        style={{
                            color: i % 2 === 0 ? colors.color2 : colors.color3,
                            fontSize: 20,
                            fontWeight: "500",
                        }}
                    >
                       SOLD OUT
                    </Text>
                    ): <Text
                    numberOfLines={2}
                    style={{
                        color: i % 2 === 0 ? colors.color2 : colors.color3,
                        fontSize: 20,
                        fontWeight: "700",
                    }}
                >
                    {price} ₫
                </Text>}
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor:
                            i % 2 === 0 ? colors.color2 : colors.color1_light2,
                        borderRadius: 0,
                        paddingVertical: 5,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        width: "100%",
                    }}
                >
                    <Button
                        onPress={() =>
                            addToCardHandler(id, name, price, image, stock)
                        }
                        textColor={i % 2 === 0 ? colors.color1 : colors.color2}
                    >
                        Thêm vào giỏ hàng
                    </Button>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard
