import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";
import FooterFront from '../shared/FooterFront';
import HeaderSignedInClient from '../shared/HeaderSignedInClient';
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import {
  Cell,
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";


function Dashboard() {
  const colors = scaleOrdinal(schemeCategory10).range();



  const [gyms, setGyms] = useState([]);
  const [count, setCount] = useState(0);
  const [countgym, setCountgym] = useState(0);

  const token=localStorage.getItem('token');
  const idu = localStorage.getItem('userId') ;


  useEffect(() => {
    async function fetchGyms() {
      const response = await fetch(`https://fitmind-backend.onrender.com/api/gyms/getGymsByManager/${idu}`);
      const data = await response.json();
      setGyms(data);
      setCount(data.length);

      const countByLocation = data.reduce((acc, gym) => {
        acc[gym.localisation] = (acc[gym.localisation] || 0) + 1;
        return acc;
      }, {});

      setCountgym(countByLocation['desired_location'] || 0);
      console.log(token);
    }

    fetchGyms();
  }, []);

  const dataa = {
   location:["benarous","ariana"],
    countgym: countgym,
  count: count,
  };


  const data = gyms.map(gym => {
    return {
    name: gym.name,
    Rate: gym.rating,
    Participant: gym.participant,
    localisation: gym.localisation,
    offer:gym.offers




    }
    });


const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
  return (
    <div class="dashboard-main" >

    <HeaderSignedInClient/>



<main > 

 <div className="slider-area2">
   <div className="slider-height2 d-flex align-items-center">
     <div className="container">
       <div className="row">
         <div className="col-xl-12">
           <div className="hero-cap hero-cap2 pt-70">
             <h2>Check your Dashboard </h2>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
 </main>
 <div className="col-xl-3 col-md-6 mb-4">
 <div class="text-center">
 <div class="card bg-white shadow h-80 py-1">
        <div class="card-body">
                <div class="h2 font-weight-bold text-danger text-uppercase mb-1">
                Gyms added by you <h1>{count} </h1>
                </div>

              </div> </div>

                </div>









    </div>
    <div class="container-fluid">
  <div class="row justify-content-between">
    <div class="col-xl-4 col-md-4 mb-4">
      <div class="card bg-white shadow h-80 py-1">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-center">
                <div class="h2 font-weight-bold text-danger text-uppercase mb-1">
                <>  THE NUMBER OF PARTICIPANT OF YOUR GYM </>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div class="col-xl-4 col-md-4 mb-4">
      <div class="card bg-white shadow h-80 py-1">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-center">
                <div class="h2 font-weight-bold text-danger text-uppercase mb-1">
                Check your gym rating
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



   <div style={{ textAlign: "center" }}>



     <div className="card-container">







        <div className="chart-card">



        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}

        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="Participant" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>

        </div>

        <div className="chart-card"> <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar
        dataKey="Rate"
        fill="#8884d8"
        shape={<TriangleBar />}
        label={{ position: "top" }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
</div>





      </div>
    </div>
    <FooterFront/>
    </div>
  );  
}



export default Dashboard;
