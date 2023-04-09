import React from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import Parse from 'parse';
import ReactDOM from 'react-dom/client';

import '@styles/styles.css';

// import App from './App';
// import './config/i18n';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
export const SERVER_URL = {
  preprod: 'https://iray-lalana-app-preprod.herokuapp.com',
  prod: 'https://iray-lalana-app.herokuapp.com',
};

export const getServerUrl = (): string => {
  if ((window as any).LOCAL) {
    const SERVER_PORT = 8082;
    const location = window.location;
    return location.protocol + '//' + location.hostname + ':' + SERVER_PORT;
  }

  if ((window as any).PREPROD) {
    return SERVER_URL.preprod;
  }

  return SERVER_URL.prod;
};

const init = async () => {
  // --------------------------------- //
  // -------------- ENV -------------- //
  // --------------------------------- //
  // get app env by browser url
  const location = window.location;
  // LOCAL can also mean "accessed by a remote machine (like a Mac) on the local dev network"
  const hostName = location.hostname;
  const LOCAL: boolean = hostName.includes('localhost');
  const PREPROD: boolean = hostName.includes('preprod');
  const PROD = !LOCAL && !PREPROD;

  (window as any).LOCAL = LOCAL;
  (window as any).PREPROD = PREPROD;
  (window as any).PROD = PROD;

  // --------------------------------- //
  // ----------- PARSE INIT ---------- //
  // --------------------------------- //
  const serverUrl = getServerUrl();

  Parse.initialize(import.meta.env.VITE_PARSE_APP_ID ?? 'my-app');
  Parse.serverURL = serverUrl + '/parse';
  // --------------------------------- //
  // ------ LOGGED IN USER INIT ------ //
  // --------------------------------- //

  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <h1>Hello there</h1>
    </React.StrictMode>,
  );
};

init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
