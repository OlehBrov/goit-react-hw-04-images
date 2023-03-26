import { Component } from 'react';
import { FetchUrl } from 'components/Fetch/FetchURL';
import { GalleryItem } from '../GalleryItem/GalleryItem';
import { IdleView } from 'components/Views/IdleView';
import { PendingView } from 'components/Views/PendingView';
import styled from 'styled-components';
// import { MdImageSearch } from 'react-icons/md';
// import { IconContext } from 'react-icons';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};
export class ImageGallery extends Component {
  state = {
    articles: this.props.articles,
    status: STATUS.IDLE,
    articlesPage: 1,
    error: '',
    isLoadMoreEnabled: false,
    itemsPerPage: 40,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: STATUS.PENDING });
      if (this.props.searchQuery.trim() !== '') {
        FetchUrl(this.props.searchQuery, this.state.articlesPage)
          .then(data => {
            if (data.data.total === 0 || data.data.hits.length === 0) {
              return Promise.reject('No pictures available on your request ((');
            } else
              this.setState({
                articles: data.data.hits,
                status: STATUS.RESOLVED,
                articlesPage: 2,
                totalHits: data.data.totalHits,
                isLoadMoreEnabled:
                  data.data.hits.length !== 0 &&
                  data.data.totalHits > data.data.hits.length,
              });
          })
          .catch(error => {
            this.setState({ status: STATUS.REJECTED, error });
          });
      } else {
        alert('Invalid search query');
        this.setState({ status: STATUS.IDLE });
      }
    }
  }

  // checkIfMoreAvailable = (data) => {
  //   console.log('this.state.totalHits', this.state.totalHits);
  //   console.log('this.state.articles.length', this.state.articles.length);

  //   this.setState({isLoadMoreEnabled:this.state.totalHits <= data.data.hits}) ;
  // };
  handleLoadMoreButton = e => {
    this.setState(prevState => {
      return { articlesPage: prevState.articlesPage + 1 };
    });
    FetchUrl(this.props.searchQuery, this.state.articlesPage)
      .then(data => {
        if (data.data.total === 0) {
          return Promise.reject('No data available!');
        }
        this.setState(prevState => {
          return {
            articles: [...prevState.articles, ...data.data.hits],
            status: STATUS.RESOLVED,
            isLoadMoreEnabled:
              data.data.totalHits %
                [...prevState.articles, ...data.data.hits].length ===
                0 &&
              data.data.totalHits ===
                [...prevState.articles, ...data.data.hits].length
                ? false
                : true,
          };
        });
      })
      .catch(error => {
        this.setState({ status: STATUS.REJECTED, error });
        console.log(error);
      });
  };

  fullViewHandle = (e, picId) => {
    e.preventDefault();
    e.stopPropagation();
    const largeImg = this.state.articles.find(el => {
      return el.id === picId;
    });
    this.props.modalWindowHandler(largeImg);
  };
  render() {
    if (this.state.status === STATUS.IDLE) {
      return (
        <ListContainer>
          {' '}
          <IdleView />
        </ListContainer>
      );
    } else if (this.state.status === STATUS.PENDING) {
      return (
        <ListContainer>
          <PendingView />;
        </ListContainer>
      );
    } else if (this.state.status === STATUS.RESOLVED) {
      return (
        <ListContainer>
          <GalleryItem
            articles={this.state.articles}
            fullViewHandle={this.fullViewHandle}
          />
          {this.state.isLoadMoreEnabled && (
            <LoadMoreButton
              type="button"
              // disabled={this.state.isLoadMoreEnabled}
              onClick={this.handleLoadMoreButton}
            >
              Load More...
            </LoadMoreButton>
          )}
        </ListContainer>
      );
    } else if (this.state.status === STATUS.REJECTED) {
      return (
        <ListContainer>
          <h1>Something went wrong. {this.state.error}</h1>
        </ListContainer>
      );
    }
  }
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 25px;
  margin: 0 auto;
`;

const LoadMoreButton = styled.button`
  height: 25px;
  justify-self: center;
`;
