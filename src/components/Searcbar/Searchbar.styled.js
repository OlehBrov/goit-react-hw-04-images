import styled from 'styled-components';
import { Field } from 'formik';

export const SearchbarStyled = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  background: #13274F;
  border-bottom: 4px solid black;
`;

export const FieldStyled = styled(Field)`
  font-size: 18px;
`;
export const SearchButtonStyled = styled.button`
  margin-left: 15px;
  cursor: pointer;
`;
