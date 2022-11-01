import styled from "styled-components";
export const Button = styled.button`
  background-color: white;
  color: black;
  font-size: 20px;
  padding: 5px 15px;
  border-radius: 5px;
  margin: 10px 5px;
  cursor: pointer;
  border: 0;
  transition: ease background-color 250ms;
  &:hover {
    background-color: #49525c;
    color: white;
  }
`;
export const Tab = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  opacity: 0.6;
  background: #282c34;
  font-size: 20px;
  color: white;
  border: 0;
  outline: 0;
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid white;
    opacity: 1;
  `}
`;
export const ButtonGroup = styled.div`
  margin: 10px;
`;
export const Input = styled.input`
  background-color: white;
  text-align: center;
  color: black;
  font-size: 12px;
  padding: 5px 5px;
  border-radius: 5px;
  margin: 5px 2px;
  cursor: pointer;
  border: 0;
  transition: ease background-color 250ms;
  &:hover {
    background-color: #49525c;
    color: white;
  }
`;
