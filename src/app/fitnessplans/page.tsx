import React from 'react';
import { getAllFitnessPlans } from '../../../api';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import { FaClock } from 'react-icons/fa';

interface FitnessPlan {
  title: string;
  id: number
  user: string;
}

const FitnessPlanPage = async () => {
  try {
    const fitnessPlans = await getAllFitnessPlans();
    return (
      <div className='min-h-screen flex flex-col items-center justify-center -translate-y-20'>
        <div className='grid grid-cols-3 content-center justify-items-start p-10 gap-8'>
          <h1 className='text-5xl font-bold font-mono mb-2 col-span-3'>your fitness plan:</h1>
          {fitnessPlans.map((plan) => (
            <div key={plan.id} className="scale-150 origin-top-left hover:-translate-y-2 transition card bg-card-bg w-72 shadow-xl col-span-3 mb-20">
              <div className="card-body">
                <p className="card-title -mb-2 font-extrabold font-mono">
                  {plan.title}
                </p>
                <p className='text-gray-500 mb-4 text-sm'>Flex up with FlexTime!</p>
                <div className="card-actions justify-end">
                  <Link href={`sessionplans/${plan.id}`}>
                    <Button outline gradientDuoTone={'pinkToOrange'} className='flex items-center'>
                      <span className='mr-2'> Session Plans </span>
                      <span className='self-center'> <FaClock /> </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching fitness plans:', error);
    return <div>Error fetching fitness plans. Please try again later.</div>;
  }
};

export default FitnessPlanPage;
