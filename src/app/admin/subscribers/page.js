'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function SubscribersPage() {
    const [subscribers, setSubscribers] = useState([]);
    const [error, setError] = useState('');
    const [newSubscriber, setNewSubscriber] = useState({ email: '', first_name: '', tier: 'free' });
    const router = useRouter();

    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        } else {
            router.push('/admin');
        }
    }, [router]);

    const fetchSubscribers = useCallback(async () => {
        if (!token) return;
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subscribers/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if (!response.ok) throw new Error('Failed to fetch subscribers');
            
            const data = await response.json();
            setSubscribers(data);
        } catch (err) {
            setError('Failed to fetch subscribers: ' + err.message);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchSubscribers();
        }
    }, [token, fetchSubscribers]);

    const addSubscriber = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subscribers/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newSubscriber),
            });
            
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to add subscriber');
            }
            
            await fetchSubscribers();
            setNewSubscriber({ email: '', first_name: '', tier: 'free' });
            setError('');
        } catch (err) {
            setError('Failed to add subscriber: ' + err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        router.push('/admin');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Subscriber Management</h1>
                <div className={styles.navigation}>
                    <button onClick={() => router.push('/admin/newsletter-writer')} className={styles.button}>
                        Newsletter Writer
                    </button>
                    <button onClick={handleLogout} className={styles.button}>Logout</button>
                </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.addSubscriber}>
                <h2>Add New Subscriber</h2>
                <form onSubmit={addSubscriber}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={newSubscriber.email}
                        onChange={(e) => setNewSubscriber({...newSubscriber, email: e.target.value})}
                        required
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        value={newSubscriber.first_name}
                        onChange={(e) => setNewSubscriber({...newSubscriber, first_name: e.target.value})}
                        required
                    />
                    <select
                        value={newSubscriber.tier}
                        onChange={(e) => setNewSubscriber({...newSubscriber, tier: e.target.value})}
                    >
                        <option value="free">FREE</option>
                        <option value="trial">TRIAL</option>
                        <option value="basic">BASIC</option>
                    </select>
                    <button type="submit" className={styles.button}>Add Subscriber</button>
                </form>
            </div>

            <div className={styles.subscriberList}>
                <h2>Subscribers</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Tier</th>
                            <th>Status</th>
                            <th>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.map((sub) => (
                            <tr key={sub.id}>
                                <td>{sub.email}</td>
                                <td>{sub.first_name}</td>
                                <td>{sub.tier}</td>
                                <td>{sub.is_active ? 'Active' : 'Inactive'}</td>
                                <td>{new Date(sub.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 