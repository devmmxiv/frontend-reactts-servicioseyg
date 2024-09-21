import React, {  PropsWithChildren, LabelHTMLAttributes ,FC } from 'react'
interface  props{
    children?: React.ReactNode; 
    type:string;
    value:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
}
const Input: FC<props>=({type,value,onChange}:props) : JSX.Element=>{

 
  return (
  <>

  <input 
     type={type}
     value={value}
    onChange={onChange}

  />
  </>
  )
}

export default Input