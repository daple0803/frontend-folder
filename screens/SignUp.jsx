import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import React, { useState, useEffect } from "react"
import mime from "mime"
import {
    colors,
    defaultStyles,
    formHeading,
    inputOptions,
    defaultImg,
    formStyling as styles,
} from "../styles/styles"
import { Avatar, Button, TextInput } from "react-native-paper"
import Footer from "../components/Footer"
import { register } from "../redux/actions/userAction"
import { handleToastUser } from "../utils/hooks"
import { useDispatch } from "react-redux"

const SignUp = ({ navigation, route }) => {
    const [avatar, setAvatar] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [pinCode, setPincode] = useState("")

    const dispatch = useDispatch()

    const disableBtn =
        !name ||
        !email ||
        !password ||
        !address ||
        !country ||
        !city ||
        !pinCode

    const submitHandler = () => {
        const myForm = new FormData()
        myForm.append("name", name)
        myForm.append("email", email)
        myForm.append("password", password)
        myForm.append("address", address)
        myForm.append("country", country)
        myForm.append("pinCode", pinCode)
        myForm.append("city", city)

        if (avatar !== "") {
            myForm.append("file", {
                uri: avatar,
                type: mime.getType(avatar),
                name: avatar.split("/").pop(),
            })
        }

        dispatch(register(myForm))
    }

    const loading = handleToastUser(navigation, dispatch, "profile")

    useEffect(() => {
        if (route.params?.image) setAvatar(route.params.image)
    }, [route.params])

    return (
        <>
            <View style={defaultStyles}>
                <View style={styles.headingContainer}>
                    <Text style={formHeading}>Đăng kí tài khoản</Text>
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
                    <View
                        style={{
                            minHeight: 900,
                        }}
                    >
                        <Avatar.Image
                            style={{
                                alignSelf: "center",
                                backgroundColor: colors.color1,
                            }}
                            size={80}
                            source={{
                                uri: avatar ? avatar : defaultImg,
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => navigation.navigate("camera")}
                        >
                            <Button textColor={colors.color7}>
                                Thay đổi avatar
                            </Button>
                        </TouchableOpacity>

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
                            secureTextEntry={true}
                            placeholder="Mật khẩu"
                            value={password}
                            onChangeText={setPassword}
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
                            placeholder="Quốc gia"
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
                            disabled={disableBtn}
                            style={styles.btnLogin}
                            onPress={submitHandler}
                        >
                            Đăng kí
                        </Button>
                        <Text style={styles.or}>Hoặc</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate("login")}
                        >
                            <Text style={styles.signup}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            <Footer activeRoute={"profile"} />
        </>
    )
}

export default SignUp
