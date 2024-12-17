import  { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";



interface props{
  fechaMes:Date
  handleDate: (mes?:number,anio?:number)=>void
}
const FechaPicker = ({fechaMes,handleDate}:props) => {
  const [date, setDate] = useState(new Date());



  return (
<DatePicker
 
  selected={fechaMes}
  onChange={(e)=>{
    handleDate(e?.getMonth(),e?.getFullYear())
  }}
  dateFormat="MM/yyyy"
  showMonthYearPicker
maxDate={new Date()}

/>
  );
}
export default FechaPicker