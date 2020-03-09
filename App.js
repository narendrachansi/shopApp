import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore,combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import productReducer from './store/reducers/product';
import cartReducer from './store/reducers/cart';
import ProductNavigator from './navigation/ShopNavigator';
import orderReducer from './store/reducers/orders';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
const rootReducer= combineReducers({
  products:productReducer,
  cart:cartReducer,
  orders: orderReducer
});
const store=createStore(rootReducer,applyMiddleware(ReduxThunk));
//const store=createStore(rootReducer,composeWithDevTools());
export default function App() {
  return (
    <Provider store={store}>
       <ProductNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
