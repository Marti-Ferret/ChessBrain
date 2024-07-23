import ChessBoard from '../components/ChessBoard';

import { useEffect } from 'react';


export default function SegundaPagina() {

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
                    <div className='w-3/5 h-full flex flex-col gap-10'>
                        <h2 className='text-white text-5xl text-normal font-lancelot font-semibold pt-4' style={{ textShadow: '1px 2px 1px black' }}>¡Bienvenido a la plataforma de retos de ajedrez!</h2>
                        <div className="flex items-center ">
                            <input type="radio" id="louie" name="drone" value="louie" className="w-8 h-8 border-2 border-blue-500 rounded-full" />
                            <label htmlFor="louie" className='text-white text-2xl text-normal font-serif font-semibold ml-2 ' style={{ textShadow: '1px 2px 1px black' }}>E4 - A1</label>

                        </div>
                        <div className="flex items-center ">
                            <input type="radio" id="louie" name="drone" value="louie" className="w-8 h-8 border-2 border-blue-500 rounded-full" />
                            <label htmlFor="louie" className='text-white text-2xl text-normal font-serif font-semibold ml-2 ' style={{ textShadow: '1px 2px 1px black' }}>E4 - A1</label>

                        </div>
                        <div className="flex items-center ">
                            <input type="radio" id="louie" name="drone" value="louie" className="w-8 h-8 border-2 border-blue-500 rounded-full" />
                            <label htmlFor="louie" className='text-white text-2xl text-normal font-serif font-semibold ml-2 ' style={{ textShadow: '1px 2px 1px black' }}>E4 - A1</label>

                        </div>
                        <div className='flex justify-center'>
                            <button className=' bg-white text-black text-3xl font-lancelot font-semibold px-10 py-2 rounded-lg border-2 border-black' >Comprobar</button>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
