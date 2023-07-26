import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native"
import React, { useState, useEffect } from "react"

import { colors, defaultStyles, formHeading } from "../../styles/styles"
import Header from "../../components/Header"
import ImageCard from "../../components/ImageCard"
import { Avatar, Button } from "react-native-paper"
import { handleToastOther } from "../../utils/hooks"
import { useDispatch } from "react-redux"
import mime from "mime"
import {
    deleteProductImage,
    updateProductImage,
} from "../../redux/actions/otherAction"

const ProductImages = ({ navigation, route }) => {
    const [images] = useState(route.params.images)
    const [productId] = useState(route.params.id)
    const [image, setImage] = useState(null)
    const [imageChanged, setImageChanged] = useState(false)
    const dispatch = useDispatch()

    const loading = handleToastOther(dispatch, navigation, "adminpanel")

    const deleteHandler = (imageId) => {
        dispatch(deleteProductImage(productId, imageId))
    }

    const submitHandler = () => {
        const myForm = new FormData()

        myForm.append("file", {
            uri: image,
            type: mime.getType(image),
            name: image.split("/").pop(),
        })

        dispatch(updateProductImage(productId, myForm))
    }

    useEffect(() => {
        if (route.params?.image) {
            setImage(route.params.image)
            setImageChanged(true)
        }
    }, [route.params])

    return (
        <View
            style={{
                ...defaultStyles,
                backgroundColor: colors.color5,
            }}
        >
            <Header back={true} />
            <View style={{ marginBottom: 20, paddingTop: 70 }}>
                <Text style={formHeading}>Hình ảnh sản phẩm</Text>
            </View>
            <ScrollView
                style={{
                    marginBottom: 20,
                }}
            >
                <View
                    style={{
                        backgroundColor: colors.color2,
                        padding: 40,
                        minHeight: 400,
                        borderRadius: 10,
                    }}
                >
                    {images.map((image) => (
                        <ImageCard
                            key={image._id}
                            src={image.url}
                            id={image._id}
                            deleteHandler={deleteHandler}
                        />
                    ))}
                </View>
            </ScrollView>

            <View
                style={{
                    padding: 20,
                    borderRadius: 10,
                    backgroundColor: colors.color3,
                }}
            >
                <Image
                    style={{
                        backgroundColor: colors.color2,
                        width: 100,
                        height: 100,
                        alignSelf: "center",
                        resizeMode: "contain",
                        borderRadius: 10,
                    }}
                    source={{
                        uri: image,
                    }}
                />

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity
                        TouchableOpacity={0.8}
                        onPress={() =>
                            navigation.navigate("camera", {
                                updateProduct: true,
                            })
                        }
                    >
                        <Avatar.Icon
                            icon={"camera"}
                            size={30}
                            style={{
                                backgroundColor: colors.color2,
                                margin: 10,
                            }}
                            color={colors.color3}
                        />
                    </TouchableOpacity>
                </View>

                <Button
                    style={{
                        backgroundColor: colors.color1,
                        padding: 6,
                    }}
                    textColor={colors.color2}
                    loading={loading}
                    onPress={submitHandler}
                    disabled={!imageChanged}
                >
                    Thêm
                </Button>
            </View>
        </View>
    )
}

export default ProductImages
