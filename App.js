import {StackNavigator} from "react-navigation";
import Home from "./Home";
import Detail from "./Detail";

const App = StackNavigator({
    Home: {screen: Home},
    Detail: {screen: Detail}
});
export default App;