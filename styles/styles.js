import { StyleSheet, Platform, StatusBar } from "react-native"

export const colors = {
    color1: "#c70049",
    color1_light: "#ff4a63",
    color1_light2: "#c70049cc",
    color2: "white",
    color3: "#2d2d2d",
    color4: "transparent",
    color5: "#f2f2f2",
    color6: "#f7f7f7",
    color7: "#ff6b6b"
}

export const defaultStyles = StyleSheet.create({
    padding: 35,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.color2,
})

export const inputStyling = StyleSheet.create({
    height: 45,
    backgroundColor: colors.color2,
    marginVertical: 10,
    marginHorizontal: 20,
})

export const formStyling = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.color3,
        borderRadius: 10,
        justifyContent: "center",
        elevation: 10,
    },
    headingContainer: {
        marginBottom: 20,
    },
    forgetPassword: {
        color: colors.color2,
        marginHorizontal: 20,
        marginVertical: 10,
        alignSelf: "flex-end",
        fontWeight: "100",
    },
    btnLogin: {
        backgroundColor: colors.color1,
        margin: 20,
        padding: 6,
    },
    or: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "100",
        color: colors.color2,
    },
    signup: {
        alignSelf: "center",
        color: colors.color2,
        fontSize: 18,
        textTransform: "uppercase",
        marginVertical: 10,
        marginHorizontal: 20,
    },
})

export const formHeading = {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: colors.color1_light2,
    color: colors.color2,
    padding: 5,
    borderRadius: 10,
}

export const inputOptions = {
    style: inputStyling,
    mode: "outlined",
    activeOutlineColor: colors.color1,
}

export const defaultImg =
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/626fd8140423801.6241b91e24d9c.png"
