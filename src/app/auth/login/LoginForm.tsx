'use client'

import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa'
import { login } from '../../../apis/user_apis'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { Spinner } from '@nextui-org/react'

const LoginForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)
    const [isVisible, setIsVisible] = React.useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible)
    const [error, setError] = React.useState<Error | null>(null)

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            setIsLoading(true)
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            const { username, password } = Object.fromEntries(fd)
            const token = await login({ loginForm: { username: username as string, password: password as string } })
            Cookies.set('userToken', token)
            router.prefetch('/')
            router.push('/')
            console.log(token)
        } catch (err) {
            setError(err as Error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <form className='gap-6' onSubmit={submitHandler}>
                <Input
                    name='username'
                    type='text'
                    autoFocus
                    label="Username"
                    labelPlacement='outside'
                    startContent={<FaUser size={12} />}
                    className='mb-12'
                    size='lg'
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
                    size='lg'
                    required
                />
                {error ? (
                    <p className='text-danger text-center p-5'> {error.message} </p>
                ) :
                    null
                }
                <Button className={error ? `mt-2` : 'mt-12'} color={isLoading ? 'default' : 'primary'} fullWidth type='submit'>
                    {isLoading ? (<Spinner color='white'/> ): 'Login'}
                </Button>
            </form>
        </div>
    )
}

export default LoginForm
