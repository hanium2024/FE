import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';

import Camera from './src/pages/Camera';
import MyInfo from './src/pages/MyInfo';
import Home from './src/pages/Home';
import CameraGuide from './src/pages/AddDogProfilePages/CameraGuide';
import DogInfo from './src/pages/AddDogProfilePages/DogInfo';
import DogProfileResult from './src/pages/AddDogProfilePages/DogProfileResult';
import colorType from './src/styles/color';

import HomeIcon from './src/components/Icons/HomeIcon';
import HealthIcon from './src/components/Icons/HealthIcon';
import MissFoundIcon from './src/components/Icons/MissFoundIcon';
import ProfileIcon from './src/components/Icons/ProfileIcon';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabBarIcon = ({color}: {color: string}) => (
  <HomeIcon width={25} height={25} fill={color} />
);

const HealthTabBarIcon = ({color}: {color: string}) => (
  <HealthIcon width={25} height={25} fill={color} />
);

const MissFoundTabBarIcon = ({color}: {color: string}) => (
  <MissFoundIcon width={25} height={25} fill={color} stroke={color} />
);

const ProfileTabBarIcon = ({color}: {color: string}) => (
  <ProfileIcon width={25} height={25} fill={color} />
);

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CameraGuide"
        component={CameraGuide}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DogInfo"
        component={DogInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DogProfileResult"
        component={DogProfileResult}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

function AppInner() {
  const tabBarActiveTintColor = colorType.blue[600];
  const tabBarInactiveTintColor = colorType.gray[300];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: tabBarActiveTintColor,
        tabBarInactiveTintColor: tabBarInactiveTintColor,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: '홈',
          tabBarIcon: HomeTabBarIcon,
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Health"
        component={Camera}
        options={{
          title: '건강 일지',
          tabBarIcon: HealthTabBarIcon,
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          title: '실종/발견 신고',
          tabBarIcon: MissFoundTabBarIcon,
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyInfo"
        component={MyInfo}
        options={{
          title: '내 정보',
          tabBarIcon: ProfileTabBarIcon,
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
  },
  tabBarLabel: {
    marginBottom: 6,
  },
});

export default AppInner;
