import React, { useState, useEffect } from "react";
import { Alert, SafeAreaView } from "react-native";
import {
  ScrollView,
  YStack,
  XStack,
  Text,
  styled,
  Button,
  Select,
  Sheet,
  Adapt,
} from "tamagui";
import { NewsCard } from "@/components/news/card";
import type { NewsItem } from "@/interfaces/news_item";
import { useRouter } from "expo-router";
import { getDocs, collection, db, Timestamp } from "@/firebase";
import {
  Check,
  PlusCircle,
  ChevronDown,
  Calendar,
} from "@tamagui/lucide-icons";
import {
  parseISO,
  parse,
  differenceInDays,
  isSameMonth,
  isSameYear,
} from "date-fns";

const AppContainer = styled(YStack, {
  flex: 1,
  backgroundColor: "$background",
});

const categories = ["Tümü", "Teknoloji", "Ekonomi", "Spor", "Sağlık", "Kültür"];
const dateFilters = ["Tümü", "Son 7 gün", "Bu Ay", "Bu Yıl"];

export default function NewsPage() {
  const router = useRouter();
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedDateFilter, setSelectedDateFilter] = useState("Tümü");

  const getNewsData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "news"));
      const fetchedNews: NewsItem[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedNews.push({
          id: doc.id,
          ...data,
          date: data.date instanceof Timestamp ? data.date : data.date
        } as NewsItem);
      });
      setNewsData(fetchedNews);
      setFilteredNews(fetchedNews);
    } catch (error) {
      Alert.alert("Hata", "Haberler alınırken bir hata oluştu");
    }
  };

  useEffect(() => {
    getNewsData();
  }, []);

  useEffect(() => {
    filterNews();
  }, [selectedCategory, selectedDateFilter]);

  const parseCustomDate = (dateInput: string | Timestamp) => {
    if (dateInput instanceof Timestamp) {
      return dateInput.toDate();
    }
  
    if (typeof dateInput !== "string") {
      console.error("Expected a string or Timestamp for dateInput, but got:", typeof dateInput);
      return new Date();
    }
  
    const match = dateInput.match(/(\w+) (\d+), (\d+) at (\d+):(\d+):(\d+) (AM|PM) UTC([+-]\d+)/);
    if (!match) return new Date();
  
    const [, month, day, year, hours, minutes, seconds, period, offset] = match;
  
    const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth();
  
    let hour24 = parseInt(hours);
    if (period === "PM" && hour24 < 12) hour24 += 12;
    if (period === "AM" && hour24 === 12) hour24 = 0;
  
    return new Date(year, monthIndex, parseInt(day), hour24, parseInt(minutes), parseInt(seconds));
  };

  const filterNews = () => {
    let filtered = newsData;

    if (selectedCategory !== "Tümü") {
      filtered = filtered.filter((news) => news.category === selectedCategory);
    }

    if (selectedDateFilter !== "Tümü") {
      const now = new Date();
      switch (selectedDateFilter) {
        case "Son 7 gün":
          filtered = filtered.filter((news) => {
            const newsDate = parseCustomDate(news.date);
            return differenceInDays(now, newsDate) <= 7;
          });
          break;
        case "Bu Ay":
          filtered = filtered.filter((news) => {
            const newsDate = parseCustomDate(news.date);
            return isSameMonth(newsDate, now) && isSameYear(newsDate, now);
          });
          break;
        case "Bu Yıl":
          filtered = filtered.filter((news) => {
            const newsDate = parseCustomDate(news.date);
            return isSameYear(newsDate, now);
          });
          break;
      }
    }

    setFilteredNews(filtered);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <AppContainer>
      <XStack justifyContent="space-around" alignItems="center"  padding="$4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <Select.Trigger width={150} iconAfter={ChevronDown}>
            <Select.Value placeholder="Kategori" />
          </Select.Trigger>

          <Adapt when="sm" platform="touch">
            <Sheet modal dismissOnSnapToBottom>
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
              <Sheet.Overlay />
            </Sheet>
          </Adapt>

          <Select.Content>
            <Select.ScrollUpButton
              ai="center"
              jc="center"
              pos="relative"
              w="100%"
              h="$3"
            >
              <ChevronDown size={20} />
            </Select.ScrollUpButton>

            <Select.Viewport minWidth={200}>
              <Select.Group>
                {categories.map((category, index) => (
                  <Select.Item key={category} index={index} value={category}>
                    <Select.ItemText>{category}</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>

            <Select.ScrollDownButton
              ai="center"
              jc="center"
              pos="relative"
              w="100%"
              h="$3"
            >
              <ChevronDown size={20} />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select>

        <Select
          value={selectedDateFilter}
          onValueChange={setSelectedDateFilter}
        >
          <Select.Trigger width={150} iconAfter={Calendar}>
            <Select.Value placeholder="Tarih" />
          </Select.Trigger>

          <Adapt when="sm" platform="touch">
            <Sheet modal dismissOnSnapToBottom>
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
              <Sheet.Overlay />
            </Sheet>
          </Adapt>

          <Select.Content>
            <Select.ScrollUpButton
              ai="center"
              jc="center"
              pos="relative"
              w="100%"
              h="$3"
            >
              <ChevronDown size={20} />
            </Select.ScrollUpButton>

            <Select.Viewport minWidth={200}>
              <Select.Group>
                {dateFilters.map((filter, index) => (
                  <Select.Item key={filter} index={index} value={filter}>
                    <Select.ItemText>{filter}</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>

            <Select.ScrollDownButton
              ai="center"
              jc="center"
              pos="relative"
              w="100%"
              h="$3"
            >
              <ChevronDown size={20} />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select>

        <Button
          onPress={() => router.push("/screens/add-news" as any)}
          themeInverse
          iconAfter={PlusCircle}
          width={50}
        >
          {/* Haber Ekle */}
        </Button>
      </XStack>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <YStack space="$4">
          {filteredNews.length < 1 ? (
            <Text color="$color" fontSize="$4" textAlign="center">
              Hiç Haber Bulunamadı !
            </Text>
          ) : (
            filteredNews.map((news, index) => (
              <NewsCard key={news.id} {...news} />
            ))
          )}
        </YStack>
      </ScrollView>
    </AppContainer>
    </SafeAreaView>
  );
}
