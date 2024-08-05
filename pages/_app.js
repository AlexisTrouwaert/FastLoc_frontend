import '../styles/globals.css';
import Head from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import users from '../reducers/users'
import { Provider } from 'react-redux';

const reducers = combineReducers({ users });

const persistConfig = { key: 'FastLoc', storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
 });

 const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GoogleOAuthProvider clientId="1046784655004-q5eet7kpn5ot4pamenvt1jdu5u9sdvse.apps.googleusercontent.com">
          <Head>
            <title>Next.js App</title>
          </Head>
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
    </>
  );
}

export default App;
