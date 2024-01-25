import { View, Text } from "react-native"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { handleToastOther } from "../utils/hooks"

import {
    colors,
    defaultStyles,
    inputOptions,
    formHeading,
    formStyling as styles,
    defaultContainer,
} from "../styles/styles"
import { Button, TextInput } from "react-native-paper"
import Header from "../components/Header"
import { updatePassword } from "../redux/actions/otherAction"

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const dispatch = useDispatch()

    const loading = handleToastOther(dispatch)

    const submitHandler = () => {
        dispatch(updatePassword(oldPassword, newPassword))
        setOldPassword("")
        setNewPassword("")
    }

    return (
        <View style={defaultContainer}>
            <Header back={true} />
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={[formHeading, {backgroundColor: colors.color3}]}>Thay đổi mật khẩu</Text>
                </View>
                <TextInput
                    {...inputOptions}
                    placeholder="Mật khẩu cũ"
                    secureTextEntry={true}
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />
                <TextInput
                    {...inputOptions}
                    placeholder="Mật khẩu mới"
                    secureTextEntry={true}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />

                <Button
                    loading={loading}
                    textColor={colors.color2}
                    disabled={oldPassword === "" || newPassword === ""}
                    style={styles.btnLogin}
                    onPress={submitHandler}
                >
                    Thay đổi
                </Button>
            </View>
        </View>
    )
}

export default ChangePassword
