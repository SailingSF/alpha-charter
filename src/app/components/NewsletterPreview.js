'use client';

import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './NewsletterPreview.module.css';

export default function NewsletterPreview({ content, isMarkdown = false }) {
    const previewRef = useRef(null);

    useEffect(() => {
        if (!previewRef.current || isMarkdown) return;

        // Only process HTML content
        const images = previewRef.current.getElementsByTagName('img');
        Array.from(images).forEach(img => {
            img.onerror = function() {
                this.style.display = 'none';
                const errorText = document.createElement('div');
                errorText.className = styles.imageError;
                errorText.textContent = `Failed to load image: ${this.src}`;
                this.parentNode.insertBefore(errorText, this);
            };
            img.loading = 'lazy';
        });

        const links = previewRef.current.getElementsByTagName('a');
        Array.from(links).forEach(link => {
            if (link.href && !link.href.startsWith('http')) {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        });
    }, [content, isMarkdown]);

    if (isMarkdown) {
        return (
            <div className={styles.preview}>
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        );
    }

    return (
        <div 
            ref={previewRef}
            className={styles.preview}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
} 