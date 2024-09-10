import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createTamagui, TamaguiProvider, Theme } from "tamagui";
import { config } from "@tamagui/config/v3";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

SplashScreen.preventAutoHideAsync();

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig}>
        <Theme name={colorScheme === "dark" ? "dark" : "light"}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="screens/news"
              options={{ title: "Haberler" }}
            />
            <Stack.Screen
              name="screens/add-news"
              options={{ title: "Haber Ekle" }}
            />
          </Stack>
        </Theme>
      </TamaguiProvider>
    </SafeAreaView>
  );
}
