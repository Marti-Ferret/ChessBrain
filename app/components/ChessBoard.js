// components/ChessBoard.js
"use client";

import styled from 'styled-components';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: 20px repeat(8, 50px) 20px;
  grid-template-rows: 20px repeat(8, 50px) 20px;
  width: 440px;
  height: 440px;
`;

const Board = styled.div`
  grid-column: 2 / 10;
  grid-row: 2 / 10;
  display: grid;
  grid-template-columns: repeat(8, 50px);
  grid-template-rows: repeat(8, 50px);
`;

const Square = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isBlack }) => (isBlack ? 'gray' : 'white')};
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const pieces = {
    torre_blanca: '♖',
    caballo_blanco: '♘',
    alfil_blanco: '♗',
    dama_blanca: '♕',
    rey_blanco: '♔',
    peon_blanco: '♙',
    torre_negra: '♜',
    caballo_negro: '♞',
    alfil_negro: '♝',
    dama_negra: '♛',
    rey_negro: '♚',
    peon_negro: '♟',
};

const initialPositions = [
    "E1:rey_blanco", "D2:peon_blanco", "F3:torre_blanca", "E8:rey_negro", "D7:peon_negro", "C6:alfil_negro"

];

const bestMove = ["torre_blanca:F3:D3"];
const otherMoves = ["peon_blanco:D2:D3", "rey_blanco:E1:D1"];

const getBoard = () => {
    const board = Array(8).fill(null).map(() => Array(8).fill(null));

    initialPositions.forEach(pos => {
        const [position, piece] = pos.split(':');
        const col = position.charCodeAt(0) - 'A'.charCodeAt(0);
        const row = 8 - parseInt(position[1], 10);
        board[row][col] = piece;
    });

    return board;
};

const ChessBoard = () => {
    const board = getBoard();

    return (
        <BoardContainer>
            {Array.from({ length: 8 }, (_, i) => (
                <Label key={`col-${i}`} style={{ gridColumn: i + 2, gridRow: 1 }}>
                    {String.fromCharCode(65 + i)}
                </Label>
            ))}
            {Array.from({ length: 8 }, (_, i) => (
                <Label key={`row-${i}`} style={{ gridColumn: 1, gridRow: i + 2 }}>
                    {8 - i}
                </Label>
            ))}
            {Array.from({ length: 8 }, (_, i) => (
                <Label key={`col-footer-${i}`} style={{ gridColumn: i + 2, gridRow: 10 }}>
                    {String.fromCharCode(65 + i)}
                </Label>
            ))}
            {Array.from({ length: 8 }, (_, i) => (
                <Label key={`row-footer-${i}`} style={{ gridColumn: 10, gridRow: i + 2 }}>
                    {8 - i}
                </Label>
            ))}
            <Board>
                {board.flat().map((piece, index) => {
                    const row = Math.floor(index / 8);
                    const col = index % 8;
                    const isBlack = (row + col) % 2 === 1;
                    return (
                        <Square key={index} isBlack={isBlack}>
                            {piece ? pieces[piece] : ''}
                        </Square>
                    );
                })}
            </Board>
        </BoardContainer>
    );
};

export default ChessBoard;
