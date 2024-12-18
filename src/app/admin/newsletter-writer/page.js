'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import NewsletterPreview from '@/app/components/NewsletterPreview';

export default function AdminNewsletter() {
    const [topic, setTopic] = useState('');
    const [newsletterContent, setNewsletterContent] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isFinalized, setIsFinalized] = useState(false);
    const [testMode, setTestMode] = useState(true);
    const [error, setError] = useState('');
    const [jobId, setJobId] = useState(null);
    const [isPolling, setIsPolling] = useState(false);
    const [pollingInterval, setPollingInterval] = useState(null);
    const [newsletterId, setNewsletterId] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [overrideEmails, setOverrideEmails] = useState('');
    const [newsletterVersion, setNewsletterVersion] = useState('trading_volume');
    const [newsletterTitle, setNewsletterTitle] = useState('');
    const [isMarkdownContent, setIsMarkdownContent] = useState(true);

    // Replace the token state with this:
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

    // Update the fetchNewsletterById function to handle both drafts and finalized newsletters
    const fetchNewsletterById = async (id) => {
        if (!id) return;
        try {
            // First try to fetch as a finalized newsletter
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletters/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                setNewsletterContent(data.content);
                setIsMarkdownContent(false); // It's HTML content
                setNewsletterId(data.id);
                setTopic(data.title);
                setIsFinalized(true);
                setError('');
                return;
            }
            
            // If not found, try to fetch as a draft job
            const draftResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletter/draft/?job_id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if (!draftResponse.ok) throw new Error('Newsletter not found');
            
            const draftData = await draftResponse.json();
            if (draftData.status === 'completed') {
                setNewsletterContent(draftData.content);
                setIsMarkdownContent(true); // It's markdown content
                setJobId(draftData.job_id);
                setTopic(draftData.topic);
                setIsFinalized(false);
                setError('');
            } else {
                throw new Error(`Draft status: ${draftData.status}`);
            }
        } catch (err) {
            console.error('Fetch newsletter error:', err);
            setError('Failed to fetch newsletter: ' + err.message);
        }
    };

    // Update the pollJobStatus function to store the job_id and set the newsletter title
    const pollJobStatus = async (jobId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletter/draft/?job_id=${jobId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if (!response.ok) throw new Error('Failed to check job status');
            
            const data = await response.json();
            console.log('Poll response:', data);
            
            if (data.status === 'completed') {
                clearInterval(pollingInterval);
                setPollingInterval(null);
                setNewsletterContent(data.content);
                setIsMarkdownContent(true);
                setIsPolling(false);
                if (data.newsletter_title) {
                    setNewsletterTitle(data.newsletter_title);
                }
                setNewsletterId(jobId);
            } else if (data.status === 'failed') {
                clearInterval(pollingInterval);
                setPollingInterval(null);
                setError('Job failed: ' + (data.error || 'Unknown error'));
                setIsPolling(false);
                setJobId(null);
            }
        } catch (err) {
            console.error('Polling error:', err);
            setError('Polling failed: ' + err.message);
        }
    };

    // Update the generateDraft function to show job_id immediately
    const generateDraft = async (e) => {
        e.preventDefault();
        setError('');
        setIsPolling(true);
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletter/draft/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    topic,
                    newsletter_version: newsletterVersion 
                }),
            });
            
            if (!response.ok) throw new Error('Failed to generate draft');
            
            const data = await response.json();
            console.log('Generate draft response:', data);
            
            if (data.job_id) {
                setJobId(data.job_id);
                setNewsletterId(data.job_id); // Use job_id as newsletter_id
                // Clear any existing interval
                if (pollingInterval) {
                    clearInterval(pollingInterval);
                }
                // Start new polling interval
                const interval = setInterval(() => pollJobStatus(data.job_id), 3000);
                setPollingInterval(interval);
            } else {
                throw new Error('No job ID received');
            }
        } catch (err) {
            console.error('Generate draft error:', err);
            setError('Draft generation failed: ' + err.message);
            setIsPolling(false);
        }
    };

    // Update submitFeedback function
    const submitFeedback = async (e) => {
        e.preventDefault();
        setError('');
        setIsPolling(true);
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletter/draft/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    feedback,
                    newsletter_id: newsletterId,
                }),
            });
            
            if (!response.ok) throw new Error('Failed to update draft');
            
            const data = await response.json();
            console.log('Submit feedback response:', data);
            
            if (data.job_id) {
                setJobId(data.job_id);
                if (pollingInterval) {
                    clearInterval(pollingInterval);
                }
                const interval = setInterval(() => pollJobStatus(data.job_id), 3000);
                setPollingInterval(interval);
                setFeedback('');
            }
        } catch (err) {
            console.error('Submit feedback error:', err);
            setError('Feedback submission failed: ' + err.message);
            setIsPolling(false);
        }
    };

    // Update finalizeNewsletter function to handle HTML content and include the title
    const finalizeNewsletter = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletter/finalize/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    job_id: jobId,
                    newsletter_content: newsletterContent,
                    newsletter_title: newsletterTitle
                }),
            });
            
            if (!response.ok) throw new Error('Failed to finalize newsletter');
            
            const data = await response.json();
            setNewsletterId(data.newsletter_id);
            setIsFinalized(true);
            setNewsletterContent(data.html_content);
            setIsMarkdownContent(false);
            setError('Newsletter finalized successfully!');
        } catch (err) {
            setError('Finalization failed: ' + err.message);
        }
    };

    // Update sendNewsletter function to include override_emails
    const sendNewsletter = async () => {
        if (!newsletterId) {
            setError('No newsletter selected to send');
            return;
        }
        
        setIsSending(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletters/send/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    newsletter_id: newsletterId,
                    test_mode: testMode,
                    ...(overrideEmails && { override_emails: overrideEmails })
                }),
            });
            
            if (!response.ok) throw new Error('Failed to send newsletter');
            
            const data = await response.json();
            alert(testMode ? 'Test newsletter sent!' : 'Newsletter sent successfully!');
            setError('');
            setOverrideEmails(''); // Clear the override emails after successful send
        } catch (err) {
            setError('Sending failed: ' + err.message);
        } finally {
            setIsSending(false);
        }
    };

    // Add cleanup effect
    useEffect(() => {
        // Cleanup function to clear interval when component unmounts
        return () => {
            if (pollingInterval) {
                clearInterval(pollingInterval);
            }
        };
    }, [pollingInterval]);

    return (
        <div className={styles.pageContainer}>
            <nav className={styles.navbar}>
                <Link href="/admin" className={styles.navLink}>← Back to Admin</Link>
                <Link href="/admin/subscribers" className={styles.navLink}>Manage Subscribers</Link>
            </nav>

            <main className={styles.container}>
                <div className={styles.header}>
                    <h1>Newsletter Creator</h1>
                    {error && <div className={styles.error}>{error}</div>}
                </div>

                <div className={styles.workflowContainer}>
                    {/* Step 1: Create New or Load Existing */}
                    <section className={styles.section}>
                        <h2>1. Create or Load Newsletter</h2>
                        <div className={styles.createLoadContainer}>
                            <div className={styles.loadNewsletter}>
                                <input
                                    type="number"
                                    placeholder="Load Newsletter by ID"
                                    min="1"
                                    onChange={(e) => e.target.value && fetchNewsletterById(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.dividerContainer}>
                                <div className={styles.dividerLine}></div>
                                <span className={styles.dividerText}>or create new</span>
                                <div className={styles.dividerLine}></div>
                            </div>
                            <form onSubmit={generateDraft} className={styles.topicForm}>
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="Enter newsletter topic"
                                    className={styles.input}
                                    required
                                />
                                <select
                                    value={newsletterVersion}
                                    onChange={(e) => setNewsletterVersion(e.target.value)}
                                    className={styles.input}
                                >
                                    <option value="trading_volume">Trading Volume</option>
                                    <option value="deep_dive">Deep Dive</option>
                                </select>
                                <button 
                                    type="submit" 
                                    className={`${styles.button} ${styles.primaryButton}`}
                                    disabled={isPolling}
                                >
                                    {isPolling ? 'Generating...' : 'Generate Draft'}
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* Newsletter ID Display */}
                    {jobId && (
                        <div className={styles.idBadge}>
                            Newsletter ID: <code>{jobId}</code>
                            <button 
                                className={styles.copyButton}
                                onClick={() => {
                                    navigator.clipboard.writeText(jobId);
                                    alert('Newsletter ID copied!');
                                }}
                            >
                                Copy ID
                            </button>
                        </div>
                    )}

                    {/* Step 2: Preview and Refine */}
                    {newsletterContent && (
                        <section className={styles.section}>
                            <h2>2. Preview and Refine</h2>
                            <div className={styles.previewContainer}>
                                <NewsletterPreview 
                                    content={newsletterContent}
                                    isMarkdown={isMarkdownContent} 
                                />
                            </div>
                            
                            {!isFinalized && (
                                <div className={styles.feedbackContainer}>
                                    <form onSubmit={submitFeedback} className={styles.feedbackForm}>
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            placeholder="Enter feedback to refine the newsletter..."
                                            className={styles.textarea}
                                            rows={4}
                                        />
                                        <button 
                                            type="submit" 
                                            className={`${styles.button} ${styles.secondaryButton}`}
                                            disabled={isPolling}
                                        >
                                            {isPolling ? 'Processing...' : 'Submit Feedback'}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Step 3: Finalize and Send */}
                    {newsletterContent && (
                        <section className={styles.section}>
                            <h2>3. {isFinalized ? 'Send Newsletter' : 'Finalize Newsletter'}</h2>
                            <div className={styles.actions}>
                                {!isFinalized ? (
                                    <div className={styles.finalizeContainer}>
                                        <div className={styles.titleInput}>
                                            <input
                                                type="text"
                                                value={newsletterTitle}
                                                onChange={(e) => setNewsletterTitle(e.target.value)}
                                                className={styles.input}
                                                placeholder="Enter newsletter title/subject"
                                            />
                                        </div>
                                        <button 
                                            onClick={finalizeNewsletter}
                                            className={`${styles.button} ${styles.primaryButton}`}
                                            disabled={!newsletterTitle}
                                        >
                                            Finalize Newsletter
                                        </button>
                                    </div>
                                ) : (
                                    <div className={styles.sendContainer}>
                                        <div className={styles.sendOptions}>
                                            <label className={styles.testModeLabel}>
                                                <input
                                                    type="checkbox"
                                                    checked={testMode}
                                                    onChange={(e) => setTestMode(e.target.checked)}
                                                />
                                                Test Mode
                                            </label>
                                            <textarea
                                                value={overrideEmails}
                                                onChange={(e) => setOverrideEmails(e.target.value)}
                                                placeholder="Optional: Override recipient emails (comma-separated)"
                                                className={styles.textarea}
                                                rows={2}
                                            />
                                        </div>
                                        <button 
                                            onClick={sendNewsletter} 
                                            className={`${styles.button} ${styles.primaryButton}`}
                                            disabled={isSending}
                                        >
                                            {isSending ? 'Sending...' : `Send Newsletter ${testMode ? '(Test)' : ''}`}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}
