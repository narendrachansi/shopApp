import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import COLORS from '../colors/Colors';
import {Platform} from 'react-native';
const ProductNavigator= createStackNavigator({
    productOverview: ProductOverviewScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS=='android' ? COLORS.primary : ''
        },
        headerTintColor: Platform.OS=='android' ? 'white': COLORS.primary
    }
});

export default createAppContainer(ProductNavigator);