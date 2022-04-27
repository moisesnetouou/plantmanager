import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';


import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSelect } from '../pages/PlantSelect';

const stackRoutes = createStackNavigator();

import colors from '../styles/colors';
import { PlantSave } from '../pages/PlantSave';
import { MyPlants } from '../pages/MyPlants';

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  >
    <stackRoutes.Screen 
      name="Welcome"
      component={Welcome}
    />

    <stackRoutes.Screen 
      name="UserIdentification"
      component={UserIdentification}
    />

    <stackRoutes.Screen 
      name="Confirmation"
      component={Confirmation}
    />

    <stackRoutes.Screen 
      name="PlantSelect"
      component={PlantSelect}
    />

    <stackRoutes.Screen 
      name="PlantSave"
      component={PlantSave}
    />

    <stackRoutes.Screen 
      name="MyPlants"
      component={MyPlants}
    />
  </stackRoutes.Navigator>
)

export default AppRoutes;