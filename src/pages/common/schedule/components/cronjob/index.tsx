import React, { Component, useState } from 'react'
import CronGenerator from 'react-cron-generator'
interface ICronjobProps{
  onChange: (value: string) => void
  value: string
}
const index = (props: ICronjobProps) => {
  const {onChange, value} = props;
  return (
    <CronGenerator 
    value={value} 
    onChange={onChange} 
    showResultText={true}
    showResultCron={true}/>
  )
}

export default index