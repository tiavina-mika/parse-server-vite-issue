import { FC, Suspense, useEffect } from 'react';

import { ReduxRouter } from '@lagunovsky/redux-react-router';
import dayjs from 'dayjs';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
// import { theme } from './utils/themeUtils';
import { PersistGate } from 'redux-persist/integration/react';

import i18n, { getCurrentLocale } from '@config/i18n';

import { setLang } from '@redux/reducers/settingsReducer';

import history from '@routes/history';

import { translateDateLocale } from '@utils/dateUtils';
import { getStoredLanguage } from '@utils/settingsUtils';

import { Lang } from 'types/setting.type';

import MuiThemeProvider from './MuiThemeProvider';
import { store, persistor } from './redux/store';
import Routes from './Routes';

const App: FC = () => {
  // const theme = useSelector(getSettingsThemeSelector)
  // detect browser language, then save it to persisted store (redux + local storage)
  useEffect(() => {
    const persistedLocale = getStoredLanguage();
    let locale = persistedLocale;

    if (!persistedLocale) {
      // get device lang
      const defaultLang = getCurrentLocale();

      locale = defaultLang as Lang;
      // change i18n lang
      i18n.changeLanguage(defaultLang);
      // save lang to the store
      store.dispatch(setLang(defaultLang));
    }

    // translate date
    dayjs.locale(locale);
    translateDateLocale(locale as Lang);
  }, []);

  return (
    <Suspense fallback={<span>Loading</span>}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            <MuiThemeProvider>
              <ReduxRouter history={history} children={<Routes />} />
            </MuiThemeProvider>
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  );
};

export default App;
