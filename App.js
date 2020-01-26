import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import productReducer from './store/reducers/product';
import cartReducer from './store/reducers/cart';
import ProductNavigator from './navigation/ShopNavigator';
import {composeWithDevTools} from 'redux-devtools-extension';
const rootReducer= combineReducers({
  products:productReducer,
  cart:cartReducer
});
//const store=createStore(rootReducer);
const store=createStore(rootReducer,composeWithDevTools());
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
