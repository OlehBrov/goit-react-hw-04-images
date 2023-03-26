import styled from "styled-components";
// import { Searchbar } from "./Searchbar";
import { Field } from 'formik';

export const SearchbarStyled = styled.div`
display: flex;
position: fixed;
width: 100%;
height: 100px;
justify-content: center;
align-items: center;
background: rgb(30,21,180);
background: linear-gradient(0deg, rgba(30,21,180,1) 0%, rgba(78,87,116,1) 50%, rgba(30,21,180,1) 100%);
border-bottom: 4px solid black;
`

export const FieldStyled = styled(Field)`
font-size: 18px;
`
export const SearchButtonStyled = styled.button`
  margin-left: 15px;
`;