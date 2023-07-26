import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { Button } from "react-native-paper"

import { colors } from "../styles/styles"

const OderItems = ({
    id,
    price,
    address,
    orderedOn,
    status,
    paymentMethod,
    updateHandler,
    admin = false,
    loading,
    i = 0,
}) => {
    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3,
            }}
        >
            <Text
                style={{
                    ...styles.text,
                    backgroundColor:
                        i % 2 === 0 ? colors.color3 : colors.color1,
                }}
            >
                ID - #{id}
            </Text>
            <TextBox title={"Address"} value={address} i={i} />
            <TextBox title={"Ordered On"} value={orderedOn} i={i} />
            <TextBox title={"Price"} value={price} i={i} />
            <TextBox title={"Status"} value={status} i={i} />
            <TextBox title={"Payment Method"} value={paymentMethod} i={i} />

            {admin && (
                <Button
                    icon={"update"}
                    mode={"contained"}
                    textColor={i % 2 === 0 ? colors.color2 : colors.color3}
                    style={{
                        ...styles.btn,
                        backgroundColor:
                            i % 2 === 0 ? colors.color3 : colors.color2,
                    }}
                    onPress={() => updateHandler(id)}
                    loading={loading}
                    disabled={loading}
                >
                    Cập nhật
                </Button>
            )}
        </View>
    )
}

const TextBox = ({ title, value, i }) => (
    <Text
        style={{
            marginVertical: 6,
            color: i % 2 === 0 ? colors.color3 : colors.color2,
        }}
    >
        <Text style={{ fontWeight: "900" }}>{title} - </Text>
        {value}
        {title === "Price" ? " ₫" : ""}
    </Text>
)

export default OderItems

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 15,
        marginVertical: 10,
        elevation: 5,
    },
    text: {
        color: colors.color2,
        fontSize: 16,
        fontWeight: "900",
        marginHorizontal: -20,
        marginTop: -20,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    btn: {
        width: 120,
        alignSelf: "center",
        marginTop: 10,
    },
})
