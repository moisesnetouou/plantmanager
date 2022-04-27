import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { EnvironmentButton } from '../components/EnvironmentButton';


import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import api from '../services/api';
import { Load } from '../components/Load';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import { PlantProps } from '../libs/storage';

interface EnvironmentProps {
  key: string;
  title: string;
}

export function PlantSelect(){
  const [environments, setEnvironments] = useState<EnvironmentProps[]>();
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]); // estado auxiliar
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(true);

  const navigation = useNavigation();

  async function fetchEnvironment(){
    const {data} = await api
    .get('plants_environments?_sort=title&_order=asc');  //ordenados

    setEnvironments([
      {
        key: 'all',
        title: 'Todos'
      },
      ...data
    ]);
  }

  async function fetchPlants(){
    const {data} = await api
    .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`); // ordenar

    if(!data)
      return setLoading(true);
    

    if(page > 1){
      setPlants(oldValue => [...oldValue, ...data]); // juntando os dados de antes com os de depois
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleEnvironmentSelected(environment: string){
    setEnvironmentSelected(environment);

    if(environment === 'all'){
      return setFilteredPlants(plants);
    }
    
    const filtered = plants.filter(plant => 
      plant.environments.includes(environment)
    )

    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance: number){
    if(distance < 1)
      return;

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelect(plant: PlantProps){
    //@ts-ignore
    navigation.navigate('PlantSave', {plant}); // passando os dados
  }

  useEffect(() => { 
    fetchEnvironment();
  }, [])

  useEffect(() => { 
    fetchPlants();
  }, [])

  if(loading){
    return <Load />
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Em qual ambiente
        </Text>

        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList 
          data={environments}
          keyExtractor={(item) => String(item.key)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}    
          renderItem={({item})=> (
            <EnvironmentButton 
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
        />
      </View>

      <View style={styles.plants}>
          <FlatList 
            data={filteredPlants}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({item}) => (
              <PlantCardPrimary 
                data={item}
                onPress={()=> handlePlantSelect(item)}
              />
            )}
            ListFooterComponent={
              loadingMore 
              ?<ActivityIndicator color={colors.green} />
              : <></>
            }
            onEndReachedThreshold={0.1}
            onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)
          }
          />
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingHorizontal: 32,
    marginVertical: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },
});