'use client';

import { useChat } from 'ai/react';
import { useCallback } from 'react';
import ChessBoard from './components/ChessBoard'
import Link from 'next/link';


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

    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch ">
      <h1>Primera Página</h1>
      <Link href="/Game">
        <button>Ir a la Segunda Página</button>
      </Link>
    </div>
  );
}
