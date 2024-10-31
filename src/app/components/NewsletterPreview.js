'use client';

import { useEffect, useRef } from 'react';
import styles from './NewsletterPreview.module.css';

export default function NewsletterPreview({ html }) {
    const previewRef = useRef(null);

    useEffect(() => {
        if (!previewRef.current) return;

        // Fix any relative image URLs and ensure they load
        const images = previewRef.current.getElementsByTagName('img');
        Array.from(images).forEach(img => {
            // Add error handling for images
            img.onerror = function() {
                this.style.display = 'none';
                const errorText = document.createElement('div');
                errorText.className = styles.imageError;
                errorText.textContent = `Failed to load image: ${this.src}`;
                this.parentNode.insertBefore(errorText, this);
            };

            // Add loading state
            img.loading = 'lazy';
        });

        // Fix any relative links
        const links = previewRef.current.getElementsByTagName('a');
        Array.from(links).forEach(link => {
            if (link.href && !link.href.startsWith('http')) {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        });
    }, [html]);

    return (
        <div 
            ref={previewRef}
            className={styles.preview}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
} 