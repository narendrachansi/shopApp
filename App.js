import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import productReducer from './store/reducers/product';
import ProductNavigator from './navigation/ShopNavigator';

const rootReducer= combineReducers({
  products:productReducer
});
const store=createStore(rootReducer);

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
