import React from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '~/components/ui/input-otp'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {   
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage
} from '~/components/ui/form'

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 4 characters.",
  }),
})
 
const Pin = () => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
        pin: "",
        },
    })

    return (
        <Form {...form}>
            <form  className="w-full max-w-full">
                <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                        <FormControl>
                            <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} className="h-15 w-15 text-xl" />
                                <InputOTPSlot index={1} className="h-15 w-15 text-xl"/>
                                <InputOTPSlot index={2} className="h-15 w-15 text-xl"/>
                                <InputOTPSlot index={3} className="h-15 w-15 text-xl"/>
                            </InputOTPGroup>
                            </InputOTP>
                        </FormControl>
                        <FormDescription>
                            Please enter your PIN.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
            </form>
        </Form>
    )
}

export default Pin