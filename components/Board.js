import { useState } from "react";
import styled from "styled-components";
import Piece from "./Piece";

// Portanto, a lógica da implementação das damas pode ser realizada somente nos arquivos Board.js e Game.js.

const BoardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 640px;
  height: 640px;
  margin: 0 auto;
  border: 2px solid #333;

  & > div {
    display: flex;
    width: 100%;
  }

  & > div:nth-child(even) > div:nth-child(odd),
  & > div:nth-child(odd) > div:nth-child(even) {
    background-color: #b58863;
  }

  & > div:nth-child(odd) > div:nth-child(odd),
  & > div:nth-child(even) > div:nth-child(even) {
    background-color: #f0d9b5;
  }
`;

const Board = () => {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [board, setBoard] = useState([
    ["white", null, "white", null, "white", null, "white", null, "white", null],
    [null, "white", null, "white", null, "white", null, "white", null, "white"],
    ["white", null, "white", null, "white", null, "white", null, "white", null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    ["black", null, "black", null, "black", null, "black", null, "black", null],
    [null, "black", null, "black", null, "black", null, "black", null, "black"],
    ["black", null, "black", null, "black", null, "black", null, "black", null],
  ]);

  const renderPiece = (piece, row, col) => {
    const handlePieceClick = () => {
      if (piece !== null) {
        setSelectedPiece({ piece, row, col });
      } else if (selectedPiece !== null) {
        const newBoard = [...board];
        const {
          piece: selectedPieceColor,
          row: selectedRow,
          col: selectedCol,
        } = selectedPiece;

        // determina a direção em que a peça deve se mover
        const direction = selectedPieceColor === "white" ? -1 : 1; // se a peça é branca, a direção é para cima (-1), se for preta, a direção é para baixo (1)

        // verifica se as novas coordenadas estão dentro dos limites do tabuleiro
        if (
          row >= 0 &&
          row < board.length &&
          col >= 0 &&
          col < board[0].length
        ) {
          // verifica se o movimento é válido para uma dama
          if (
            row !== selectedRow &&
            col !== selectedCol &&
            Math.abs(row - selectedRow) === Math.abs(col - selectedCol)
          ) {
            // verifica se há peças no caminho
            for (let i = 1; i < Math.abs(row - selectedRow); i++) {
              const rowToCheck = selectedRow + i * Math.sign(row - selectedRow);
              const colToCheck = selectedCol + i * Math.sign(col - selectedCol);
              if (board[rowToCheck][colToCheck] !== null) {
                return;
              }
            }
            // move a peça para a nova posição
            newBoard[row][col] = selectedPieceColor;
            newBoard[selectedRow][selectedCol] = null;
            setSelectedPiece(null);
            setBoard(newBoard);
          } else if (
            row === selectedRow + direction * 2 &&
            (col === selectedCol + 2 || col === selectedCol - 2) &&
            newBoard[selectedRow + direction][(selectedCol + col) / 2] !==
              null &&
            newBoard[selectedRow + direction][(selectedCol + col) / 2] !==
              selectedPieceColor
          ) {
            // move a peça para a nova posição
            newBoard[row][col] = selectedPieceColor;
            newBoard[selectedRow][selectedCol] = null;
            newBoard[selectedRow + direction][(selectedCol + col) / 2] = null;
            setSelectedPiece(null);
            setBoard(newBoard);
          }
        }
      }
    };
    const style = {
      cursor: piece !== null ? "pointer" : "default",
      backgroundColor: (row + col) % 2 === 0 ? "#b58863" : "#f0d9b5",
    };

    if (
      selectedPiece !== null &&
      selectedPiece.row === row &&
      selectedPiece.col === col
    ) {
      style.backgroundColor = "#4f4";
    }

    if (piece === "white") {
      return <Piece color="#fff" style={style} onClick={handlePieceClick} />;
    } else if (piece === "black") {
      return <Piece color="#000" style={style} onClick={handlePieceClick} />;
    } else {
      return <div style={style} onClick={handlePieceClick} />;
    }
  };
  console.log(<Piece />);

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} style={{ display: "flex" }}>
        {row.map((piece, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} style={{ flex: 1 }}>
            {renderPiece(piece, rowIndex, colIndex)}
          </div>
        ))}
      </div>
    ));
  };

  return <BoardWrapper>{renderBoard()}</BoardWrapper>;
};

export default Board;
