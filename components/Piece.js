import styled from "styled-components";
// aqui se encontra as damas de onrar
const PieceWrapper = styled.div`
  width: 80%;
  height: 80%;
  margin: auto;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease-in-out;
  transform: ${(props) => (props.selected ? "scale(1.1)" : "scale(1)")};
`;

const Crown = styled.div`
  width: 50%;
  height: 50%;
  margin: auto;
  border-radius: 50%;
  background-color: gold;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10%;
    border-radius: 50%;
    background-color: gold;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const Piece = ({ color, isKing, onClick, id }) => {
  return (
    <PieceWrapper color={color} onClick={onClick} id={id}>
      {isKing && <Crown />}
    </PieceWrapper>
  );
};

export default Piece;
