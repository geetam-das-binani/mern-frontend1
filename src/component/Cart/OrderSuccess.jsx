import React from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './OrderSuccess.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export default function OrderSuccess() {
  return (
   <div className="order__success">
    <CheckCircleIcon/>
   <Typography>Your Order has been placed Successfully</Typography>
    <Link to='/order/me'>View Orders</Link>
    

   </div>
  )
}

