'use client'

import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { register } from '../../../apis/user_apis'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const RegisterForm = () => {
    const router = useRouter()
    const [isVisible, setIsVisible] = React.useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible)
    const [email, setEmail] = React.useState('')
    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    const isInvalid = React.useMemo(() => {
        if (email === "") return false;

        return validateEmail(email) ? false : true;
    }, [email]);
    const [error, setError] = React.useState<Error | null>(null)

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            const { username, email, password } = Object.fromEntries(fd)
            const user = await register({ user: { username: username as string, email: email as string, password: password as string } })
            router.push('/auth/login')
            console.log(user)
        } catch (err) {
            setError(err as Error)
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className='flex flex-col'>
                    <Input
                        name='username'
                        type='text'
                        autoFocus
                        label='Username'
                        labelPlacement='outside'
                        color='default'
                        startContent={<FaUser size={12} />}
                        className='mb-4'
                        size='lg'
                        placeholder='Username for logging in'
                        required
                    />
                    <Input
                        name='email'
                        type='email'
                        autoFocus
                        label="Email"
                        labelPlacement='outside'
                        color={isInvalid ? 'danger' : 'default'}
                        errorMessage="Please input a valid email"
                        startContent={<MdEmail />}
                        className='mb-4'
                        size='lg'
                        onValueChange={setEmail}
                        isInvalid={isInvalid}
                        placeholder='Enter your email'
                        required
                    />
                    <Input
                        name='password'
                        type={isVisible ? 'text' : 'password'}
                        autoFocus
                        label="Password"
                        labelPlacement='outside'
                        startContent={<FaLock size={13} />}
                        endContent={
                            <Button radius='full' size='sm' type='button' isIconOnly className='bg-transparent' color='default' onPress={toggleVisibility}>
                                {isVisible ? (<FaEye size={15}></FaEye>) : (<FaEyeSlash size={15}></FaEyeSlash>)}
                            </Button>
                        }
                        className='mb-7'
                        size='lg'
                        required
                    />
                    {error ? (
                        <p className='text-danger text-center'> {error.message} </p>
                    ) :
                        null
                    }
                    <Link href={'/auth/login'} className='text-blue-400 mt-5 mb-3 text-center underline hover:text-blue-500' >Already have an account?</Link>
                    <Button color='primary' fullWidth type='submit'>
                        Register
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm
