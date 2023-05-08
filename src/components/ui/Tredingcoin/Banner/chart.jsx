import { useState ,useEffect } from 'react'
import { HistoricalChart} from '../api'
import { Line } from 'react-chartjs-2';
import axios from 'axios'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import { CryptoState } from '../CryptoContext'
import {CircularProgress }from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import SelectButton from './SelectButton';

const Chartdaigrame = ({}) => {
    const { id } = useParams()
    const [historic, sethistoric] = useState([])  
    const [days, setdays] = useState(1)
    const { currency,symbol} =CryptoState()
    const [loading, setloading] = useState(false)

    const fetchchart=async()=>{
        const {data}= await axios.get(HistoricalChart(id,days,currency))
        setloading(true)
        sethistoric(data.prices)  
    }
    useEffect(() => {
        fetchchart();
      }, [days]);

    console.log(days);
    const chartDays=[
        {
          label: "24 Hours",
          value: 1,
        },
        {
          label: "30 Days",
          value: 30,
        },
        {
          label: "3 Months",
          value: 90,
        },
        {
          label: "1 Year",
          value: 365,
        },
      ];
    useEffect(() => {
        
        fetchchart()
    }, [currency])

  return (
    <>

   <Container style={{textAlign:"center" , marginTop:"60px"}}>
        {
            !historic  || loading == false ? (
                <CircularProgress style={{textAlign:"center" , marginTop:"230px" ,marginBottom:"230px"}} />
            ):(
      <>
     <Line
        data={{
            labels: historic.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
            }),

            datasets: [
                {
                data: historic.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days ) in ${currency}`,
                borderColor: "#EEBC1D",
                },
            ],
            }}
            options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }} /> 
        
        <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                key={day.value}
                onClick={() => {setdays(day.value);
                
                    setloading(false)
                  
                }}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
              ))}
            </div>
        </>
        
            )
        
        }
        
    </Container>
     
    </>
  )
}

export default Chartdaigrame