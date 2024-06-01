import React from 'react';
import SessionPlansButton from '../components/SessionPlansButton';

interface FitnessPlan {
  title: string;
  id: number
  user: string;
}

const FitnessPlanPage = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/fitnessplans/');
    if (!res.ok) {
      throw new Error('Failed to fetch fitness plans');
    }
    const data = await res.json();
    const fitnessPlans: FitnessPlan[] = data.results;

    return (
      <div className='min-h-screen flex flex-col items-center justify-center -translate-y-20'>
        <div className='grid grid-cols-3 content-center justify-items-start p-10 gap-8'>
          <h1 className='text-5xl font-bold font-mono mb-2 col-span-3'>your fitness plan:</h1>
          {fitnessPlans.map((plan) => (
            <div key={plan.id} className="scale-150 origin-top-left hover:-translate-y-2 transition card bg-card-bg w-72 shadow-xl">
              <div className="card-body">
                <p className="card-title -mb-2 font-extrabold font-mono">
                  {plan.title}
                </p>
                <p className='text-gray-500 mb-4 text-sm'>Flex up with FlexTime!</p>
                <div className="card-actions justify-end">
                  <SessionPlansButton fitnessPlanId={plan.id}></SessionPlansButton>
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
