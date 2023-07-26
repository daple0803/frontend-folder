import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import {
    defaultStyles,
    formHeading,
    colors,
    inputOptions,
    inputStyling,
} from "../../styles/styles"
import Loader from "../../components/Loader"
import { Button, TextInput } from "react-native-paper"
import SelectCategory from "../../components/SelectCategory"
import { useIsFocused } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { handleToastOther, useSetCategories } from "../../utils/hooks"
import { getProductDetails } from "../../redux/actions/productAction"
import { updateProduct } from "../../redux/actions/otherAction"

const UpdateProduct = ({ navigation, route }) => {
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)

    const { product, loading } = useSelector((state) => state.product)
    const [id, setId] = useState(route.params.id)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [category, setCategory] = useState("")
    const [categoryID, setCategoryID] = useState("")
    const [categories, setCategories] = useState([])

    useSetCategories(setCategories, isFocused)

    const submitHandler = () => {
        dispatch(updateProduct(id, name, description, price, stock, categoryID))
    }

    const loadingOther = handleToastOther(dispatch, navigation, "adminpanel")

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id, isFocused])

    useEffect(() => {
        if (product) {
            setName(product.name)
            setDescription(product.description)
            setPrice(String(product.price))
            setStock(String(product.stock))
            setCategory(product.category?.category)
            setCategoryID(product.category?._id)
        }
    }, [product])

    return (
        <>
            <View style={{ ...defaultStyles, backgroundColor: colors.color5 }}>
                <Header back={true} />
                <View style={{ marginBottom: 20, paddingTop: 70 }}>
                    <Text style={formHeading}>Cập nhật sản phẩm</Text>
                </View>

                {loading ? (
                    <Loader />
                ) : (
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
                                height: 550,
                            }}
                        >
                            <Button
                                onPress={() =>
                                    navigation.navigate("productimages", {
                                        id,
                                        images: product.images,
                                    })
                                }
                                textColor={colors.color7}
                            >
                                Quản lý hình ảnh
                            </Button>
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
                                value={stock}
                                keyboardType="number-pad"
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
                                loading={loadingOther}
                                disabled={loadingOther}
                            >
                                Cập nhật
                            </Button>
                        </View>
                    </ScrollView>
                )}
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

export default UpdateProduct
