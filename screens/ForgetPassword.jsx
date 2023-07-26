import { View, Text, TouchableOpacity } from "react-native"
import React, { useState } from "react"

import {
    colors,
    defaultStyles,
    formHeading,
    inputOptions,
    formStyling as styles,
} from "../styles/styles"
import { Button, TextInput } from "react-native-paper"
import Footer from "../components/Footer"
import { useDispatch } from "react-redux"
import { forgetPassword } from "../redux/actions/otherAction"
import { handleToastOther } from "../utils/hooks"

const ForgetPassword = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const loading = handleToastOther(dispatch, navigation, "verify")

    const submitHandler = () => {
        dispatch(forgetPassword(email))
    }

    return (
        <>
            <View style={defaultStyles}>
                <View style={styles.headingContainer}>
                    <Text style={formHeading}>Quên mật khẩu</Text>
                </View>

                <View style={styles.container}>
                    <TextInput
                        {...inputOptions}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Button
                        loading={loading}
                        textColor={colors.color2}
                        disabled={email === ""}
                        style={styles.btnLogin}
                        onPress={submitHandler}
                    >
                        Gửi mã xác nhận
                    </Button>
                    <Text style={styles.or}>Hoặc</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("login")}
                    >
                        <Text style={styles.signup}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Footer activeRoute={"profile"} />
        </>
    )
}

export default ForgetPassword
