'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function AdminPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            return;
        }
        
        // Verify token
        verifyToken(token);
    }, []);

    const verifyToken = async (token) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }
        } catch (err) {
            console.error('Token verification error:', err);
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
            });
            
            if (!response.ok) throw new Error('Login failed');
            
            const data = await response.json();
            const accessToken = data.access;
            localStorage.setItem('token', accessToken);
            setIsAuthenticated(true);
        } catch (err) {
            console.error('Login error:', err);
            setError('Login failed: ' + err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.container}>
                <form onSubmit={handleLogin} className={styles.loginForm}>
                    <h2>Admin Login</h2>
                    {error && <div className={styles.error}>{error}</div>}
                    <input type="text" name="username" placeholder="Username" required />
                    <input type="password" name="password" placeholder="Password" required />
                    <button type="submit" className={styles.button}>Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.adminPanel}>
                <div className={styles.header}>
                    <h1>Newsletter Admin Panel</h1>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Logout
                    </button>
                </div>
                <div className={styles.buttonContainer}>
                    <button 
                        onClick={() => router.push('/admin/newsletter-writer')}
                        className={styles.button}
                    >
                        Newsletter Writer
                    </button>
                    <button 
                        onClick={() => router.push('/admin/subscribers')}
                        className={styles.button}
                    >
                        Subscriber Management
                    </button>
                </div>
            </div>
        </div>
    );
}
