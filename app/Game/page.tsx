'use client';
import { set } from 'zod';
import ChessBoard from '../components/ChessBoard.js';
import { useState, useEffect } from 'react';

export default function SegundaPagina() {
    const [bestMove, setBestMove] = useState<string>('');
    const [initialPosition, setInitialPosition] = useState<string>('');
    const [otherMoves, setOtherMoves] = useState<string[]>([]);
    const [selectedMove, setSelectedMove] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [option, setOption] = useState<string>('Comprobar');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setInitialPosition(data.initialPosition);
                    setBestMove(data.bestMove);
                    const combinedMoves = [...data.bestMove, ...data.otherMoves];
                    const shuffledMoves = combinedMoves.sort(() => Math.random() - 0.5);
                    setOtherMoves(shuffledMoves);
                } else {
                    console.error("An error occurred while processing the request.");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };

        fetchData();
    }, []);

    const handleMoveSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMove(event.target.value);
    };

    const checkMove = () => {

        let bestMoveString;
        if (Array.isArray(bestMove)) {
            bestMoveString = bestMove.join('');
        } else {
            bestMoveString = bestMove;
        }
        if (selectedMove === bestMoveString) {
            setResult('¡Correcto!');
            setOption('Otro reto');

        } else {
            setResult('Incorrecto');
        }

    };

    const searchChallenge = () => {
        setOption('Comprobar');
        setResult('');
        setSelectedMove('');

    };

    return (
        <div className='w-full h-screen ' style={{ backgroundImage: `url(/assets/chessCopia.jpg)`, backgroundSize: `cover` }}>
            <div className='w-full flex justify-center'>
                <h1 className='text-white text-9xl font-lancelot tracking-wide mt-12' style={{ textShadow: '4px 5px 2px black' }}>CHESSBRAIN</h1>
            </div>
            <div className='w-full flex flex-row mt-20 h-3/6'>
                <div className='w-1/2 flex justify-end pr-20'>
                    <ChessBoard />
                </div>
                <div className='w-1/2 flex pl-20 '>
                    <h2>Hola</h2>
                    <div className='w-3/5 h-full flex flex-col items gap-8 '>
                        <h2 className='text-white text-5xl text-normal font-lancelot font-semibold pt-4' style={{ textShadow: '1px 2px 1px black' }}>¡Bienvenido a la plataforma de retos de ajedrez!</h2>
                        <div className='gap-6 flex flex-col'>
                            {otherMoves.map((move, index) => {
                                const moveText = move.split(':')[1] + ':' + move.split(':')[2];
                                return (
                                    <div className="flex items-center" key={index}>
                                        <input type="radio" id={`move-${index}`} name="drone" value={move} className="w-8 h-8 border-2 border-blue-500 rounded-full" onChange={handleMoveSelection} />
                                        <label htmlFor={`move-${index}`} className='text-white text-2xl text-normal font-serif font-semibold ml-2' style={{ textShadow: '1px 2px 1px black' }}>{moveText}</label>
                                    </div>
                                );
                            })}
                        </div>
                        <div className='flex flex-col items-center gap-16'>
                            <button className='bg-white text-black text-3xl font-lancelot font-semibold px-10 py-2 rounded-lg border-2 border-black' onClick={option === 'Comprobar' ? checkMove : searchChallenge}>{option}</button>
                            <h2 className='text-white text-6xl font-lancelot font-semibold' style={{ textShadow: '3px 2px 2px black' }}>{result}</h2>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}