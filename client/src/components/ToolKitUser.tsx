'use client';

import React, { useState } from 'react';
import { PostRequestToSell } from '@/srcapi/nitApi';
import styles from '../styles/toolkit-user.module.css'; // Import the CSS module

const ToolKitUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleRequestToSell = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await PostRequestToSell();
            setSuccess(true);
        } catch (error) {
            if (error instanceof Error) {
                setError('Error requesting to sell: ' + error.message);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container} dir='rtl'>
            <button 
              onClick={handleRequestToSell} 
              disabled={loading}
              className={styles.button}
            >
                {loading ? 'טוען...' : 'לחץ כאן כדי להפוך למוכר'}
            </button>
            
            {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
            {success && <p className={`${styles.message} ${styles.success}`}>מזל טוב! התנתק והתחבר מחדש על מנת לעדכן את האתר בהתאם</p>}
        </div>
    );
}

export default ToolKitUser;
