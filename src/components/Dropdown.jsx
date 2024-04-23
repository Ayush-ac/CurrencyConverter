import React from 'react'
import {HiOutlineStar} from "react-icons/hi2"

const Dropdown = ({
    currencies,
    currency,
    setCurrency,
    title = '',
}) => {
  return (
    <div>
        <label htmlFor={title}
         >{title}</label>
        <div className="mt 1 relative bg-gray-700" >
        <select className='w-full p-2 bg-gray-100 border-gray-300 rounded-md shadow-sm focus: outline-none 
        focus:ring-2 focus:ring-indigo-500' value={currency} onChange={(e)=>setCurrency(e.target.value)}>


            {currencies?.map((currency)=>{
               return <option value={currency} key={currency}>{currency}</option>
            })}
        </select>
       
        </div>
    </div>
  )
}

export default Dropdown;