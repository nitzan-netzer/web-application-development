'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/personalDetails.module.css';

const PersonalDetails = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');
        const storedAddress = localStorage.getItem('address');
        const storedIsSeller = localStorage.getItem('isSeller');

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedAddress) setAddress(storedAddress);
        if (storedIsSeller) setIsSeller(JSON.parse(storedIsSeller));
    }, []);

    const handleUpdateDetails = () => {
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('address', address);
        localStorage.setItem('isSeller', JSON.stringify(isSeller));

        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
    };

    return (
        <div className="toolkitSaller">
            <h1 className={styles.title}>כאן תוכל/י לעדכן את הפרטים האישיים שלך</h1>

            {success && <p className={`${styles.paragraph} ${styles.successMessage}`}>פרטיך עודכנו בהצלחה</p>}

            <div className={styles.divMargin}>
                <label className={styles.label}>שם</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className={styles.inputField} 
                />
            </div>

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
            <label className={styles.label}>האם תרצה להיות מוכר</label>
                <input 
                    type="checkbox" 
                    checked={isSeller} 
                    onChange={(e) => setIsSeller(e.target.checked)}
                    className={styles.checkbox} 
                />
            </div>

            <button onClick={handleUpdateDetails} className={styles.button}>
                עדכן
            </button>
        </div >
    );
};

export default PersonalDetails;
