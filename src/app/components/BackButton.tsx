'use client'

import { Button } from '@nextui-org/button'
import { useRouter } from 'next/router'
import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'

const BackButton = () => {
    const router = useRouter()
    return (
        <div>
            <Button isIconOnly onPress={router.back}> <IoIosArrowRoundBack /> </Button>
        </div>
    )
}

export default BackButton
