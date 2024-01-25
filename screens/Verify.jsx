import { View, Text, TouchableOpacity } from "react-native"
import React, { useState } from "react"

import {
    colors,
    defaultContainer,
    defaultStyles,
    formHeading,
    inputOptions,
    formStyling as styles,
} from "../styles/styles"
import { Button, TextInput } from "react-native-paper"
import Footer from "../components/Footer"
import { handleToastOther } from "../utils/hooks"
import { useDispatch } from "react-redux"
import { resetPassword } from "../redux/actions/otherAction"

const Verify = ({ navigation }) => {
    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const loading = handleToastOther(dispatch, navigation, "login")
    const submitHandler = () => {
        dispatch(resetPassword(otp, password))
    }

    return (
        <>
            <View style={defaultContainer}>
                <View style={styles.container}>
                    <View style={styles.headingContainer}>
                        <Text style={[formHeading, {backgroundColor: colors.color3}]}>Thay đổi mật khẩu</Text>
                    </View>
                    <TextInput
                        {...inputOptions}
                        placeholder="Mã OTP"
                        keyboardType="number-pad"
                        value={otp}
                        onChangeText={setOtp}
                    />
                    <TextInput
                        {...inputOptions}
                        placeholder="Mật khẩu mới"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Button
                        loading={loading}
                        textColor={colors.color2}
                        disabled={otp === "" || password === ""}
                        style={styles.btnLogin}
                        onPress={submitHandler}
                    >
                        Thay đổi
                    </Button>
                    <Text style={styles.or}>Hoặc</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("forgetpassword")}
                    >
                        <Text style={styles.signup}>Gửi lại mã OTP</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Footer activeRoute={"profile"} />
        </>
    )
}

export default Verify
