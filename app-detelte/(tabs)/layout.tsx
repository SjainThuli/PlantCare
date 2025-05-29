// app/explore/layout.tsx
import { Stack } from "expo-router";

export default function ExploreLayout() {
  return (
    <Stack screenOptions={{headerShown: true, }}>
        <Stack.Screen name="DashboardScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
