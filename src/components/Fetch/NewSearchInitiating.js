 

export const newSearchInit = (searchQuery, articlesPage, articles) => {
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
  }