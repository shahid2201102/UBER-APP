import React, { use, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from '../components/LiveTracking'


const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride


    useGSAP(function(){
        if(finishRidePanel){
            gsap.to(finishRidePanelRef.current,{
                transform:'translateY(0)'
            })
        }else{
            gsap.to(finishRidePanelRef.current,{
                transform:'translateY(100%)'
            })
        }
    },[finishRidePanel])

    return (
        <div className='h-screen relative'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
                <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg ri-logout-box-r-line"></i>
                </Link>
            </div>
           <div className='h-4/5'>
               <LiveTracking />
           </div>
           <div onClick={()=>{
                setFinishRidePanel(true)
            }} className='flex h-1/5 p-6 relative bg-yellow-400 justify-between items-center'>
                <h5 onClick={()=>{
                
                }}
                className='p-1 text-center w-[90%] absolute top-0'><i className=" text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
               <h4 className="text-xl font-semibold">4 KM away</h4>
               <button className=' bg-green-500 text-white font-semibold p-3 px-8 rounded-lg'>Complete Ride</button>
           </div>
           <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <FinishRide
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel}/>
            </div>

        </div>
    )
}

export default CaptainRiding