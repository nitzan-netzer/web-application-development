'use client';

import React, { useState } from 'react';
import { PostRequestToSell } from '@/srcapi/nitApi';

const ToolKitUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleRequestToSell = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Call the PostRequestToSell function
            console.log('Calling PostRequestToSell...');
            const response = await PostRequestToSell(); // Assuming it returns something
            console.log('API call succeeded:', response); // Log success response
            setSuccess(true); // Show success message on completion
        } catch (error) {
            console.error('API call failed:', error);
            if (error instanceof Error) {
                setError('Error requesting to sell: ' + error.message);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            console.log('Resetting loading state');
            setLoading(false); // Ensure loading is reset no matter what
        }
    }

    return (
        <div>
            <button onClick={handleRequestToSell} disabled={loading}>
                {loading ? 'Processing...' : 'Request to sell'}
            </button>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Request successful!</p>}
        </div>
    );
}

export default ToolKitUser;
