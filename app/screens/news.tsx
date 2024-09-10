import React, { useState, useEffect } from "react";
import { Alert, SafeAreaView } from "react-native";
import { ScrollView, YStack, Text, styled, Button } from "tamagui";
import { NewsCard } from "@/components/news/card";
import type { NewsItem } from "@/interfaces/news_item";
import { useRouter } from "expo-router";
import { getDocs, collection, db } from "@/firebase";

const AppContainer = styled(YStack, {
  flex: 1,
  backgroundColor: "$background",
});

export default function NewsPage() {
  const router = useRouter();

  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  const getNewsData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "news"));
      const fetchedNews: NewsItem[] = [];
      querySnapshot.forEach((doc) => {
        fetchedNews.push({ id: doc.id, ...doc.data() } as NewsItem);
      });
      setNewsData(fetchedNews);
    } catch (error) {
      Alert.alert("Hata", "Haberler alınırken bir hata oluştu");
    }
  };

  useEffect(() => {
    getNewsData();
  }, []);

  return (
      <AppContainer>
        {/* <Text
          fontSize="$6"
          fontWeight="bold"
          color="$color"
          textAlign="center"
          padding="$4"
        >
          Haberler
        </Text> */}
        <Button
          onPress={() => router.push("/screens/add-news" as any)}
          marginBottom="$4"
        >
          Haber Ekle
        </Button>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <YStack space="$4">
            {newsData.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </YStack>
        </ScrollView>
      </AppContainer>
  );
}
