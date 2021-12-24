import { height } from '@mui/system'
import React,{useContext} from 'react'
import { PolarArea } from 'react-chartjs-2'
import { userContext } from '../App'

const Polar = () => {

    const {countPolar} = useContext(userContext); 

    return (
        <div>
            <PolarArea
                data={{
                    labels: [
                        'Delete',
                        'Confirm',
                        'Reject'
                    ],
                    datasets: [{
                        label: 'My First Dataset',
                        data: countPolar,
                        backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)'
                        ]
                    }],
                    

                }}
                
            />
        </div>
    )
}

export default Polar
