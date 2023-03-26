import axios from 'axios';
const API_KEY = '33350252-53a75f568ce69e642e03bf7bf';
const BASE_URL = 'https://pixabay.com/api'

export const FetchUrl = (searchQuery, page) => {
  const q = searchQuery.trim().split(" ").join("+")
 return axios
        .get(`${BASE_URL}/?key=${API_KEY}&q=${q}`, {
          params: {
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 40,
            page: page,
            webformatWidth: 960,
            validateStatus: status => {
              return status >= 200 && status < 300;
            },
          },
        })
 
};

