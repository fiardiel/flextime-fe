'use client'
import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from "@nextui-org/react";
import { ITraining } from '@/types/fitness_plan/Training';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { IoIosAdd } from 'react-icons/io';

interface TrainingTableProps {
    trainings: ITraining[]
}

const TrainingTable: React.FC<TrainingTableProps> = ({ trainings }) => {
    const [filteredTrainings, setFilteredTrainings] = React.useState<ITraining[]>(trainings)
    const [search, setSearch] = React.useState<string>('')
    const filterTrainings = (search: string) => {
        setFilteredTrainings(trainings.filter((training) => {
            return training.title.toLowerCase().includes(search.toLowerCase())
        }))
    }
    return (
        <div>
            <div className='flex flex-row gap-4 my-5'>
                <Input
                    startContent={<FiSearch />}
                    size='lg'
                    radius='lg'
                    fullWidth={false}
                    placeholder='Search Training'
                    className='max-w-sm'
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        filterTrainings(e.target.value)
                    }}
                />
                <Button color='primary' isIconOnly fullWidth={false} size='lg'> <IoIosAdd size={30} /> </Button>
            </div>
            <Table aria-label="Example empty table">
                <TableHeader>
                    <TableColumn>Training</TableColumn>
                    <TableColumn>Type</TableColumn>
                    <TableColumn>Description</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody items={filteredTrainings} emptyContent={"No rows to display."}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.training_type}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>
                                <div className='flex'>
                                    <Button isIconOnly className='bg-transparent' variant='light'>
                                        <FaRegEdit size={20} />
                                    </Button>
                                    <Button color='danger' variant='light' isIconOnly>
                                        <MdDeleteOutline size={25} />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default TrainingTable
