import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import Header from "../components/Header";
import { colors, defaultStyles } from "../styles/styles";
import Heading from "../components/Heading";
import ConfirmOrderItem from "../components/ConfirmOrderItem";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";

const ConfirmOrder = () => {
    const navigate = useNavigation();

    const { cartItems } = useSelector((state) => state.cart);

    const [itemsPrice] = useState(
        cartItems.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
    );
    const [shippingCharges] = useState(itemsPrice > 100000 ? 20000 : 0);
    const [tax] = useState(Number((0.1 * itemsPrice).toFixed()));
    const [totalAmount] = useState(itemsPrice + shippingCharges + tax);
    return (
        <View style={{ ...defaultStyles }}>
            <Header back={true} />
            <Heading
                containerStyle={{
                    paddingTop: 70,
                }}
                text1="Thanh toán"
                text2="Giỏ hàng"
            />
            <View
                style={{
                    paddingVertical: 20,
                    flex: 1,
                }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {cartItems.map((item, index) => (
                        <ConfirmOrderItem
                            key={item.product}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                        />
                    ))}
                </ScrollView>
            </View>
            <PriceTag heading={"Giá"} value={itemsPrice} />
            <PriceTag heading={"Thuế"} value={tax} />
            <PriceTag heading={"Phí giao hàng"} value={shippingCharges} />
            <PriceTag heading={"Tổng "} value={totalAmount} />

            <TouchableOpacity
                onPress={() =>
                    navigate.navigate("payment", {
                        itemsPrice,
                        shippingCharges,
                        tax,
                        totalAmount,
                    })
                }
            >
                <Button
                    style={{
                        backgroundColor: colors.color3,
                        borderRadius: 100,
                        padding: 5,
                        margin: 10,
                    }}
                    textColor={colors.color2}
                    icon={"diamond-stone"}
                >
                    Thanh toán
                </Button>
            </TouchableOpacity>
        </View>
    );
};

const PriceTag = ({ heading, value }) => (
    <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 5,
        }}
    >
        <Text style={{ fontWeight: "800" }}>{heading}</Text>
        <Text>{value} ₫</Text>
    </View>
);
export default ConfirmOrder;
