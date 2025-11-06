import { useGlobalStyles } from '@/styles/globalStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const styles = useGlobalStyles();

  return (
    <Tabs screenOptions={
      { tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray', 
        tabBarStyle: styles.tabBar 
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerStyle: styles.tabBar,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="devices"
        options={{
          title: 'Devices',
          headerStyle: styles.tabBar,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="sitemap" color={color} />,
        }}

      />
    </Tabs>
  );
}
