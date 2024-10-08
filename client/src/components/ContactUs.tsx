import React from 'react';
import dynamic from 'next/dynamic';
import '../styles/ContactUs.css'; 


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
    { name: 'חיים שפיר', role: 'מנכ"ל' },
    { name: 'ניצן נצר', role: 'מייסד ומנהל כספים' },
    { name: 'רותם רז', role: 'מייסדת ומנהלת מחלקת הקיימות' },
    { name: 'עינב חימוביץ', role: 'מייסד ומנהל מחלקת המוכרים' },
    { name: 'אור כהן נזנין', role: 'מייסדת ומנהלת מחלקת הסושיאל' },
    { name: 'אדיר יצחקי', role: 'מייסד ומנהל מחלקת התוכנה' },
    { name: 'דנה כהן', role: 'מייסדת ומנהלת מחלקת השיווק' }
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
