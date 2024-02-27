import { compose, createStore, applyMiddleware } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import logger from "redux-logger"

import createSagaMiddleWare from "redux-saga"
import { rootSaga } from "./root-saga"

import { rootReducer } from "./root-reducer"

const middleWares = [process.env.NODE_ENV === "development" && logger, sagaMiddleWare].filter(
	Boolean,
)

const composeEnhancer =
	(process.env.NODE_ENV !== "production" &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["user"],
}

const sagaMiddleWare = createSagaMiddleWare()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleWare.run(rootSaga)

export const persistor = persistStore(store)
