import { fetchUtils } from 'react-admin';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const httpClient = fetchUtils.fetchJson;

const authProvider = {
  // called when the user attempts to log in
  login: ({ username: email, password }) => {

    return httpClient(`${apiUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json;
      })
      .then(({ token }) => {
        console.log('token', token);
        sessionStorage.setItem('auth', token);
      });
  },
  // called when the user clicks on the logout button
  logout: () => {
    sessionStorage.removeItem('auth');
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      sessionStorage.removeItem('auth');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return sessionStorage.getItem('auth')
      ? Promise.resolve()
      : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: async () => {
    const token = sessionStorage.getItem('auth');
    console.log('header token', token);
    let headers = new Headers({ Accept: 'application/json' });
    if (token) {
      headers.set('Authorization', `${token}`);
    }
    return httpClient(`${apiUrl}/auth/me`, {
      method: 'GET',
      headers: headers,
    }).then(({ json }) => {
      return json;
    });
  },
};

export default authProvider;
