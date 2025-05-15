import React from 'react';

const LocationSearchPanel = (props) => {
     // sample array for location with unique ids
     const locations = [
          {
               id: 1,
               address: "42A, Rajpur Road, Dehradun, Uttarakhand – 248009"
          },
          {
               id: 2,
               address: "17B, Sahastradhara Road, Dehradun, Uttarakhand – 248013"
          },
          {
               id: 3,
               address: "63, Prem Nagar, Dehradun, Uttarakhand – 248007"
          },
          {
               id: 4,
               address: "88/1, Patel Nagar, Dehradun, Uttarakhand – 248001"
          }
     ];

    return (
        <div>
            {locations.map(location => (
                <div 
                    key={location.id}
                    onClick={() => {
                         props.setVehiclePanel(true);
                         props.setPanelOpen(false);
                    }} 
                    className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'
                >
                    <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center'>
                         <i className="ri-map-pin-fill"></i>
                    </h2>
                    <h4 className='font-medium'>{location.address}</h4>
                </div>
            ))}
        </div>
    );
};

export default LocationSearchPanel;