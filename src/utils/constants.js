let apiRoot = '';
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017';
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-clone-0cyo.onrender.com';
}

export const API_ROOT = apiRoot;
