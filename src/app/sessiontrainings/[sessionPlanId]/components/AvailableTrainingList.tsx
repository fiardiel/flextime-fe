import { ITraining } from '../../../../../types/Training';
import AvailableTraining from './AvailableTraining';

interface AvailableTrainingProps {
    availableTrainings: ITraining[];
}

const AvailableTrainingList: React.FC<AvailableTrainingProps> = ( {availableTrainings} ) => {  
  return (
    <div> 
      <div className='grid grid-cols-3 content-center justify-items-start p-10 gap-9'>
          {availableTrainings.map(training => (
            <AvailableTraining key={training.id} training={training}/>
          ))}
      </div>
    </div>
  )
}

export default AvailableTrainingList
