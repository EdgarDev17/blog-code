import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
	FormControl,
	Input,
	Button,
} from 'your/component/library'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNewUserFormContext } from '/your/path/here/multistep-form-context'
import { useRouter } from 'next/navigation'

export default function Page() {
	// YOU NEED TO IMPORT THE CONTEXT FIRST
	const formContext = useNewUserFormContext()
	const router = useRouter()

	// STEP 1: Defining the form schema👇🏽
	const newPropertyFormSchema = z.object({
		name: z.string().min(3, 'at least 3 characteres'),
		lastname: z.string().min(3, 'at least 3 characteres'),
	})

	// STEP 2: Defining your form.
	const stepOneForm = useForm<z.infer<typeof newUserFormSchema>>({
		resolver: zodResolver(newUserFormSchema),
		mode: 'onChange',
		defaultValues: {
			name: formContext.user.name,
			lastname: formContext.user.lastname,
		},
	})

	// STEP 3: Defining the submit function
	function onSubmit(values: z.infer<typeof newUserFormSchema>) {
		formContext.updateUserData(values)

		router.push('/login/step_two/')
	}

	return (
		<Form {...stepOneForm}>
			<form
				onSubmit={stepOneForm.handleSubmit(onSubmit)}
				className='bg-white p-6 rounded-lg shadow space-y-8'>
				<FormField
					name='name'
					control={stepOneForm.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormMessage />
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription className='text-gray-600'>
								Enter your name
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					name='lastname'
					control={stepOneForm.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Lastname</FormLabel>
							<FormMessage />
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<div className='py-10 space-x-8'>
					<Button type='submit'>Next</Button>
				</div>
			</form>
		</Form>
	)
}
