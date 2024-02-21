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
    const newUserFormSchema = z.object({
      age: z.string().min(1, 'at least 1 character'),
    })
  
    // STEP 2: Defining your form.
    const stepThreeForm = useForm<z.infer<typeof newUserFormSchema>>({
      resolver: zodResolver(newUserFormSchema),
      mode: 'onChange',
      defaultValues: {
        age: formContext.user.age,
      },
    })
  
    // STEP 3: Defining the submit function
    function onSubmit(values: z.infer<typeof newUserFormSchema>) {
      formContext.updateUserData(values)
        
      // add your code here to send the data to the server
    }
  
    const prevStep = () => {
      router.back()
    }
    
    return(<Form {...stepThreeForm}>
       <form
        onSubmit={stepThreeForm.handleSubmit(onSubmit)}
        className='bg-white p-6 rounded-lg shadow space-y-8'>
        <FormField
         name='age'
         control={stepThreeForm.control}
         render={({ field }) => (
          <FormItem>
           <FormLabel>Age</FormLabel>
           <FormMessage />
           <FormControl>
            <Input {...field} />
           </FormControl>
           <FormDescription className='text-gray-600'>
            Enter your age
           </FormDescription>
          </FormItem>
         )}
        />
        <div className='py-10 space-x-8'>
         <Button type='button' onClick={prevStep}>Prev</Button>  
         <Button type='submit'>Done</Button>
        </div>
       </form>
      </Form>)
  
  }