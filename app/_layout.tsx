import { CVProvider } from '@/context/CVContext';
import { Stack } from 'expo-router';


export default function RootLayout() {
  return (
    <CVProvider>
      <Stack
        screenOptions={{
          headerStyle:{
            backgroundColor: "#C8102E",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle:{
            fontWeight: "700",
            fontSize: 18,
            color: "#FFFFFF",
          },
        }}
      >
        <Stack.Screen 
        name="index"
        options={{
          title: "Crear CV",
          headerShown: true,
        }} 
        />
        <Stack.Screen
        name= "personal-info"
        options={{
          title: "Información Personal",
        }}
        />
        <Stack.Screen
        name= "experience"
        options={{
          title: "Experiencia Laboral",
        }}
        />
        <Stack.Screen
        name= "education"
        options={{
          title: "Educación",
        }}
        />
        <Stack.Screen
        name= "preview"
        options={{
          title: "Vista Previa",
        }}
        />  

      </Stack>
    </CVProvider>
  );
};