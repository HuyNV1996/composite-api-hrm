import React, { Component, useState } from 'react'
import CronGenerator from 'react-cron-generator'
import 'react-cron-generator/dist/cron-builder.css'
const index = () => {
    const [cronExp, setCronExp] = useState('');
    const handleCronChange = (value:any) => {
        setCronExp(value);
      };
  return (
    <CronGenerator 
    value={cronExp} 
    onChange={handleCronChange} 
    showResultText={true}
    showResultCron={true}/>
  )
}

export default index