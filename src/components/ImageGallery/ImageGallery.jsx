import { useState, useEffect, useCallback } from 'react';
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

export const ImageGallery = props => {
  const [articles, setArticles] = useState(props.articles);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [articlesPage, setArticlesPage] = useState(1);
  const [error, setError] = useState('');
  const [isLoadMoreEnabled, setIsLoadMoreEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState(props.searchQuery);

  useEffect(() => {
    if (props.searchQuery !== '') {
      setSearchQuery(props.searchQuery);
      newSearchInit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchQuery]);

  const newSearchInit = useCallback(() => {
    setStatus(STATUS.PENDING);
    if (props.searchQuery.trim() !== '') {
      FetchUrl(props.searchQuery, articlesPage)
        .then(data => {
          if (data.data.total === 0 || data.data.hits.length === 0) {
            return Promise.reject('No pictures available on your request ((');
          } else setArticles(data.data.hits);
          setStatus(STATUS.RESOLVED);
          setArticlesPage(2);
          setIsLoadMoreEnabled(
            data.data.totalHits === [...articles, ...data.data.hits].length
              ? false
              : true
          );
        })
        .catch(error => {
          setStatus(STATUS.REJECTED);
          setError(error);
        });
    } else {
      alert('Invalid search query');
      setStatus(STATUS.IDLE);
    }
  }, [articles, articlesPage, props.searchQuery]);

  const handleLoadMoreButton = e => {
    setArticlesPage(articlesPage + 1);

    FetchUrl(searchQuery, articlesPage)
      .then(data => {
        if (data.data.total === 0) {
          return Promise.reject('No data available!');
        }
        setArticles([...articles, ...data.data.hits]);
        setStatus(STATUS.RESOLVED);

        setIsLoadMoreEnabled(
          data.data.totalHits === [...articles, ...data.data.hits].length
            ? false
            : true
        );
      })
      .catch(error => {
        setStatus(STATUS.REJECTED);
        setError(error);
        console.log(error);
      });
  };

  const fullViewHandle = (e, picId) => {
    e.preventDefault();
    e.stopPropagation();
    const largeImg = articles.find(el => {
      return el.id === picId;
    });
    props.modalWindowHandler(largeImg);
  };

  if (status === STATUS.IDLE) {
    return (
      <ListContainer>
        {' '}
        <IdleView />
      </ListContainer>
    );
  } else if (status === STATUS.PENDING) {
    return (
      <ListContainer>
        <PendingView />;
      </ListContainer>
    );
  } else if (status === STATUS.RESOLVED) {
    return (
      <ListContainer>
        <GalleryItem articles={articles} fullViewHandle={fullViewHandle} />
        {isLoadMoreEnabled && (
          <LoadMoreButton
            type="button"
            // disabled={isLoadMoreEnabled}
            onClick={handleLoadMoreButton}
          >
            Load More...
          </LoadMoreButton>
        )}
      </ListContainer>
    );
  } else if (status === STATUS.REJECTED) {
    return (
      <ListContainer>
        <h1>Something went wrong. {error}</h1>
      </ListContainer>
    );
  }
};

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
