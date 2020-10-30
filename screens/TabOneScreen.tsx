import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import {
  Placeholder,
  PlaceholderMedia,
  Shine,
} from "rn-placeholder";

const DATA = [
  {
    "avg_horsepower": 291.3333333333333,
    "avg_price": 32971.666666666664,
    "id": 1,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Chrysler-logo-1.jpg",
    "max_car_id": 104,
    "name": "chrysler",
    "num_models": 3,
  },
  {
    "avg_horsepower": 190.625,
    "avg_price": 27965,
    "id": 2,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Honda-logo-1.jpg",
    "max_car_id": 152,
    "name": "honda",
    "num_models": 8,
  },
  {
    "avg_horsepower": 333.94444444444446,
    "avg_price": 80681.94444444444,
    "id": 3,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Mercedes-Benz-logo-1.jpg",
    "max_car_id": 270,
    "name": "mercedes-benz",
    "num_models": 18,
  },
  {
    "avg_horsepower": 299.8333333333333,
    "avg_price": 31406.666666666668,
    "id": 4,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Ram-logo-1.jpg",
    "max_car_id": 307,
    "name": "ram",
    "num_models": 6,
  },
  {
    "avg_horsepower": 281.2631578947368,
    "avg_price": 34998.68421052631,
    "id": 5,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Ford-logo-1.jpg",
    "max_car_id": 125,
    "name": "ford",
    "num_models": 19,
  },
  {
    "avg_horsepower": 292.3333333333333,
    "avg_price": 40609.444444444445,
    "id": 6,
    "img_url": "http://ts2.mm.bing.net/th?id=OIP.M6d3b221e6c330e62efcd088e220170bcH0&pid=15.1",
    "max_car_id": 146,
    "name": "gmc",
    "num_models": 9,
  },
  {
    "avg_horsepower": 340.59090909090907,
    "avg_price": 66631.81818181818,
    "id": 7,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Audi-logo-1.jpg",
    "max_car_id": 21,
    "name": "audi",
    "num_models": 22,
  },
  {
    "avg_horsepower": 192.14285714285714,
    "avg_price": 27159.285714285714,
    "id": 8,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Subaru-logo-1.jpg",
    "max_car_id": 330,
    "name": "subaru",
    "num_models": 7,
  },
  {
    "avg_horsepower": 518.1666666666666,
    "avg_price": 394858.3333333333,
    "id": 9,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Rolls-Royce-logo-1.jpg",
    "max_car_id": 315,
    "name": "rolls-royce",
    "num_models": 6,
  },
  {
    "avg_horsepower": 475.25,
    "avg_price": 203787.5,
    "id": 10,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Porsche-logo-1.jpg",
    "max_car_id": 301,
    "name": "porsche",
    "num_models": 8,
  },
  {
    "avg_horsepower": 379.2258064516129,
    "avg_price": 74501.6129032258,
    "id": 11,
    "img_url": "http://ts3.mm.bing.net/th?id=OIP.M599f5f2d4af1c69e6d3889e235b214beH0&pid=15.1",
    "max_car_id": 64,
    "name": "bmw",
    "num_models": 31,
  },
  {
    "avg_horsepower": 285.2857142857143,
    "avg_price": 45967.857142857145,
    "id": 12,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Volvo-logo-1.jpg",
    "max_car_id": 371,
    "name": "volvo",
    "num_models": 7,
  },
  {
    "avg_horsepower": 324.6,
    "avg_price": 45836,
    "id": 13,
    "img_url": "http://ts1.mm.bing.net/th?id=OIP.Mce36a6de2b649f08b6c612c1bcfbcf58H2&pid=15.1",
    "max_car_id": 236,
    "name": "lincoln",
    "num_models": 5,
  },
  {
    "avg_horsepower": 444,
    "avg_price": 139934,
    "id": 14,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Maserati-logo-1.jpg",
    "max_car_id": 245,
    "name": "maserati",
    "num_models": 4,
  },
  {
    "avg_horsepower": 286.75,
    "avg_price": 45752.5,
    "id": 15,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Acura-logo-1.jpg",
    "max_car_id": 3,
    "name": "acura",
    "num_models": 4,
  },
  {
    "avg_horsepower": 641,
    "avg_price": 272862.5,
    "id": 16,
    "img_url": "http://ts4.mm.bing.net/th?id=OIP.Mc8b9a49eb7febd5471812578a1c2e300o0&pid=15.1",
    "max_car_id": 254,
    "name": "mclaren",
    "num_models": 2,
  },
  {
    "avg_horsepower": 311.375,
    "avg_price": 45612.5,
    "id": 17,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Infiniti-logo-1.jpg",
    "max_car_id": 177,
    "name": "infiniti",
    "num_models": 8,
  },
  {
    "avg_horsepower": 158.33333333333334,
    "avg_price": 24535,
    "id": 18,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Fiat-logo-1.jpg",
    "max_car_id": 115,
    "name": "fiat",
    "num_models": 3,
  },
  {
    "avg_horsepower": 145.66666666666666,
    "avg_price": 20232.5,
    "id": 19,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Scion-logo-1.jpg",
    "max_car_id": 319,
    "name": "scion",
    "num_models": 6,
  },
  {
    "avg_horsepower": 352.14285714285717,
    "avg_price": 42466.42857142857,
    "id": 20,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Dodge-logo-1.jpg",
    "max_car_id": 112,
    "name": "dodge",
    "num_models": 7,
  },
  {
    "avg_horsepower": 540.3333333333334,
    "avg_price": 235800,
    "id": 21,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Bentley-logo-1.jpg",
    "max_car_id": 67,
    "name": "bentley",
    "num_models": 3,
  },
  {
    "avg_horsepower": 531,
    "avg_price": 199819,
    "id": 22,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Aston-Martin-logo-1.jpg",
    "max_car_id": 11,
    "name": "aston-martin",
    "num_models": 5,
  },
  {
    "avg_horsepower": 250.8421052631579,
    "avg_price": 33572.36842105263,
    "id": 23,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Chevrolet-logo-1.jpg",
    "max_car_id": 100,
    "name": "chevrolet",
    "num_models": 19,
  },
  {
    "avg_horsepower": 304,
    "avg_price": 60779.166666666664,
    "id": 24,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Land-Rover-logo-1.jpg",
    "max_car_id": 206,
    "name": "land-rover",
    "num_models": 6,
  },
  {
    "avg_horsepower": 152.14285714285714,
    "avg_price": 23680.714285714286,
    "id": 25,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Mitsubishi-logo-1.jpg",
    "max_car_id": 274,
    "name": "mitsubishi",
    "num_models": 7,
  },
  {
    "avg_horsepower": 203.08333333333334,
    "avg_price": 29929.583333333332,
    "id": 26,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Volkswagen-logo-1.jpg",
    "max_car_id": 363,
    "name": "volkswagen",
    "num_models": 12,
  },
  {
    "avg_horsepower": 209.23809523809524,
    "avg_price": 36709.76190476191,
    "id": 27,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Toyota-logo-1.jpg",
    "max_car_id": 339,
    "name": "toyota",
    "num_models": 21,
  },
  {
    "avg_horsepower": 239.83333333333334,
    "avg_price": 33440.833333333336,
    "id": 28,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Jeep-logo-1.jpg",
    "max_car_id": 187,
    "name": "jeep",
    "num_models": 6,
  },
  {
    "avg_horsepower": 246.5,
    "avg_price": 32676.428571428572,
    "id": 29,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Hyundai-logo-1.jpg",
    "max_car_id": 160,
    "name": "hyundai",
    "num_models": 14,
  },
  {
    "avg_horsepower": 372.15384615384613,
    "avg_price": 61818.46153846154,
    "id": 30,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Cadillac-logo-1.jpg",
    "max_car_id": 76,
    "name": "cadillac",
    "num_models": 13,
  },
  {
    "avg_horsepower": 665,
    "avg_price": 393025,
    "id": 31,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Lamborghini-logo-1.jpg",
    "max_car_id": 199,
    "name": "lamborghini",
    "num_models": 2,
  },
  {
    "avg_horsepower": 290.32,
    "avg_price": 52488.2,
    "id": 32,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Lexus-logo-1.jpg",
    "max_car_id": 222,
    "name": "lexus",
    "num_models": 25,
  },
  {
    "avg_horsepower": 237,
    "avg_price": 59900,
    "id": 33,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Alfa-Romeo-logo-1.jpg",
    "max_car_id": 6,
    "name": "alfa-romeo",
    "num_models": 2,
  },
  {
    "avg_horsepower": 154.33333333333334,
    "avg_price": 27158.333333333332,
    "id": 34,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Mini-logo-1.jpg",
    "max_car_id": 242,
    "name": "mini",
    "num_models": 6,
  },
  {
    "avg_horsepower": 216.11111111111111,
    "avg_price": 28725.555555555555,
    "id": 35,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Kia-logo-1.jpg",
    "max_car_id": 191,
    "name": "kia",
    "num_models": 9,
  },
  {
    "avg_horsepower": 633,
    "avg_price": 276428,
    "id": 36,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Ferrari-logo-1.jpg",
    "max_car_id": 118,
    "name": "ferrari",
    "num_models": 4,
  },
  {
    "avg_horsepower": 163.5,
    "avg_price": 22278.333333333332,
    "id": 37,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Mazda-logo-1.jpg",
    "max_car_id": 251,
    "name": "mazda",
    "num_models": 6,
  },
  {
    "avg_horsepower": 251.21052631578948,
    "avg_price": 36314.73684210526,
    "id": 38,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Nissan-logo-1.jpg",
    "max_car_id": 283,
    "name": "nissan",
    "num_models": 19,
  },
  {
    "avg_horsepower": 236.33333333333334,
    "avg_price": 31050,
    "id": 39,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Buick-logo-1.jpg",
    "max_car_id": 68,
    "name": "buick",
    "num_models": 3,
  },
  {
    "avg_horsepower": 327.5,
    "avg_price": 63783.333333333336,
    "id": 40,
    "img_url": "http://www.carlogos.org/uploads/car-logos/Jaguar-logo-1.jpg",
    "max_car_id": 183,
    "name": "jaguar",
    "num_models": 6,
  },
]
export default function TabOneScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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
      <View style={styles.categoriesContainer}>
        {data.map((data, index)=> {
          return (
            <TouchableOpacity 
              key={index} 
              onPress={()=> navigation.navigate('Listings', {data})}  
              style={styles.categoryBox}
            >
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
    backgroundColor: '#fff'
  },
  categoriesContainer: {
    flex: 1,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  categoryBox: { 
    width: '45%', 
    margin: 5, 
    padding: 5, 
    backgroundColor: 'tomato', 
    borderRadius: 5,  
    height: 100
  },
  categoryTitle: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16
  }
});
