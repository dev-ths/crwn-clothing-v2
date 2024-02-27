import { takeLatest, put, all, call } from "redux-saga/effects"

import { USER_ACTION_TYPES } from "./user.types"
import { signInSuccess, signInFailed } from "./user.action"

import { getCurrentUser, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
	try {
		const userShapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails)
		yield put(signInSuccess({ id: userShapshot.id, ...userShapshot.data() }))
	} catch (error) {
		yield put(signInFailed)
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser)
		if (!userAuth) return

		yield call(getSnapshotFromUserAuth, userAuth)
	} catch (error) {
		yield put(signInFailed)
	}
}

export function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSagas() {
	yield all([call(onCheckUserSession)])
}
