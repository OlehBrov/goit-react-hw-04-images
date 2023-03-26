import { MdImageSearch } from 'react-icons/md';
import { IconContext } from 'react-icons';
import styled from 'styled-components';
export const IdleView = () => {
  return (
    
      <IconContext.Provider
        value={{ className: 'global-class-name', size: '350px' }}
      >
        <IdleContainer>
          <h1>Please, enter your search query to find images</h1>
          <MdImageSearch />
        </IdleContainer>
      </IconContext.Provider>
    
  );
};

const IdleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`