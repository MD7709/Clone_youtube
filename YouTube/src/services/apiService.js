import axios from 'axios';

const API_KEY = 'AIzaSyDAJJgsXni6thQgIiTgWkQpCG6tu9MBKy4';
const API_URL = `https://www.googleapis.com/youtube/v3/search`;

export const fetchVideos = async (query) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        part: 'snippet',
        maxResults: 100,
        q: query || 'trending',
        key: API_KEY
      }
    });
    console.log('Fetched videos data:', response.data.items);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};
