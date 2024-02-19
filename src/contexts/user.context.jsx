import { createContext, useState } from "react"

// as the actual value you want to access // default should be null to do user checks
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
	// value={} => will store the actual contextual values
	const [currentUser, setCurrentUser] = useState(null)
	const value = { currentUser, setCurrentUser }
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
