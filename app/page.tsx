'use client';

import { useChat } from 'ai/react';
import { useCallback } from 'react';
import ChessBoard from './components/ChessBoard'
import Link from 'next/link';
import chessImage from './assets/chess.jpg';



export default function Chat() {
  const {
    error,
    input,
    isLoading,
    handleInputChange,
    messages,
    reload,
    stop,
  } = useChat({
    keepLastMessageOnError: true,
  });

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hola");
    if (input.trim() === '') {
      return;
    }

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      console.error("An error occurred while processing the request.");
    }
  }, [input]);


  return (

    <div className="w-full h-screen bg-cover bg-center z-10 flex flex-row" style={{ backgroundImage: `url(${chessImage.src})` }}>
      <div className='w-1/2 flex justify-end pt-44 pr-10'>
        <h1 className='text-white text-9xl font-lancelot tracking-wide' style={{ textShadow: '4px 5px 2px black' }}>CHESSBRAIN</h1>
      </div>

      <div className='flex flex-col w-1/2 pl-10 h-1/2 pt-72'>
        <div className=' w-2/3 flex flex-col items-center'>
          <h2 className='text-white text-5xl text-center font-lancelot font-semibold' style={{ textShadow: '1px 2px 1px black' }}>¡Bienvenido a la plataforma de retos de ajedrez!</h2>
          <p className='text-3xl text-white mt-10 text-center font-lancelot ' style={{ textShadow: '1px 2px 2px black' }}>Explora una manera innovadora y emocionante de perfeccionar tus habilidades ajedrecísticas y enfrentarte a desafíos intelectuales. Nuestra plataforma, guiada por GPT-4, es el entorno ideal para aquellos que buscan mejorar y disfrutar del ajedrez.</p>
          <Link href="/Game">
            <button className='mt-10 bg-white text-black text-3xl font-lancelot font-semibold px-10 py-2 rounded-lg border-2 border-black' >Empezar</button>
          </Link>
        </div>

      </div>



    </div >
  );
}
