'use client'

// replace 'your/path/here' with the name of your folder where the context is located
import { UserFormContextProvider } from 'your/path/here/multistep-form-context'

export default function Layout({ children }) {
	return (
		<main>
			<UserFormContextProvider>{children}</UserFormContextProvider>
			<div className='h-36 md:h-0'></div>
		</main>
	)
}
