import axios from 'axios';

const apiInstance = axios.create({
  baseURL:
    import.meta.env.VITE_ENV === 'development'
      ? '/api/v3/search/book'
      : 'https://dapi.kakao.com/v3/search/book',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
  },
});

export default apiInstance;
