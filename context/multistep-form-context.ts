import { createContext, useContext, useEffect, useState } from 'react'

export type User = {
	name: string
	lastname: string
	email: string
	password: string
	age: string
}

// "This will allow you to update the state within the context whenever you need to."
export interface UserContextProps {
	propertyForm: User | null
	updatePropertyForm: (property: Partial<User>) => void
}

export const NewPropertyFormContext = createContext<UserContextProps | null>({
	user: null,
	updatePropertyForm: () => null,
})

export function UserFormContextProvider({ children }) {
    const [user, setUser] = useState<User | null>(null)
   
    const updateUserData = (values: Partial<User>) => {
     setUser({ ...user, ...values })
    }
   
   // adding this code 👇🏽
    return (
     <NewUserFormContext.Provider value={{ user, updateUserData }}>
      {children}
     </NewFormContext.Provider>
    )
   }

   export const useNewUserFormContext = () => {
    const context = useContext(NewPropertyFormContext)
    if (!context) {
      throw new Error('useNewPropertyFormContext must be used within a NewUserFormContextProvider')
    }
  
    return context
  }