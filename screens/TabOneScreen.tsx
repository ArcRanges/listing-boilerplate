import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  Platform
} from 'react-native';
import SearchBar from 'react-native-platform-searchbar'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const SCREEN_WIDTH = Dimensions.get('window').width;

import {
  Placeholder,
  PlaceholderMedia,
  Shine,
} from "rn-placeholder";

const DATA = [
  {
    "avg_horsepower": 190.625,
    "avg_price": 27965,
    "id": 2,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Honda-logo-1.jpg",
    "max_car_id": 152,
    "name": "Honda",
    "num_models": 8,
    "icon_url": require('../assets/brands/honda.png'),
  },
  {
    "avg_horsepower": 333.94444444444446,
    "avg_price": 80681.94444444444,
    "id": 3,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Mercedes-Benz-logo-1.jpg",
    "max_car_id": 270,
    "name": "Mercedes Benz",
    "num_models": 18,
    "icon_url": require('../assets/brands/mercedes-benz.png'),
  },
  {
    "avg_horsepower": 299.8333333333333,
    "avg_price": 31406.666666666668,
    "id": 4,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Ram-logo-1.jpg",
    "max_car_id": 307,
    "name": "Ram",
    "num_models": 6,
    "icon_url": require('../assets/brands/ram.png'),
  },
  {
    "avg_horsepower": 281.2631578947368,
    "avg_price": 34998.68421052631,
    "id": 5,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Ford-logo-1.jpg",
    "max_car_id": 125,
    "name": "Ford",
    "num_models": 19,
    "icon_url": require('../assets/brands/ford.png'),
  },
  {
    "avg_horsepower": 292.3333333333333,
    "avg_price": 40609.444444444445,
    "id": 6,
    "img_url": "http://ts2.mm.bing.net/th?id=OIP.M6d3b221e6c330e62efcd088e220170bcH0&pid=15.1",
    "max_car_id": 146,
    "name": "GMC",
    "num_models": 9,
    "icon_url": require('../assets/brands/gmc.png'),
  },
  {
    "avg_horsepower": 340.59090909090907,
    "avg_price": 66631.81818181818,
    "id": 7,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Audi-logo-1.jpg",
    "max_car_id": 21,
    "name": "Audi",
    "num_models": 22,
    "icon_url": require('../assets/brands/audi.png'),
  },
  {
    "avg_horsepower": 192.14285714285714,
    "avg_price": 27159.285714285714,
    "id": 8,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Subaru-logo-1.jpg",
    "max_car_id": 330,
    "name": "Subaru",
    "num_models": 7,
    "icon_url": require('../assets/brands/subaru.png'),
  },
  {
    "avg_horsepower": 379.2258064516129,
    "avg_price": 74501.6129032258,
    "id": 11,
    "img_url": "http://ts3.mm.bing.net/th?id=OIP.M599f5f2d4af1c69e6d3889e235b214beH0&pid=15.1",
    "max_car_id": 64,
    "name": "BMW",
    "num_models": 31,
    "icon_url": require('../assets/brands/bmw.png'),
  },
  {
    "avg_horsepower": 285.2857142857143,
    "avg_price": 45967.857142857145,
    "id": 12,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Volvo-logo-1.jpg",
    "max_car_id": 371,
    "name": "Volvo",
    "num_models": 7,
    "icon_url": require('../assets/brands/volvo.png'),
  },
  {
    "avg_horsepower": 286.75,
    "avg_price": 45752.5,
    "id": 15,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Acura-logo-1.jpg",
    "max_car_id": 3,
    "name": "Acura",
    "num_models": 4,
    "icon_url": require('../assets/brands/acura.png'),
  },
  {
    "avg_horsepower": 311.375,
    "avg_price": 45612.5,
    "id": 17,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Infiniti-logo-1.jpg",
    "max_car_id": 177,
    "name": "Infiniti",
    "num_models": 8,
    "icon_url": require('../assets/brands/infiniti.png'),
  },
  {
    "avg_horsepower": 158.33333333333334,
    "avg_price": 24535,
    "id": 18,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Fiat-logo-1.jpg",
    "max_car_id": 115,
    "name": "Fiat",
    "num_models": 3,
    "icon_url": require('../assets/brands/fiat.png'),
  },
  {
    "avg_horsepower": 145.66666666666666,
    "avg_price": 20232.5,
    "id": 19,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Scion-logo-1.jpg",
    "max_car_id": 319,
    "name": "Scion",
    "num_models": 6,
    "icon_url": require('../assets/brands/scion.png'),
  },
  {
    "avg_horsepower": 352.14285714285717,
    "avg_price": 42466.42857142857,
    "id": 20,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Dodge-logo-1.jpg",
    "max_car_id": 112,
    "name": "Dodge",
    "num_models": 7,
    "icon_url": require('../assets/brands/dodge.png'),
  },
  {
    "avg_horsepower": 250.8421052631579,
    "avg_price": 33572.36842105263,
    "id": 23,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Chevrolet-logo-1.jpg",
    "max_car_id": 100,
    "name": "Chevrolet",
    "num_models": 19,
    "icon_url": require('../assets/brands/chevrolet.png'),
  },
  {
    "avg_horsepower": 152.14285714285714,
    "avg_price": 23680.714285714286,
    "id": 25,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Mitsubishi-logo-1.jpg",
    "max_car_id": 274,
    "name": "Mitsubishi",
    "num_models": 7,
    "icon_url": require('../assets/brands/mitsubishi.png'),
  },
  {
    "avg_horsepower": 203.08333333333334,
    "avg_price": 29929.583333333332,
    "id": 26,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Volkswagen-logo-1.jpg",
    "max_car_id": 363,
    "name": "Volkswagen",
    "num_models": 12,
    "icon_url": require('../assets/brands/volkswagen.png'),
  },
  {
    "avg_horsepower": 209.23809523809524,
    "avg_price": 36709.76190476191,
    "id": 27,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Toyota-logo-1.jpg",
    "max_car_id": 339,
    "name": "Toyota",
    "num_models": 21,
    "icon_url": require('../assets/brands/toyota.png'),
  },
  {
    "avg_horsepower": 239.83333333333334,
    "avg_price": 33440.833333333336,
    "id": 28,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Jeep-logo-1.jpg",
    "max_car_id": 187,
    "name": "Jeep",
    "num_models": 6,
    "icon_url": require('../assets/brands/jeep.png'),
  },
  {
    "avg_horsepower": 246.5,
    "avg_price": 32676.428571428572,
    "id": 29,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Hyundai-logo-1.jpg",
    "max_car_id": 160,
    "name": "Hyundai",
    "num_models": 14,
    "icon_url": require('../assets/brands/hyundai.png'),
  },
  {
    "avg_horsepower": 372.15384615384613,
    "avg_price": 61818.46153846154,
    "id": 30,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Cadillac-logo-1.jpg",
    "max_car_id": 76,
    "name": "Cadillac",
    "num_models": 13,
    "icon_url": require('../assets/brands/cadillac.png'),
  },
  {
    "avg_horsepower": 290.32,
    "avg_price": 52488.2,
    "id": 32,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Lexus-logo-1.jpg",
    "max_car_id": 222,
    "name": "Lexus",
    "num_models": 25,
    "icon_url": require('../assets/brands/lexus.png'),
  },
  {
    "avg_horsepower": 154.33333333333334,
    "avg_price": 27158.333333333332,
    "id": 34,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Mini-logo-1.jpg",
    "max_car_id": 242,
    "name": "Mini",
    "num_models": 6,
    "icon_url": require('../assets/brands/mini.png'),
  },
  {
    "avg_horsepower": 216.11111111111111,
    "avg_price": 28725.555555555555,
    "id": 35,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Kia-logo-1.jpg",
    "max_car_id": 191,
    "name": "Kia",
    "num_models": 9,
    "icon_url": require('../assets/brands/kia.png'),
  },
  {
    "avg_horsepower": 163.5,
    "avg_price": 22278.333333333332,
    "id": 37,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Mazda-logo-1.jpg",
    "max_car_id": 251,
    "name": "Mazda",
    "num_models": 6,
    "icon_url": require('../assets/brands/mazda.png'),
  },
  {
    "avg_horsepower": 251.21052631578948,
    "avg_price": 36314.73684210526,
    "id": 38,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Nissan-logo-1.jpg",
    "max_car_id": 283,
    "name": "Nissan",
    "num_models": 19,
    "icon_url": require('../assets/brands/nissan.png'),
  },
  {
    "avg_horsepower": 236.33333333333334,
    "avg_price": 31050,
    "id": 39,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Buick-logo-1.jpg",
    "max_car_id": 68,
    "name": "Buick",
    "num_models": 3,
    "icon_url": require('../assets/brands/buick.png'),
  },
  {
    "avg_horsepower": 327.5,
    "avg_price": 63783.333333333336,
    "id": 40,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Jaguar-logo-1.jpg",
    "max_car_id": 183,
    "name": "Jaguar",
    "num_models": 6,
    "icon_url": require('../assets/brands/jaguar.png'),
  },
]
export default function TabOneScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');

  const fetchData = () => {
    setLoading(true)
    
    setTimeout(()=> {
      const URL = 'https://private-anon-a25494601f-carsapi1.apiary-mock.com/manufacturers';
      fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res)=> res.json())
      .then((res)=> {
        console.log(res);
        res = res.sort((a, b) => a.name > b.name);

        setData(res);
        setLoading(false);
      }).catch((err)=> {
        console.log(err);
        setLoading(false);
      })
      // setLoading(false)
    }, 1000);
  }

  const onRefresh = () => {
    // fetchData();
  }

  useEffect(()=> {
    // fetchData();
    let d = DATA.sort((a, b) => a.name > b.name);
    setData(d)
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Placeholder Animation={Shine}>
          <View style={styles.categoriesContainer}>
            <PlaceholderMedia style={{ width: '45%', margin: 5, height: 100}}/>
            <PlaceholderMedia style={{ width: '45%', margin: 5, height: 100}}/>
            <PlaceholderMedia style={{ width: '45%', margin: 5, height: 100}}/>
            <PlaceholderMedia style={{ width: '45%', margin: 5, height: 100}}/>
            <PlaceholderMedia style={{ width: '45%', margin: 5, height: 100}}/>
            <PlaceholderMedia style={{ width: '45%', margin: 5, height: 100}}/>
            <PlaceholderMedia style={{ width: '45%', margin: 5, height: 100}}/>
            <PlaceholderMedia style={{ width: '45%', margin: 5, height: 100}}/>
          </View>
        </Placeholder>
      </View>
    )
  }
  
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }>
      <SearchBar
        value={value}
        onChangeText={setValue}
        style={styles.searchStyle}
        placeholder="Search for anything..."
        platform={Platform.OS}
      >
        {loading ? (
          <ActivityIndicator style={{ marginRight: 10 }} />
        ) : undefined}
      </SearchBar>
      <Text style={[styles.categoryTitle, {fontSize: 22, marginLeft: 15}]}>
        Search by Brand
      </Text>
      <View style={styles.categoriesContainer}>
       
        {data.map((data, index)=> {
          return (
            <TouchableOpacity 
              key={index} 
              onPress={()=> navigation.navigate('Listings', {data})}  
              style={styles.categoryBox}
            >

              <ImageBackground source={data.icon_url} 
                imageStyle={{ resizeMode: "contain",}}
                style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center',  }}>

                
              </ImageBackground>
              <Text style={styles.categoryTitle}>
                {data.name}
              </Text>
            </TouchableOpacity>
            
          )
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  categoriesContainer: {
    flex: 1,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  categoryBox: { 
    width: '45%', 
    margin: 5, 
    padding: 5, 
    backgroundColor: '#fafafa', 
    borderRadius: 5,  
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black'
  },
  categoryTitle: { 
    color: 'black', 
    fontWeight: 'bold', 
    fontSize: 16
  },
  searchStyle: {
    width: SCREEN_WIDTH - 30, 
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10
  }
});
