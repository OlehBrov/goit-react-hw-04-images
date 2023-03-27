import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searcbar/Searchbar';
import { Modal } from './Modal/Modal';
import styled from 'styled-components';

export const App = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalURL, setModalURL] = useState('');
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const handlerStateChange = articles => {
   setArticles(articles );
  };
  const searchInputHandler = inputValue => {
    setSearchQuery(inputValue);
  };

  const modalWindowHandler = image => {
   setModalIsVisible(modalIsVisible => !modalIsVisible)
  setModalURL(image.largeImageURL)
  };

 return (
      <Container>
        {modalIsVisible&&<Modal
            modalURL={modalURL}
            modalWindowHandler={modalWindowHandler}
          >
            <img src={modalURL} alt="" />
          </Modal>}
        <Searchbar searchInputHandler={searchInputHandler} />
        <ImageGallery
          articles={articles}
          searchQuery={searchQuery}
          modalWindowHandler={modalWindowHandler}
          handlerStateChange={handlerStateChange}
        />

        {/* <Loader></Loader> */}
      </Container>
    );
}




const Container  = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding-left: 15px;
  padding-right: 15px; */

`