import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const inputString = '[\n    "E1:rey_blanco", "D2:dama_blanca", "C3:torre_blanca", "E8:rey_negro", "D7:torre_negra"\n],\n\n[\n    "dama_blanca:D2:D7"\n],\n\n[\n    "torre_blanca:C3:C7",\n    "rey_blanco:E1:D1"\n]';

    // Paso 1: Eliminar caracteres de escape y espacios en blanco innecesarios
    const cleanedString = inputString.replace(/\n/g, '').replace(/,\s*\[/g, '|[');

    // Paso 2: Dividir la cadena en tres partes usando el delimitador "|"
    const parts = cleanedString.split('|');

    if (parts && parts.length === 3) {
      // Paso 3: Convertir las partes en arrays
      const initialPosition = JSON.parse(parts[0]);
      const bestMove = JSON.parse(parts[1]);
      const otherMoves = JSON.parse(parts[2]);

      // Crear el objeto de respuesta
      const responseObject = {
        initialPosition,
        bestMove,
        otherMoves
      };


      return new Response(JSON.stringify(responseObject), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Manejar el caso en que la cadena no se pueda dividir correctamente
      console.log(JSON.stringify({ error: "Invalid input format" }));
      return new Response(JSON.stringify({ error: "Invalid input format" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }



    const openAi = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      compatibility: "strict"
    });

    const model = openAi("gpt-4-turbo");

    const { text } = await generateText({
      model: model,
      system: `Eres un maestro de ajedrez con una buena comprensión de las tácticas y estrategias del juego. Tu tarea es generar un problema de ajedrez sencillo en el que el jugador deba encontrar el mejor movimiento posible. El problema debe cumplir con las siguientes características:
        
        - La posición debe ser de un juego simplificado, con pocas piezas en el tablero.
        - Debes seguir estrictamente las reglas del ajedrez tradicional.
        - La solución del problema debe incluir la posición inicial del tablero en notación algebraica y el mejor movimiento, especificando la pieza y su nueva posición.
        - Verifica la validez de cada posición y movimiento asegurándote de que sean posibles según las reglas del ajedrez.
        - Asegúrate de que el movimiento no deje piezas importantes desprotegidas y que no permita una respuesta inmediata y fuerte del oponente.
        
        Las reglas básicas del ajedrez son las siguientes:
        - El tablero de ajedrez tiene 8x8 casillas, alternando entre colores claros y oscuros.
        - Las piezas se mueven de la siguiente manera:
          - Peones: avanzan una casilla hacia adelante, dos casillas en su primer movimiento; capturan en diagonal.
          - Torres: se mueven en línea recta horizontal o verticalmente.
          - Caballos: se mueven en forma de "L", dos casillas en una dirección y una en perpendicular.
          - Alfiles: se mueven en diagonal.
          - Damas: se mueven en línea recta horizontal, vertical o diagonalmente.
          - Reyes: se mueven una casilla en cualquier dirección.
        - No se permite que una pieza salte sobre otra pieza, excepto el caballo.
        - La partida termina con jaque mate al rey contrario, tablas, o bajo ciertas condiciones específicas de la partida.
        - Me tienes que devolver tres arrays, no me devuelvas texto, ni texto incial, solo tres arrays.
    
        Aquí hay ejemplos de posiciones válidas y movimientos correctos:
        - Ejemplo de posición inicial:
          [
            "E1:rey_blanco", "E8:rey_negro", "H5:torre_blanca", "A7:peon_negro"
          ]
        - Ejemplo de movimiento correcto: ["torre_blanca:H5:H8"] (la torre captura un peón negro en H8)
        
        Asegúrate de que la posición inicial y el movimiento propuestos sean claros y precisos.`,
      prompt: `Necesito que me proporciones un problema de ajedrez sencillo en el que el jugador deba encontrar el mejor movimiento posible. 
        La posición inicial debe ser aleatoria y con pocas piezas en el tablero. 
        Por favor, presenta el problema en formato de texto, incluyendo la posición inicial y mejor movimiento.
        Debes incluir exactamente las posiciones de las piezas en el tablero de ajedrez utilizando los siguientes nombres para las piezas:
        - torre_blanca,
        - caballo_blanco,
        - alfil_blanco,
        - dama_blanca,
        - rey_blanco,
        - peon_blanco,
        - torre_negra,
        - caballo_negro,
        - alfil_negro,
        - dama_negra,
        - rey_negro,
        - peon_negro.
        Por ejemplo, E1:rey_blanco, H5:torre_blanca, etc.
        No puede haber más piezas en el tablero de las que hay exactamente en el ajedrez tradicional.
        Intenta que el tablero inicial no sea la posición inicial de las piezas.
        Devuélveme dos arrays:
        1. Un array con la posición inicial de las piezas en el tablero en el formato: ["E1:rey_blanco", "H5:torre_blanca", etc.].
        2. Un array con el mejor movimiento posible en el formato: ["pieza:posicion_inicial:posicion_final"], por ejemplo ["torre_blanca:H5:H8"].
        3. Un array con dos movimientos que no sean el mejor.
        Recuerda que el usuario siempre jugará con las piezas blancas y debes seguir estrictamente las reglas del ajedrez y verificar la validez de cada movimiento y posición.
    
        Asegúrate de que:
        - La posición inicial no sea la posición estándar de inicio.
        - No haya movimientos inválidos como una torre saltando sobre peones.
        - Cada movimiento siga las reglas tradicionales del ajedrez.
        - Ten en cuenta los movimientos de las piezas que te indique anteriormente.
        - La posición inicial y el mejor movimiento sean claros y precisos.
        - El movimiento no deje piezas importantes desprotegidas o permita una respuesta inmediata y fuerte del oponente.`,
    });



    return new Response(JSON.stringify({ message: text.trim() }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred." }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}