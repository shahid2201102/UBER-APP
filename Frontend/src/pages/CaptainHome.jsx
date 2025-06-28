import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios'

const CaptainHome = () => {

    const [ridePopupPanel, setRidePopupPanel] = useState(false)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
    const [ ride, setRide ] = useState(null)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        if (!captain?._id) {
            console.log("captain._id not ready yet");
            return;
        }

        console.log("Emitting join for captain:", captain._id, socket.id);
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        });

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()
       // return () => clearInterval(locationInterval)
//
    },[]) 

    socket.on('new-ride', (data) => {
        console.log(data)
        setRide(data)
        setRidePopupPanel(true)
    })

    async function confirmRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: ride._id,
            captainId: captain._id,

        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)
    }


    useGSAP(function(){
        if(ridePopupPanel){
            gsap.to(ridePopupPanelRef.current,{
                transform:'translateY(0)'
            })
        }else{
            gsap.to(ridePopupPanelRef.current,{
                transform:'translateY(100%)'
            })
        }
    },[ridePopupPanel])

    useGSAP(function(){
        if(confirmRidePopupPanel){
            gsap.to(confirmRidePopupPanelRef.current,{
                transform:'translateY(0)'
            })
        }else{
            gsap.to(confirmRidePopupPanelRef.current,{
                transform:'translateY(100%)'
            })
        }
    },[confirmRidePopupPanel])

    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
                <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg ri-logout-box-r-line"></i>
                </Link>
            </div>
           <div className='h-2/3'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
           </div>
           <div className='h-1/3 p-6'>
               <CaptainDetails />
           </div>
           <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp 
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel} 
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>
            <div ref={confirmRidePopupPanelRef} className='fixed w-full z-10 h-screen bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
            </div>
        </div>
    )
}

export default CaptainHome