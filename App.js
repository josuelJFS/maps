/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/Entypo';
import {dados} from './dados';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [regions, setRegions] = useState({
    latitude: -28.260090226625,
    longitude: -53.494797084724,
    latitudeDelta: 0.1015,
    longitudeDelta: 0.10121,
  });
  const [enableIconZoom, setEnableIconZoom] = useState({
    tipo0: false,
    tipo3: false,
  });
  const [codenates, setCordenates] = useState(dados);
  const [codenatespolyLine1, setCodenatespolyLin] = useState(
    dados
      .filter(e => e.TipoObjeto == 1)
      .map(value => {
        return {
          latitude: parseFloat(value.LatitudeLongitude.split(',')[0]),
          longitude: parseFloat(value.LatitudeLongitude.split(',')[1]),
        };
      }),
  );
  const [codenatespolyLine2, setCodenatespolyLin2] = useState(
    dados
      .filter(e => e.TipoObjeto == 2)
      .map(value => {
        return {
          latitude: parseFloat(value.LatitudeLongitude.split(',')[0]),
          longitude: parseFloat(value.LatitudeLongitude.split(',')[1]),
        };
      }),
  );

  function TypeIconRender(type) {
    if (type == 0 && enableIconZoom.tipo0)
      return <Icon color="red" name="vinyl" size={20} />;
    if (type == 3 && enableIconZoom.tipo3)
      return <Icon name="location-pin" size={20} />;
    if (type == 4 && enableIconZoom.tipo3)
      return <Icon name="triangle-up" size={20} />;
    if (type == 5) return <Icon name="old-phone" size={20} />;
    return false;
  }

  function MakerRender(cordenates, i, cords) {
    if (cordenates.TipoObjeto === 1) return null;
    if (cordenates.TipoObjeto === 2) return null;
    const Rendermaker = TypeIconRender(cordenates.TipoObjeto);
    if (!Rendermaker) return <></>;
    return (
      <Marker title={cordenates.TipoObjeto + ''} key={i} coordinate={cords}>
        {Rendermaker}
      </Marker>
    );
  }

  useEffect(() => {
    console.log(regions);
    if (
      regions.latitudeDelta < 0.07031870760664205 &&
      regions.longitudeDelta < 0.050604902207858515
    ) {
      setEnableIconZoom(props => ({...props, tipo3: true}));
    }
    if (
      regions.latitudeDelta < 0.062650974094867706 &&
      regions.longitudeDelta < 0.050604902207858515
    ) {
      return setEnableIconZoom(props => ({...props, tipo0: true}));
    }
    if (
      regions.latitudeDelta > 0.07031870760664205 &&
      regions.longitudeDelta > 0.050604902207858515
    ) {
      setEnableIconZoom({tipo3: false, tipo0: false});
    }
  }, [regions]);

  return (
    <MapView
      zoomEnabled={true}
      onRegionChangeComplete={setRegions}
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={{flex: 1}}
      region={{
        latitude: -28.260090226625,
        longitude: -53.494797084724,
        latitudeDelta: 0.1015,
        longitudeDelta: 0.10121,
      }}>
      {codenates.map((cordenates, i) => {
        let cordesValues = cordenates.LatitudeLongitude.split(',');
        let cords = {
          latitude: parseFloat(cordesValues[0]),
          longitude: parseFloat(cordesValues[1]),
        };
        return MakerRender(cordenates, i, cords);
      })}
      {codenatespolyLine1.length > 0 && enableIconZoom.tipo3 && (
        <Polyline
          strokeColor="blue"
          strokeColors={['#7F0000']}
          strokeWidth={1}
          coordinates={codenatespolyLine1}
        />
      )}
      {codenatespolyLine2.length > 0 && enableIconZoom.tipo3 && (
        <Polyline
          strokeColor="red"
          strokeColors={['#7F0000']}
          strokeWidth={1}
          coordinates={codenatespolyLine2}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
