import React from 'react';
import { getFitnessPlanById } from '../../../apis/fitness_plan_apis';
import FitnessPlan from './components/FitnessPlan';

const FitnessPlanPage = async () => {
  try {
    const fitnessPlan = await getFitnessPlanById({ id: 1 });
    console.log("fitnessplan:", fitnessPlan)
    return (
      <div className='min-h-screen flex flex-col items-center justify-center -translate-y-20'>
        <div className='p-52 gap-8'>
          <FitnessPlan initFitnessPlan={fitnessPlan}></FitnessPlan>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching fitness plans:', error);
    return <div>Error fetching fitness plans. Please try again later.</div>;
  }
};

export default FitnessPlanPage;
