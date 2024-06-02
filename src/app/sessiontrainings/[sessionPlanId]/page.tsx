import React from 'react'
import { getAllTrainings } from '../../../../api';

const SessionTrainingPage = async ({ params }: { params: { sessionPlanId: number } }) => {
    const sessionPlanId = params.sessionPlanId;
    const trainings = await getAllTrainings();

    return (
        <div>
            {trainings.map((training) => (
                <div key={training.id} className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{ training.title }</h2>
                        <p> {training.description} </p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SessionTrainingPage
