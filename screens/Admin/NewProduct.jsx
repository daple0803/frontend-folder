import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import {
    defaultStyles,
    formHeading,
    colors,
    inputOptions,
    inputStyling,
} from "../../styles/styles"
import { Avatar, Button, TextInput } from "react-native-paper"
import SelectCategory from "../../components/SelectCategory"
import { handleToastOther, useSetCategories } from "../../utils/hooks"
import { useIsFocused } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import mime from "mime"
import { createProduct } from "../../redux/actions/otherAction"

const NewProduct = ({ navigation, route }) => {
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)

    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [category, setCategory] = useState("Choose Category")
    const [categoryID, setCategoryID] = useState(undefined)
    const [categories, setCategories] = useState([])

    useSetCategories(setCategories, isFocused)

    const disableBtnCondition =
        !name || !description || !price || !stock || !image

    const submitHandler = () => {
        const myForm = new FormData()
        myForm.append("name", name)
        myForm.append("description", description)
        myForm.append("price", price)
        myForm.append("stock", stock)
        myForm.append("file", {
            uri: image,
            type: mime.getType(image),
            name: image.split("/").pop(),
        })

        if (categoryID) myForm.append("category", categoryID)

        dispatch(createProduct(myForm))
    }

    const loading = handleToastOther(dispatch, navigation, "adminpanel")

    useEffect(() => {
        if (route.params?.image) setImage(route.params.image)
    }, [route.params])

    return (
        <>
            <View style={{ ...defaultStyles, backgroundColor: colors.color5 }}>
                <Header back={true} />
                <View style={{ marginBottom: 20, paddingTop: 70 }}>
                    <Text style={formHeading}>Thêm sản phẩm mới</Text>
                </View>

                <ScrollView
                    style={{
                        padding: 20,
                        elevation: 6,
                        borderRadius: 10,
                        backgroundColor: colors.color3,
                    }}
                >
                    <View
                        style={{
                            justifyContent: "center",
                            height: 650,
                        }}
                    >
                        <View
                            style={{
                                width: 80,
                                height: 80,
                                alignSelf: "center",
                                marginBottom: 20,
                            }}
                        >
                            <Avatar.Image
                                size={80}
                                style={{
                                    backgroundColor: colors.color1,
                                }}
                                source={{
                                    uri: image ? image : null,
                                }}
                            />
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("camera", {
                                        newProduct: true,
                                    })
                                }
                            >
                                <Avatar.Icon
                                    icon={"camera"}
                                    size={30}
                                    color={colors.color3}
                                    style={{
                                        backgroundColor: colors.color2,
                                        position: "absolute",
                                        bottom: 0,
                                        right: -5,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            {...inputOptions}
                            placeholder="Tên sản phẩm"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            {...inputOptions}
                            placeholder="Mô tả sản phẩm"
                            value={description}
                            onChangeText={setDescription}
                        />
                        <TextInput
                            {...inputOptions}
                            placeholder="Giá bán"
                            value={price}
                            keyboardType="number-pad"
                            onChangeText={setPrice}
                        />
                        <TextInput
                            {...inputOptions}
                            placeholder="Số lượng hiện có"
                            keyboardType="number-pad"
                            value={stock}
                            onChangeText={setStock}
                        />
                        <Text
                            style={{
                                ...inputStyling,
                                textAlign: "center",
                                borderRadius: 3,
                                textAlignVertical: "center",
                            }}
                            onPress={() => setVisible(true)}
                        >
                            {category}
                        </Text>
                        <Button
                            textColor={colors.color2}
                            style={{
                                backgroundColor: colors.color1,
                                margin: 20,
                                padding: 6,
                            }}
                            onPress={submitHandler}
                            loading={loading}
                            disabled={disableBtnCondition || loading}
                        >
                            Thêm
                        </Button>
                    </View>
                </ScrollView>
            </View>
            <SelectCategory
                visible={visible}
                setVisible={setVisible}
                setCategory={setCategory}
                setCategoryID={setCategoryID}
                categories={categories}
            />
        </>
    )
}

export default NewProduct
