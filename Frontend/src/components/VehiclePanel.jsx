import React from 'react';

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 
                onClick={()=>{
                    props.setVehiclePanel(false)
                }}
            className='p-1 text-center w-[93%] absolute top-0'><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
            }}
            className=' active:border-2 border-black bg-gray-100 rounded-xl flex w-full p-3 mb-2 items-center justify-between'>
                <img className='-ml-2 h-16' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                <div className='-ml-6 w-1/2'>
                    <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>$2</h2>
            </div>
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
            }}
            className=' active:border-2 border-black bg-gray-100 rounded-xl flex w-full p-3 mb-2 items-center justify-between'>
                <img className='-ml-2 h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png" alt="" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>$1</h2>
            </div>
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
            }}
            className=' active:border-2 border-black bg-gray-100 rounded-xl flex w-full p-3 mb-2 items-center justify-between'>
                <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, Auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'>$1.5</h2>
            </div>
        </div>
    );
};

export default VehiclePanel;