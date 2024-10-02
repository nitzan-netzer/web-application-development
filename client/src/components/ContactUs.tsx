import React from 'react';
import dynamic from 'next/dynamic';
import '../styles/ContactUs.css'; // Ensure this file exists

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import('../components/Map'), { ssr: false });

const ContactUs = () => {
  const locations = [
    {
      address: 'המכללה למינהל ראשון לציון',
      latitude: 31.971970026133167,
      longitude: 34.770684781250026,
    }
  ];

  const teamMembers = [
    { name: 'ניצן נצר', role: 'מוכר כלי נגינה' },
    { name: 'רותם רז', role: 'מוכרת בגדים' },
    { name: 'עינב חימוביץ', role: 'מוכר מוצרי חשמל' },
    { name: 'אור כהן נזנין', role: 'מוכרת תכשיטים' },
    { name: 'אדיר יצחקי', role: 'מוכר מוצרי ספורט' },
    { name: 'דנה כהן', role: 'מוכרת צעצועים' }
  ];

  return (
    <div className="contact-us-container">
      <div className="team-container">
        <h3 className="team-title">הצוות</h3>
        <table className="team-table">
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
      <div className="map-container">
        <Map locations={locations} />
        <h3 className="map-address">{locations[0].address}</h3>
      </div>
    </div>
  );
};

export default ContactUs;
