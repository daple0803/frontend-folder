import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import React from "react"
import { colors, defaultStyles } from "../styles/styles"
import Header from "../components/Header"
import Heading from "../components/Heading"
import { Button } from "react-native-paper"
import CartItem from "../components/CartItem"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { Toast } from "react-native-toast-message/lib/src/Toast"

const Cart = () => {
    const navigate = useNavigation()
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart)

    const incrementHandler = (id, name, price, image, stock, quantity) => {
        const newQty = quantity + 1
        if (stock <= quantity)
            return Toast.show({
                type: "error",
                text1: "Hạn mức tối đa",
            })
        dispatch({
            type: "addToCart",
            payload: {
                product: id,
                name,
                price,
                image,
                stock,
                quantity: newQty,
            },
        })
    }

    const decrementHandler = (id, name, price, image, stock, quantity) => {
        const newQty = quantity - 1

        if (1 >= quantity)
            return dispatch({ type: "removeFromCart", payload: id })

        dispatch({
            type: "addToCart",
            payload: {
                product: id,
                name,
                price,
                image,
                stock,
                quantity: newQty,
            },
        })
    }
    return (
        <View style={{ ...defaultStyles, padding: 0 }}>
            {/* Header */}
            <Header back={true} emptyCart={true} />

            {/* Heading */}
            <Heading
                text1="Giỏ hàng"
                text2="Của bạn"
                containerStyle={{
                    paddingTop: 70,
                    marginLeft: 35,
                }}
            />
            <View
                style={{
                    paddingVertical: 20,
                    flex: 1,
                }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <CartItem
                                key={item.product}
                                id={item.product}
                                name={item.name}
                                stock={item.stock}
                                amount={item.price}
                                imgScr={item.image}
                                index={index}
                                qty={item.quantity}
                                incrementHandler={incrementHandler}
                                decrementHandler={decrementHandler}
                                navigate={navigate}
                            />
                        ))
                    ) : (
                        <Text
                            style={{
                                textAlign: "center",
                                fontWeight: "300",
                                fontSize: 18,
                            }}
                        >
                            Hiện chưa có sản phẩm nào
                        </Text>
                    )}
                </ScrollView>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 35,
                }}
            >
                <Text>{cartItems.length} Mặt hàng</Text>
                <Text>
                    {cartItems.reduce(
                        (prev, curr) => prev + curr.quantity * curr.price,
                        0
                    )}
                    ₫
                </Text>
            </View>
            <TouchableOpacity
                onPress={
                    cartItems.length > 0
                        ? () => navigate.navigate("confirmorder")
                        : null
                }
            >
                <Button
                    style={{
                        backgroundColor: colors.color3,
                        borderRadius: 100,
                        padding: 5,
                        margin: 30,
                    }}
                    icon={"cart"}
                    textColor={colors.color2}
                >
                    Kiểm tra đơn hàng
                </Button>
            </TouchableOpacity>
        </View>
    )
}

export default Cart
