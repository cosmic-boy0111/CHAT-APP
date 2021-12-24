import { height } from '@mui/system'
import React,{useContext} from 'react'
import {Line} from 'react-chartjs-2'
import { userContext } from '../App'

const Chart = () => {

    const {countMe} = useContext(userContext);

    return (
        <div>
            <Line 
                data={{
                    labels: ['sun','mon','tue','wed','thu','fri','sat'],
                    datasets: [{
                        label: 'MSG',
                        data: countMe,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        borderWidth : 2,
                        // backgroundColor:'red',
                        tension: 0.4,
                        borderColor:'rgba(255, 99, 132, 1)'
                    }],
                    
                }}
                
                height={300}
            />
        </div>
    )
}

export default Chart
