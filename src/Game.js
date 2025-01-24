    import React, { useState, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import Spaceship from './Spaceship';
import Background from './Background';
import Bullet from './Bullet';
import Enemy from './Enemy';

const Game = () => {
    const [spaceshipPosition, setSpaceshipPosition] = useState({ x: (window.innerWidth * 0.8) / 2 - 25, y: window.innerHeight * 0.8 - 60 });
    const [bullets, setBullets] = useState([]);
    const [enemies, setEnemies] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            setSpaceshipPosition((pos) => ({ ...pos, x: Math.max(pos.x - 10, 0) })); // Sol sınır kontrolü
        } else if (e.key === 'ArrowRight') {
            setSpaceshipPosition((pos) => ({ ...pos, x: Math.min(pos.x + 10, window.innerWidth * 0.8 - 50) })); // Sağ sınır kontrolü
        }else if (e.key === ' ') {
            // Mermi ateş etme mekanizması
            setBullets((prevBullets) => [
                ...prevBullets,
                { x: spaceshipPosition.x + 25, y: spaceshipPosition.y }, // Uzay gemisinin konumuna göre ayarlıyorum
            ]);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const updateEnemies = () => {
            setEnemies((prevEnemies) =>
                prevEnemies
                    .map((enemy) => ({ ...enemy, y: enemy.y + 2 })) // Düşmanı aşağı hareket ettir
                    .filter((enemy) => enemy.y < window.innerHeight) // Ekranın dışına çıkmış düşmanları filtrele
            );
        };

        const updateBullets = () => {
            setBullets((prevBullets) =>
                prevBullets
                    .map((bullet) => ({ ...bullet, y: bullet.y - 5 })) // Mermiyi yukarı hareket ettir
                    .filter((bullet) => bullet.y > 0) // Ekranın dışına çıkan mermileri filtrele
            );
        };

        const gameLoop = () => {
            updateEnemies();
            updateBullets();
            requestAnimationFrame(gameLoop); // Bir sonraki animasyon karesini bekle
        };

        requestAnimationFrame(gameLoop); // Oyun döngüsünü başlat

        return () => {
            // Cleanup işlemleri
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setEnemies((prevEnemies) => [
                ...prevEnemies,
                { x: Math.random() * (window.innerWidth - 40), y: 0 } // Rastgele x konumu
            ]);
        }, 1000); // Her saniyede bir düşman ekle

        return () => clearInterval(interval);
    }, []);

    return (
        <Stage
            width={window.innerWidth * 0.8}
            height={window.innerHeight * 0.8}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Layer>
                <Background />
                <Spaceship x={spaceshipPosition.x} y={window.innerHeight * 0.8 - 60} />
                {bullets.map((bullet, index) => (
                    <Bullet key={index} x={bullet.x} y={bullet.y} />
                ))}
                {enemies.map((enemy, index) => (
                    <Enemy key={index} x={enemy.x} y={enemy.y} />
                ))}
            </Layer>
        </Stage>
    );
};

export default Game;
