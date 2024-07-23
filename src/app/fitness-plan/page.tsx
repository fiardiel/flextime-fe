import React from 'react';
import FitnessPlan from './components/FitnessPlan';
import BackButton from '../components/BackButton';
import { cookies } from 'next/headers';
import { getFitnessPlan } from '../../apis/fitness_plan_apis';
import AddFitnessPlan from './components/AddFitnessPlan';

const FitnessPlanPage = async () => {
  const token = cookies().get('userToken')?.value;
  let fitnessPlanComponent = null
  const fitnessPlan = await getFitnessPlan(token);
  if (fitnessPlan && Object.keys(fitnessPlan).length > 0) {
    fitnessPlanComponent = (
      <div className='p-52 gap-8 self-center'>
        <FitnessPlan initFitnessPlan={fitnessPlan}></FitnessPlan>
      </div>
    )
  } else {
    fitnessPlanComponent = (
      <div className='p-52 gap-8 self-center'>
        <AddFitnessPlan></AddFitnessPlan>
      </div>
    )
  }
  return (
    <div className='relative'>
      <div className='my-10 mx-14 absolute top-0 left-0 z-49'>
        <BackButton />
      </div>
      <div className='min-h-screen flex flex-col justify-center -translate-y-20'>
        {fitnessPlanComponent}
      </div>
    </div>
  );
};

export default FitnessPlanPage;
