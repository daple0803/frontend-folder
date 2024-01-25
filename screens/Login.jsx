import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { handleToastUser } from "../utils/hooks"

import {
    colors,
    defaultStyles,
    inputOptions,
    formHeading,
    formStyling as styles,
    defaultContainer,
} from "../styles/styles"
import { Button, TextInput } from "react-native-paper"
import Footer from "../components/Footer"
import { login } from "../redux/actions/userAction"

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const loading = handleToastUser(navigation, dispatch, "profile")

    const submitHandler = () => {
        dispatch(login(email, password))
    }

    return (
        <>
            <View style={defaultContainer}>
                <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={[formHeading, {backgroundColor: colors.color3}]}>Đăng nhập</Text>
                </View>
                    <TextInput
                        {...inputOptions}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        {...inputOptions}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("forgetpassword")}
                    >
                        <Text style={styles.forgetPassword}>
                            Quên mật khẩu?
                        </Text>
                    </TouchableOpacity>

                    <Button
                        loading={loading}
                        textColor={colors.color2}
                        disabled={email === "" || password === ""}
                        style={styles.btnLogin}
                        onPress={submitHandler}
                    >
                        Đăng nhập
                    </Button>
                    <Text style={styles.or}>Hoặc</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("signup")}
                    >
                        <Text style={styles.signup}>Đăng kí</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Footer activeRoute={"profile"} />
        </>
    )
}

export default Login
