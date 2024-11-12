'use client';

import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './NewsletterPreview.module.css';

export default function NewsletterPreview({ content, isMarkdown = false }) {
    const previewRef = useRef(null);

    useEffect(() => {
        if (!previewRef.current || isMarkdown) return;

        // Process HTML content
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
            link.className = styles.link;
            if (link.href && !link.href.startsWith('http')) {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        });
    }, [content, isMarkdown]);

    if (isMarkdown) {
        return (
            <div className={styles.preview}>
                <ReactMarkdown
                    components={{
                        h1: ({node, ...props}) => <h1 className={styles.heading1} {...props} />,
                        h2: ({node, ...props}) => <h2 className={styles.heading2} {...props} />,
                        h3: ({node, ...props}) => <h3 className={styles.heading3} {...props} />,
                        p: ({node, ...props}) => <p className={styles.paragraph} {...props} />,
                        a: ({node, ...props}) => <a className={styles.link} {...props} />,
                        ul: ({node, ...props}) => <ul className={styles.list} {...props} />,
                        ol: ({node, ...props}) => <ol className={styles.list} {...props} />,
                        li: ({node, ...props}) => <li className={styles.listItem} {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className={styles.blockquote} {...props} />,
                        code: ({node, ...props}) => <code className={styles.code} {...props} />,
                        pre: ({node, ...props}) => <pre className={styles.codeBlock} {...props} />,
                    }}
                >
                    {content}
                </ReactMarkdown>
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