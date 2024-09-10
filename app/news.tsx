import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  ScrollView,
  YStack,
  Text,
  styled,
} from "tamagui";
import { NewsCard } from "../components/news/card";
import type { NewsItem } from "../interfaces/news_item";

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

export default function NewsPage() {
  return (
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
  );
}