import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { Camera, CameraType } from "expo-camera"
import * as ImagePicker from "expo-image-picker"

import MyIcon from "../components/MyIcon"
import { defaultStyles } from "../styles/styles"

const CameraComponent = ({ navigation, route }) => {
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(CameraType.back)
    const [camera, setCamera] = useState(null)

    const openImagePicker = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false)
            return alert("Yêu cầu truy cập bị từ chối")

        const data = await ImagePicker.launchImageLibraryAsync()

        if (route.params?.newProduct)
            return navigation.navigate("newproduct", {
                image: data.assets[0].uri,
            })

        if (route.params?.updateProduct)
            return navigation.navigate("productimages", {
                image: data.assets[0].uri,
            })

        if (route.params?.updateProfile)
            return navigation.navigate("profile", {
                image: data.assets[0].uri,
            })
        else
            return navigation.navigate("signup", {
                image: data.assets[0].uri,
            })
    }

    const clickPicture = async () => {
        const data = await camera.takePictureAsync()

        if (route.params?.newProduct)
            return navigation.navigate("newproduct", {
                image: data.uri,
            })

        if (route.params?.updateProduct)
            return navigation.navigate("productimages", {
                image: data.uri,
            })

        if (route.params?.updateProfile)
            return navigation.navigate("profile", {
                image: data.uri,
            })
        else
            return navigation.navigate("signup", {
                image: data.uri,
            })
    }

    useEffect(() => {
        ;(async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === "granted")
        })()
    }, [])

    if (hasPermission === null) return <View />

    if (hasPermission === false)
        return (
            <View style={defaultStyles}>
                <Text>Quyền truy cập bị từ chối</Text>
            </View>
        )

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Camera
                type={type}
                style={{
                    flex: 1,
                    aspectRatio: 1,
                }}
                ratio={"4:3"}
                ref={(e) => setCamera(e)}
            />
            <View
                style={{
                    flexDirection: "row",
                    bottom: 10,
                    width: "100%",
                    justifyContent: "space-evenly",
                    position: "absolute",
                }}
            >
                <MyIcon icon="image" handler={openImagePicker} />
                <MyIcon icon="camera" handler={clickPicture} />
                <MyIcon
                    icon="camera-flip"
                    handler={() => {
                        setType((prevType) =>
                            prevType === CameraType.back
                                ? CameraType.front
                                : CameraType.back
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default CameraComponent
