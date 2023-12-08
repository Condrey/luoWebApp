import React from 'react';

interface BreadcrumbItem {
    label: string;
    link?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({items}: BreadcrumbProps) {
    return (
        <nav className="breadcrumb">
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.link ? (
                            <a href={item.link}>{item.label}</a>
                        ) : (
                            <span>{item.label}</span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
