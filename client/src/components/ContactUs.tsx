import React from 'react';
import dynamic from 'next/dynamic';
import '../styles/ContactUs.css'; 

// Dynamically import the Map component to avoid SSR issues
const MapComponent = dynamic(() => import('../components/Map'), { ssr: false });

const ContactUs = () => {
  const locationData = {
    address: 'המכללה למינהל ראשון לציון',
    latitude: 31.971970026133167,
    longitude: 34.770684781250026,
  };


  const teamMembers = [
      { name: 'ניצן נצר', role: 'מוכר כלי נגינה '  },
      { name: 'רותם רז', role: 'מוכרת בגדים ' },
      { name: 'עינב חימוביץ', role: 'מוכר מוצרי חשמל ' },
      { name: 'אור כהן נזנין', role: 'מוכרת תכשיטים '},
      { name: 'אדיר יצחקי', role: 'מוכר מוצרי ספורט ' },
      { name: 'דנה כהן', role: 'מוכרת צעוצעים ' }
    ];    


  return (
    <div className="container">
      {/* Left column: Map */}
      <div className="map">
        <MapComponent
          latitude={locationData.latitude}
          longitude={locationData.longitude}
          address={locationData.address}
        />
        <h3>{locationData.address}</h3>
      </div>

      {/* Right column: Team members */}
      <div className="table">
        <h3>הצוות</h3>
        <table>
          <thead>
            <tr>
            <th>תפקיד</th>
            <th>שם</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, index) => (
              <tr key={index}>
                <td>{member.role}</td>
                <td>{member.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactUs;