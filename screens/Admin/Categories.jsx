import { View, Text, ScrollView, StyleSheet } from "react-native"
import React, { useState } from "react"
import { Button, TextInput } from "react-native-paper"

import {
    colors,
    defaultStyles,
    formHeading,
    inputOptions,
} from "../../styles/styles"
import Header from "../../components/Header"
import CategoryCard from "../../components/CategoryCard"
import { useDispatch } from "react-redux"
import { handleToastOther, useSetCategories } from "../../utils/hooks"
import { useIsFocused } from "@react-navigation/native"
import { addCategory, deleteCategory } from "../../redux/actions/otherAction"

const loading = false

const Categories = ({ navigation }) => {
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    useSetCategories(setCategories, isFocused)

    const loading = handleToastOther(dispatch, navigation, "adminpanel")

    const deleteHandler = (id) => {
        dispatch(deleteCategory(id))
    }

    const submitHandler = () => {
        dispatch(addCategory(category))
    }
    return (
        <View style={{ ...defaultStyles, backgroundColor: colors.color5 }}>
            <Header back={true} />
            <View style={{ marginBottom: 20, paddingTop: 70 }}>
                <Text style={formHeading}>Danh mục sản phẩm</Text>
            </View>
            <ScrollView
                style={{
                    marginBottom: 20,
                }}
            >
                <View style={styles.wrapCard}>
                    {categories.map((item) => (
                        <CategoryCard
                            name={item.category}
                            id={item._id}
                            key={item._id}
                            deleteHandler={deleteHandler}
                        />
                    ))}
                </View>
            </ScrollView>

            <View style={styles.container}>
                <TextInput
                    {...inputOptions}
                    placeholder="Danh mục"
                    value={category}
                    onChangeText={setCategory}
                />

                <Button
                    textColor={colors.color2}
                    style={styles.addBtn}
                    loading={loading}
                    disabled={!category}
                    onPress={submitHandler}
                >
                    Thêm
                </Button>
            </View>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        padding: 20,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: colors.color3,
    },
    wrapCard: {
        backgroundColor: colors.color2,
        padding: 20,
        minHeight: 400,
    },
    addBtn: {
        backgroundColor: colors.color1,
        margin: 20,
        padding: 4,
    },
})
