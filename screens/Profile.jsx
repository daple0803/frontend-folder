import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
import mime from "mime";

import {
    defaultStyles,
    formHeading,
    colors,
    defaultImg,
} from "../styles/styles";
import ButtonBox from "../components/ButtonBox";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "../redux/actions/userAction";
import { handleToastOther, handleToastUser } from "../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { updatePic } from "../redux/actions/otherAction";

const Profile = ({ navigation, route }) => {
    const { user } = useSelector((state) => state.user);

    const [avatar, setAvatar] = useState(defaultImg);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    const loading = handleToastUser(navigation, dispatch, "login");

    const logoutHandler = () => {
        dispatch(logout());
    };

    const navigateHandler = (text) => {
        switch (text) {
            case "Admin":
                navigation.navigate("adminpanel");
                break;
            case "Đơn hàng":
                navigation.navigate("orders");
                break;
            case "Profile":
                navigation.navigate("updateprofile");
                break;
            case "Mật khẩu":
                navigation.navigate("changepassword");
                break;
            case "Đăng xuất":
                logoutHandler();
                break;
            default:
                navigation.navigate("orders");
                break;
        }
    };
    const loadingPic = handleToastOther(dispatch, null, null, loadUser);

    useEffect(() => {
        if (route.params?.image) {
            setAvatar(route.params.image);
            const myForm = new FormData();
            myForm.append("file", {
                uri: route.params.image,
                type: mime.getType(route.params.image), //lấy ra kiểu dữ liệu của file
                name: route.params.image.split("/").pop(),
            });
            dispatch(updatePic(myForm));
        }

        dispatch(loadUser());
    }, [route.params, dispatch, isFocused]);

    useEffect(() => {
        if (user?.avatar) {
            setAvatar(user.avatar.url);
        }
    }, [user]);

    return (
        <>
            <View style={defaultStyles}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={formHeading}>Trang cá nhân</Text>
                </View>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <View style={styles.container}>
                            <Avatar.Image
                                size={100}
                                style={{ backgroundColor: colors.color1 }}
                                source={{
                                    uri: avatar,
                                }}
                            />
                            <TouchableOpacity
                                disabled={loadingPic}
                                onPress={() =>
                                    navigation.navigate("camera", {
                                        updateProfile: true,
                                    })
                                }
                            >
                                <Button
                                    disabled={loadingPic}
                                    loading={loadingPic}
                                    textColor={colors.color7}
                                >
                                    Thay đổi ảnh
                                </Button>
                            </TouchableOpacity>

                            <Text style={styles.nameText}>{user?.name}</Text>
                            <Text style={styles.emailText}>{user?.email}</Text>
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
                                    handler={navigateHandler}
                                    text={"Đơn hàng"}
                                    icon={"format-list-bulleted-square"}
                                />
                                {user?.role === "admin" && (
                                    <ButtonBox
                                        handler={navigateHandler}
                                        text={"Admin"}
                                        icon={"view-dashboard"}
                                        reverse={true}
                                    />
                                )}
                                <ButtonBox
                                    handler={navigateHandler}
                                    text={"Profile"}
                                    icon={"pencil"}
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    margin: 10,
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <ButtonBox
                                    handler={navigateHandler}
                                    text={"Mật khẩu"}
                                    icon={"security"}
                                />
                                <ButtonBox
                                    handler={navigateHandler}
                                    text={"Đăng xuất"}
                                    icon={"exit-to-app"}
                                />
                            </View>
                        </View>
                    </>
                )}
            </View>

            <Footer />
        </>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        elevation: 7,
        backgroundColor: colors.color3,
        padding: 30,
        borderRadius: 10,
        alignItems: "center",
    },
    nameText: {
        fontSize: 20,
        fontWeight: "500",
        marginTop: 10,
        color: colors.color2,
    },
    emailText: {
        fontWeight: "300",
        color: colors.color2,
        opacity: 0.5,
    },
});
