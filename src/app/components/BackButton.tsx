'use client'

import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'

const BackButton = () => {
    const router = useRouter()
    return (
        <div>
            <Button className='bg-transparent p-0' size='lg' isIconOnly variant='light' onPress={router.back}> <IoIosArrowRoundBack size={50}/> </Button>
        </div>
    )
}

export default BackButton
