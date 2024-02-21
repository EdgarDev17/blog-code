import { Form, FormField, FormItem, FormLabel, FormMessage, FormDescription, FormControl, Input, Button } from 'your/component/library'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNewUserFormContext } from '/your/path/here/multistep-form-context'
import { useRouter } from 'next/navigation'


export default Page(){
    // YOU NEED TO IMPORT THE CONTEXT FIRST 
     const formContext = useNewUserFormContext()
     const router = useRouter()
  
    // STEP 1: Defining the form schema👇🏽
    const newUserFormSchema= z.object({
      email: z.string().min(3, 'at least 3 characteres'),
      password: z.string().min(3, 'at least 3 characteres'),
     
    })
  
    // STEP 2: Defining your form.
    const stepTwoForm = useForm<z.infer<typeof newUserFormSchema>>({
      resolver: zodResolver(newUserFormSchema),
      mode: 'onChange',
      defaultValues: {
        email: formContext.user.email,
        password: formContext.user.password,
      },
    })
  
    // STEP 3: Defining the submit function
    function onSubmit(values: z.infer<typeof newUserFormSchema>) {
      formContext.updateUserData(values)
  
      router.push('/login/step_three/')
    }
  
    const prevStep = () => {
      router.back()
    }
    
    return(<Form {...stepTwoForm}>
       <form
        onSubmit={stepTwoForm.handleSubmit(onSubmit)}
        className='bg-white p-6 rounded-lg shadow space-y-8'>
        <FormField
         name='name'
         control={stepTwoForm.control}
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
         control={stepTwoForm.control}
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
         <Button type='button' onClick={prevStep}>Prev</Button>  
         <Button type='submit'>Next</Button>
        </div>
       </form>
      </Form>)
  
  }