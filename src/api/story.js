const HN_BASE_URL = 'https://hn.algolia.com/api/v1/search?query=';

export const fetchStories = query => fetch(HN_BASE_URL + query).then(response => response.json());
