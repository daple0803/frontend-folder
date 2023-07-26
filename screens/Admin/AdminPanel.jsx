import { View, Text, ScrollView } from "react-native"
import React from "react"
import { defaultStyles, formHeading } from "../../styles/styles"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import { colors } from "../../styles/styles"
import ButtonBox from "../../components/ButtonBox"
import ProductListHeading from "../../components/ProductListHeading"

import ProductItems from "../../components/ProductListItems"
import Chart from "../../components/Chart"
import { useDispatch, useSelector } from "react-redux"
import { handleToastOther, useAdminProducts } from "../../utils/hooks"
import { useIsFocused } from "@react-navigation/native"
import { deleteProduct } from "../../redux/actions/otherAction"
import { getAdminProducts } from "../../redux/actions/productAction"

const AdminPanel = ({ navigation }) => {
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const { loading, products, inStock, outOfStock } = useAdminProducts(
        dispatch,
        isFocused
    )

    const deleteProductHandler = (productId) => {
        dispatch(deleteProduct(productId))
    }

    const loadingDelete = handleToastOther(
        dispatch,
        navigation,
        null,
        null,
        getAdminProducts
    )

    const navigationHandler = (text) => {
        switch (text) {
            case "Danh mục":
                navigation.navigate("categories")
                break
            case "Hóa đơn":
                navigation.navigate("adminorders")
                break
            case "Sản phẩm":
                navigation.navigate("newproduct")
                break
            default:
                navigation.navigate("adminorders")
                break
        }
    }
    return (
        <View style={defaultStyles}>
            <Header back={true} />
            <View style={{ paddingTop: 70, marginBottom: 20 }}>
                <Text style={formHeading}>Trang quản trị viên</Text>
            </View>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <View
                        style={{
                            backgroundColor: colors.color3,
                            borderRadius: 20,
                            alignItems: "center",
                        }}
                    >
                        <Chart inStock={inStock} outOfStock={outOfStock} />
                    </View>
                    <View>
                        <View
                            style={{
                                flexDirection: "row",
                                margin: 10,
                                justifyContent: "space-between",
                            }}
                        >
                            <ButtonBox
                                icon={"plus"}
                                text={"Sản phẩm"}
                                handler={navigationHandler}
                            />

                            <ButtonBox
                                icon={"format-list-bulleted-square"}
                                text={"Hóa đơn"}
                                handler={navigationHandler}
                                reverse={true}
                            />

                            <ButtonBox
                                icon={"plus"}
                                text={"Danh mục"}
                                handler={navigationHandler}
                            />
                        </View>
                    </View>

                    <ProductListHeading />

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            {!loadingDelete &&
                                products.map((item, index) => (
                                    <ProductItems
                                        navigate={navigation}
                                        deleteHandler={deleteProductHandler}
                                        key={item._id}
                                        id={item._id}
                                        i={index}
                                        price={item.price}
                                        stock={item.stock}
                                        name={item.name}
                                        category={item.category?.category}
                                        imgSrc={item.images[0].url}
                                    />
                                ))}
                        </View>
                    </ScrollView>
                </>
            )}
        </View>
    )
}

export default AdminPanel
