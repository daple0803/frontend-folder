import { View, Text, ScrollView } from "react-native"
import React from "react"

import { colors, defaultStyles, formHeading } from "../../styles/styles"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import OderItems from "../../components/OrderItems"
import { useIsFocused } from "@react-navigation/native"
import { handleToastOther, useGetOrders } from "../../utils/hooks"
import { Headline } from "react-native-paper"
import { useDispatch } from "react-redux"
import { processOrder } from "../../redux/actions/otherAction"

const AdminOrders = ({ navigation }) => {
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const { loading, orders } = useGetOrders(isFocused, true)
    const processOderLoading = handleToastOther(
        dispatch,
        navigation,
        "adminpanel"
    )

    const updateHandler = (id) => {
        dispatch(processOrder(id))
    }

    return (
        <View style={{ ...defaultStyles, backgroundColor: colors.color5 }}>
            <Header back={true} />
            <View style={{ marginBottom: 20, paddingTop: 70 }}>
                <Text style={formHeading}>Danh sách hóa đơn</Text>
            </View>
            {loading ? (
                <Loader />
            ) : (
                <View
                    style={{
                        padding: 10,
                        flex: 1,
                    }}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {orders.length > 0 ? (
                            orders.map((item, index) => (
                                <OderItems
                                    key={item._id}
                                    id={item._id}
                                    i={index}
                                    price={item.totalAmount}
                                    status={item.orderStatus}
                                    paymentMethod={item.paymentMethod}
                                    orderedOn={item.createdAt}
                                    address={`${item.shippingInfo.address},${item.shippingInfo.city},${item.shippingInfo.country}, ${item.shippingInfo.pinCode}`}
                                    admin={true}
                                    updateHandler={updateHandler}
                                    loading={processOderLoading}
                                />
                            ))
                        ) : (
                            <Headline style={{ textAlign: "center" }}>
                                Hiện chưa có đơn hàng nào!
                            </Headline>
                        )}
                    </ScrollView>
                </View>
            )}
        </View>
    )
}

export default AdminOrders
