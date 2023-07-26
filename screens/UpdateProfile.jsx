import { View, Text, ScrollView } from "react-native"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleToastOther } from "../utils/hooks"

import {
    colors,
    defaultStyles,
    formHeading,
    inputOptions,
    formStyling as styles,
} from "../styles/styles"
import { Button, TextInput } from "react-native-paper"
import Header from "../components/Header"
import { updateProfile } from "../redux/actions/otherAction"

const UpdateProfile = ({ navigation }) => {
    const { user } = useSelector((state) => state.user)

    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [address, setAddress] = useState(user?.address)
    const [city, setCity] = useState(user?.city)
    const [country, setCountry] = useState(user?.country)
    const [pinCode, setPincode] = useState(user?.pinCode.toString())

    const dispatch = useDispatch()
    const loading = handleToastOther(dispatch, navigation, "profile")

    const submitHandler = () => {
        dispatch(updateProfile(name, email, address, city, country, pinCode))
    }

    return (
        <View style={defaultStyles}>
            <Header back={true} />
            <View style={{ marginBottom: 20, paddingTop: 70 }}>
                <Text style={formHeading}>Cập nhật thông tin</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    padding: 20,
                    elevation: 10,
                    borderRadius: 10,
                    backgroundColor: colors.color3,
                }}
            >
                <View>
                    <TextInput
                        {...inputOptions}
                        placeholder="Họ tên"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        {...inputOptions}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        {...inputOptions}
                        placeholder="Địa chỉ"
                        value={address}
                        onChangeText={setAddress}
                    />

                    <TextInput
                        {...inputOptions}
                        placeholder="Thành phố"
                        value={city}
                        onChangeText={setCity}
                    />
                    <TextInput
                        {...inputOptions}
                        placeholder="Tỉnh thành"
                        value={country}
                        onChangeText={setCountry}
                    />

                    <TextInput
                        {...inputOptions}
                        placeholder="Mã PIN"
                        value={pinCode}
                        onChangeText={setPincode}
                    />

                    <Button
                        loading={loading}
                        textColor={colors.color2}
                        style={styles.btnLogin}
                        onPress={submitHandler}
                    >
                        Cập nhật
                    </Button>
                </View>
            </ScrollView>
        </View>
    )
}

export default UpdateProfile
