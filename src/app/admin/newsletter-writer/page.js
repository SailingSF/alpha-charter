'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';


export default function AdminNewsletter() {
    const [topic, setTopic] = useState('');
    const [newsletterHtml, setNewsletterHtml] = useState('');
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
                setNewsletterHtml(data.content);
                setNewsletterId(data.id);
                setTopic(data.title);
                setIsFinalized(true); // It's a finalized newsletter
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
                setNewsletterHtml(draftData.content);
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

    // Update the pollJobStatus function to store the job_id
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
                setNewsletterHtml(data.content);
                setIsPolling(false);
                // Don't clear jobId when complete, keep it for reference
                setNewsletterId(jobId); // Use the job_id as newsletter_id
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
                body: JSON.stringify({ topic }),
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

    // Update finalizeNewsletter function to handle HTML content
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
                    html_content: newsletterHtml 
                }),
            });
            
            if (!response.ok) throw new Error('Failed to finalize newsletter');
            
            const data = await response.json();
            setNewsletterId(data.newsletter_id);
            setIsFinalized(true);
            // Show success message
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
        <div className={styles.container}>
            <div className={styles.newsletterContainer}>
                <div className={styles.header}>
                    <h1>Newsletter Management</h1>
                </div>
                
                {error && <div className={styles.error}>{error}</div>}
                
                <div className={styles.newsletterSelect}>
                    <h3>Load Existing Newsletter</h3>
                    <div className={styles.idInput}>
                        <input
                            type="number"
                            placeholder="Enter Newsletter ID"
                            min="1"
                            onChange={(e) => e.target.value && fetchNewsletterById(e.target.value)}
                            className={styles.numberInput}
                        />
                    </div>
                    <p>- or -</p>
                </div>

                <form onSubmit={generateDraft} className={styles.topicForm}>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter newsletter topic"
                        required
                    />
                    <button 
                        type="submit" 
                        className={styles.button} 
                        disabled={isPolling}
                    >
                        {isPolling ? 'Generating...' : 'Generate Draft'}
                    </button>
                </form>

                {jobId && (
                    <div className={styles.jobIdDisplay}>
                        <span>Newsletter Job ID: </span>
                        <code>{jobId}</code>
                        <button 
                            className={styles.copyButton}
                            onClick={() => {
                                navigator.clipboard.writeText(jobId);
                                alert('Job ID copied to clipboard!');
                            }}
                        >
                            Copy ID
                        </button>
                    </div>
                )}

                {isPolling && (
                    <div className={styles.loadingMessage}>
                        Processing request... This may take a minute or two.
                    </div>
                )}

                {newsletterHtml && (
                    <>
                        <div className={styles.previewContainer}>
                            <h3>Newsletter Preview</h3>
                            <div 
                                className={styles.preview}
                                dangerouslySetInnerHTML={{ __html: newsletterHtml }}
                            />
                        </div>

                        <div className={styles.editContainer}>
                            <h3>HTML Editor</h3>
                            <textarea
                                value={newsletterHtml}
                                onChange={(e) => setNewsletterHtml(e.target.value)}
                                className={styles.htmlEditor}
                            />
                        </div>

                        <form onSubmit={submitFeedback} className={styles.feedbackForm}>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Enter feedback for refinement"
                                className={styles.feedbackInput}
                            />
                            <button 
                                type="submit" 
                                className={styles.button} 
                                disabled={isPolling}
                            >
                                {isPolling ? 'Processing...' : 'Submit Feedback'}
                            </button>
                        </form>

                        <div className={styles.actions}>
                            <button 
                                onClick={finalizeNewsletter}
                                disabled={isFinalized}
                                className={styles.button}
                            >
                                {isFinalized ? 'Newsletter Finalized' : 'Finalize Newsletter'}
                            </button>

                            {isFinalized && (
                                <div className={styles.sendControls}>
                                    <label>
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
                                        className={styles.emailOverride}
                                    />
                                    <button 
                                        onClick={sendNewsletter} 
                                        className={styles.button}
                                        disabled={isSending}
                                    >
                                        {isSending ? 'Sending...' : 'Send Newsletter'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
