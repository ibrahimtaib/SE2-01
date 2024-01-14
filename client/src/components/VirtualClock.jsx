/* eslint-disable react/prop-types */
import {forwardRef, useState, useEffect} from 'react'
import { FaRegClock } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import './VirtualClock.css'
import api from '../utils/pi';

function VirtualClock({setDirty}) {
  const [startDate, setStartDate] = useState(undefined);
  const [virtualDate, setVirtualDate] = useState(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [buttonVariant, setButtonVariant] = useState('outline-light');
  const CustomInput = forwardRef(function CustomInput({ onClick }, ref) {
    return (
    <Button variant={buttonVariant} className="mr-3" style={{border: 'none' }} onClick={() => {
      onClick()
      setShowCalendar(!showCalendar)
      setStartDate(virtualDate)
    }} ref={ref}><FaRegClock /></Button>
    )}
  );

  function handleDateSubmission(date) {
    try {
    // richiesta al server
      api.setVirtualClock(date)
      setDirty(true)
      setButtonVariant('success')
      setTimeout(() => {
        setButtonVariant('outline-light')
      }, 2000)
      setStartDate(date)
      setVirtualDate(date)
    } catch (error) {
      console.log(error)
      setButtonVariant('danger')
    }
  }

  function handleVirtualClockReset() {
    try {
      // richiesta al server
      api.resetVirtualClock()
      setButtonVariant('success')
      setTimeout(() => {
        setButtonVariant('outline-light')
      }, 2000)
      setStartDate(new Date())
      setVirtualDate(new Date())
    } catch (error) {
      setButtonVariant('danger')
    }
  }

  useEffect(() => {
    // fetch virtual date
      api.getVirtualClock().then(
        (date) => {
          let virtualDate = new Date(date)
          setVirtualDate(virtualDate)
          setStartDate(virtualDate)
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    }, [])



  return (
    <>
    <DatePicker
      selected={startDate}
      open={showCalendar}
      shouldCloseOnSelect={false}
      onSelect={(date) => setStartDate(date)}
      customInput={<CustomInput />}
      calendarClassName="custom-calendar"
      >
        <div className='clock-actions'>
          <Button variant="primary" className="mr-3" onClick={() => handleDateSubmission(startDate)}>Set</Button>
          <Button variant="danger" className="mr-3" onClick={handleVirtualClockReset}>Reset</Button>
        </div>
        </DatePicker>
    </>
  );
}

export default VirtualClock