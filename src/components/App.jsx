import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searcbar/Searchbar';
import { Modal } from './Modal/Modal';
import styled from 'styled-components';

export class App extends Component {
  state = {
    articles: [], 
    searchQuery: '',
    modalURL: '',
    modalIsVisible: false,
  };

  handlerStateChange = articles => {
    this.setState({ articles });
  };
  searchInputHandler = inputValue => {
    this.setState({ searchQuery: inputValue });
  };

  modalWindowHandler = image => {
    this.setState(prevState => {
      return { modalIsVisible: !prevState.modalIsVisible };
    });
    this.setState({
      modalURL: image.largeImageURL,
    });
  };

  render() {
    
    return (
      <Container>
        {this.state.modalIsVisible&&<Modal
            modalURL={this.state.modalURL}
            modalWindowHandler={this.modalWindowHandler}
          >
            <img src={this.state.modalURL} alt="" />
          </Modal>}
        <Searchbar searchInputHandler={this.searchInputHandler} />
        <ImageGallery
          articles={this.state.articles}
          searchQuery={this.state.searchQuery}
          modalWindowHandler={this.modalWindowHandler}
          handlerStateChange={this.handlerStateChange}
        />

        {/* <Loader></Loader> */}
      </Container>
    );
  }
}

const Container  = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding-left: 15px;
  padding-right: 15px; */

`