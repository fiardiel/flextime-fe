import React from 'react';
import SessionPlansButton from '../components/SessionPlansButton';
import Link from 'next/link';

interface FitnessPlan {
  title: string;
  url: string;
  user: string;
}

const FitnessPlanPage = async () => {
  try {
    const res = await fetch('http://localhost:8000/fitnessplans/');
    if (!res.ok) {
      throw new Error('Failed to fetch fitness plans');
    }
    const data = await res.json();
    const fitnessPlans:FitnessPlan[] = data.results;

    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-bold mb-5'>Your Fitness Plan!</h1>
        <div className='grid grid-cols-3 content-center justify-items-center p-10 gap-8'>
        {fitnessPlans.map((plan) => (
          <div key={plan.url} className="scale-125 col-span-3 hover:-translate-y-2 transition card w-96 bg-card-bg shadow-xl">
          <div className="card-body">
            <p className="card-title -mb-1">
              {plan.title}
            </p>
            <p className='text-gray-500 mb-4'>Flex up with FlexTime!</p>
            <div className="card-actions justify-end">
              <SessionPlansButton/>
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
