"use client";

import { useEffect, useRef } from 'react';
import { ExoplanetScene } from './components/ExoplanetScene';

export default function ExoplanetPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<ExoplanetScene | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Inicializar la escena (solo en cliente)
        sceneRef.current = new ExoplanetScene(containerRef.current);

        // Cleanup al desmontar
        return () => {
            if (sceneRef.current) {
                sceneRef.current.dispose();
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                background: '#000010'
            }}
        />
    );
}
