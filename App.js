import Main from "./Main"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { StripeProvider } from "@stripe/stripe-react-native"

const stripeKey =
    "pk_test_51N66y9JMT8JayozgIPPiUnba0wvTcyuBPoCbVReCTQoovnnVRM5WLuWFRkilkm1glqAN7E1Qs7vJo6p5HHi4SMbl00ObN7Mfoy"

export default function App() {
    return (
        <StripeProvider
            threeDSecureParams={{
                backgroundColor: "#fff",
                timeout: 5,
            }}
            merchantIdentifier="daple"
            publishableKey={stripeKey}
        >
            <Provider store={store}>
                <Main />
            </Provider>
        </StripeProvider>
    )
}
