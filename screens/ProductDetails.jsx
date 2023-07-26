import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { colors, defaultStyles } from "../styles/styles"
import Carousel from "react-native-snap-carousel"

import Header from "../components/Header"
import { Avatar, Button } from "react-native-paper"
import { Toast } from "react-native-toast-message/lib/src/Toast"
import { useDispatch, useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"
import { getProductDetails } from "../redux/actions/productAction"

const SLIDER_WIDTH = Dimensions.get("window").width
const ITEM_WIDTH = SLIDER_WIDTH
export const iconOptions = {
    borderRadius: 5,
    backgroundColor: colors.color5,
    height: 25,
    width: 25,
}

const ProductDetails = ({ route: { params } }) => {
    const isCarousel = useRef(null)
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const {
        product: { name, price, stock, description, images },
    } = useSelector((state) => state.product)

    const incrementQty = () => {
        if (stock <= quantity)
            return Toast.show({
                type: "error",
                text1: "Hạn mức tối đa",
            })
        setQuantity((prev) => prev + 1)
    }

    const decrementQty = () => {
        if (quantity <= 1) return
        setQuantity((prev) => prev - 1)
    }

    const addToCartHandler = () => {
        if (stock === 0)
            return Toast.show({
                type: "error",
                text1: "Sản phẩm này hiện đã hết!",
            })

        dispatch({
            type: "addToCart",
            payload: {
                product: params.id,
                name,
                price,
                image: images[0]?.url,
                stock,
                quantity,
            },
        })

        Toast.show({
            type: "success",
            text1: "Thêm vào giỏ hàng thành công!",
        })
    }

    useEffect(() => {
        dispatch(getProductDetails(params.id))
    }, [dispatch, params.id, isFocused])

    return (
        <View
            style={{
                ...defaultStyles,
                padding: 0,
                backgroundColor: colors.color1,
            }}
        >
            <Header back={true} />
            {/* Carousel */}
            <Carousel
                layout="default"
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                ref={isCarousel}
                data={images}
                renderItem={CarouselCardItem}
            />
            <View
                style={{
                    backgroundColor: colors.color2,
                    padding: 35,
                    flex: 1,
                    marginTop: -380,
                    borderTopLeftRadius: 55,
                    borderTopRightRadius: 55,
                }}
            >
                <Text
                    numberOfLines={2}
                    style={{
                        fontSize: 25,
                    }}
                >
                    {name}
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "900",
                    }}
                >
                    {price} ₫
                </Text>
                <Text
                    numberOfLines={8}
                    style={{
                        letterSpacing: 1,
                        lineHeight: 20,
                        marginVertical: 15,
                    }}
                >
                    {description}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 5,
                    }}
                >
                    <Text
                        style={{
                            color: colors.color3,
                            fontWeight: "100",
                        }}
                    >
                        Số lượng:
                    </Text>
                    <View
                        style={{
                            width: 80,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity onPress={decrementQty}>
                            <Avatar.Icon
                                icon={"minus"}
                                size={20}
                                style={{ ...iconOptions }}
                            />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity onPress={incrementQty}>
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

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={addToCartHandler}
                >
                    <Button
                        icon={"cart"}
                        style={styles.button}
                        textColor={colors.color2}
                    >
                        Thêm vào giỏ hàng
                    </Button>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const CarouselCardItem = ({ item, index }) => (
    <View style={styles.container} key={index}>
        <Image source={{ uri: item.url }} style={styles.image} />
    </View>
)

export default ProductDetails

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.color1,
        width: ITEM_WIDTH,
        paddingVertical: 40,
        height: 380,
    },
    image: {
        width: ITEM_WIDTH,
        resizeMode: "contain",
        height: 250,
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
    button: {
        backgroundColor: colors.color3,
        borderRadius: 100,
        padding: 5,
        marginVertical: 35,
    },
})
