import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Asset } from 'expo-asset';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }
  
  function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
  }

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      const imageAssets = cacheImages([
        require('../assets/images/login-bg.png'),
        require('../assets/images/register-bg.png'),
        require('../assets/images/logo-white-trans.png')
      ]);

      const fontAssets = cacheFonts([
        Ionicons.font
      ])

      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Promise.all([...imageAssets, ...fontAssets])
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
