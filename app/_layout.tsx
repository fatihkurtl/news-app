import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView } from 'react-native';
import { useColorScheme } from "@/hooks/useColorScheme";
import { createTamagui, TamaguiProvider, Theme, styled } from "tamagui";
import { config } from "@tamagui/config/v3";
import {
  ScrollView,
  XStack,
  YStack,
  Card,
  H3,
  Image,
  Button,
  Text,
} from "tamagui";
import { NewsCard } from "@/components/news/news_card";
import type { NewsItem } from "@/interfaces/news_item";

SplashScreen.preventAutoHideAsync();

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Yeni Teknoloji Gelişmeleri",
    category: "Teknoloji",
    image: "https://picsum.photos/200/100",
    date: "2023-05-15",
    description: "Teknoloji dünyasındaki son gelişmeler ve yenilikler.",
  },
  {
    id: 2,
    title: "Ekonomi Haberleri",
    category: "Ekonomi",
    image: "https://picsum.photos/200/100",
    date: "2023-05-14",
    description: "Güncel ekonomi haberleri ve piyasa analizleri.",
  },
  {
    id: 3,
    title: "Spor Dünyası",
    category: "Spor",
    image: "https://picsum.photos/200/100",
    date: "2023-05-13",
    description: "Spor dünyasından son dakika haberleri ve maç sonuçları.",
  },
];


const AppContainer = styled(YStack, {
  flex: 1,
  backgroundColor: "$background",
});

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
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppContainer>
            <Text fontSize="$6" fontWeight="bold" color="$color" textAlign="center" padding="$4">
              Haberler
            </Text>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              <YStack space="$4">
                {newsData.map((news) => (
                  <NewsCard key={news.id} {...news} />
                ))}
              </YStack>
            </ScrollView>
          </AppContainer>
        </SafeAreaView>
      </Theme>
    </TamaguiProvider>
  );
}
