'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/personalDetails.module.css';

import { updateUser } from '@/srcapi/nitApi';

const PersonalDetails = () => {

    //const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [gender, setGender] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        //const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');
        const storedAddress = localStorage.getItem('address');
        const storedBirthYear = localStorage.getItem('birthYear');
        const storedGender = localStorage.getItem('gender');
        const storedIsSeller = localStorage.getItem('isSeller');

        //if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedAddress) setAddress(storedAddress);
        if (storedBirthYear) setBirthYear(storedBirthYear);
        if (storedGender) setGender(storedGender);
        if (storedIsSeller) setIsSeller(JSON.parse(storedIsSeller));
    }, []);

    const handleUpdateDetails = async () => {
        try {
            await updateUser(email, Number(birthYear), address, gender, isSeller);
            setSuccess(true);
            
        } catch (error) {
            alert('עדכון הפרטים נכשל, אנא נסה שוב.');
        }
        setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
    };

    return (
        <div className="toolkitSaller">

            <h1 className={styles.title}>כאן תוכל/י לעדכן את הפרטים האישיים שלך</h1>

            {success && <p className={`${styles.paragraph} ${styles.successMessage}`}>פרטיך עודכנו בהצלחה</p>}
            {/*
            <div className={styles.divMargin}>
                <label className={styles.label}>שם</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className={styles.inputField} 
                />
            </div>
            */
            }

            <div className={styles.divMargin}>
                <label className={styles.label}>Email</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className={styles.inputField} 
                />
            </div>

            <div className={styles.divMargin}>
                <label className={styles.label}>כתובת</label>
                <input 
                    type="text" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)}
                    className={styles.inputField} 
                />
            </div>

            <div className={styles.divMargin}>
                <label className={styles.label}>שנת לידה</label>
                <input 
                    type="number" 
                    value={birthYear} 
                    onChange={(e) => setBirthYear(e.target.value)}
                    className={styles.inputField} 
                />
            </div>

            <div className={styles.divMargin}>
                <label className={styles.label}>מין</label>
                <select 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)}
                    className={styles.inputField} 
                >
                    <option value="male">זכר</option>
                    <option value="female">נקבה</option>
                </select>
            </div>

            <div className={styles.divMargin} style={{ display: 'flex', alignItems: 'center' }}>
                <label className={styles.label} style={{ marginRight: '10px' }}>האם תרצה להיות מוכר</label>
                <input 
                    type="checkbox" 
                    checked={isSeller} 
                    onChange={(e) => setIsSeller(e.target.checked)}
                    className={styles.checkbox} 
                    style={{ transform: 'scale(1.3)', cursor: 'pointer' }}
                />
            </div>

            <button onClick={handleUpdateDetails} className={styles.button}>
                עדכן
            </button>
        </div >
    );
};

export default PersonalDetails;