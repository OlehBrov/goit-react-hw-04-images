import { useState } from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import {
  SearchbarStyled,
  FieldStyled,
  SearchButtonStyled,
} from './Searchbar.styled';

export const Searchbar = props => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchSubmit = values => {
    props.searchInputHandler(searchQuery);
    setSearchQuery('');
  };
  const handleChange = e => {
    const { value } = e.target;
    setSearchQuery(value.trim());
  };
  return (
    <SearchbarStyled>
      <Formik initialValues={searchQuery} onSubmit={searchSubmit}>
        <FormStyled>
          <FieldStyled
            id="searchQuery"
            name="searchQuery"
            placeholder="Enter your query"
            value={searchQuery}
            onChange={handleChange}
          />
          <IconContext.Provider
            value={{
              size: '20px',
              attr: {
                position: 'absolute',
                top: '0',
                left: '0',
              },
            }}
          >
            <SearchButtonStyled type="submit">
              <AiOutlineSearch />
            </SearchButtonStyled>
          </IconContext.Provider>
        </FormStyled>
      </Formik>
    </SearchbarStyled>
  );
};

const FormStyled = styled(Form)`
  display: flex;
  align-items: center;
`