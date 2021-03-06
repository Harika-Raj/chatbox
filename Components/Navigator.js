import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./HomeScreen";
import ChatScreen from "./ChatScreen";
import LoginScreen from './LoginScreen';
import ProfilePage from "./ProfilePage";

const isRegistered = false;
const initialScreen = isRegistered ? "HomeScreen" : "LoginScreen";
const Navigator = createStackNavigator(
    {
        LoginScreen:LoginScreen,
        HomeScreen: HomeScreen,
        ChatScreen: ChatScreen,
        ProfilePage : ProfilePage,
    },
    {
        initialRouteName : initialScreen,
        headerMode : 'none'
    }
);
export default AppContainer = createAppContainer(Navigator);
