import React, { useState } from "react";
import { SafeAreaView, Alert, ScrollView } from "react-native";
import {
  Form,
  YStack,
  XStack,
  Input,
  Button,
  Text,
  TextArea,
  Select,
  styled,
  Adapt,
  Sheet,
} from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";
import CategoryMenu from "../components/addnews/category-menu";
import { useRouter } from "expo-router";
import { addDoc, collection, db, Timestamp } from "@/firebase";

const categories = [
  "Teknoloji",
  "Ekonomi",
  "Spor",
  "Sağlık",
  "Kültür",
  "Gündem",
];

const AppContainer = styled(YStack, {
  flex: 1,
  backgroundColor: "$background",
  padding: "$4",
});

export default function AddNewsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      console.log({ title, description, category, date, imageUrl });
      if (!title || !description || !category || !date || !imageUrl) {
        return Alert.alert("Hata", "Tüm alanları doldurunuz.");
      }
      const docRef = await addDoc(collection(db, "news"), {
        title: title,
        description: description,
        category: category,
        date: Timestamp.fromDate(new Date(date)),
        imageUrl: imageUrl,
      });
      router.push("/screens/news");
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      Alert.alert("Hata", "Hata: " + error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <AppContainer>
        <Text fontSize="$6" fontWeight="bold" marginBottom="$4">
          Haber Ekle
        </Text>
        <Form onSubmit={handleSubmit}>
          <YStack space="$4">
            <Input placeholder="Başlık" value={title} onChangeText={setTitle} />
            <TextArea
              placeholder="Açıklama"
              value={description}
              onChangeText={setDescription}
              numberOfLines={4}
            />
            <Select value={category} onValueChange={setCategory}>
              <Select.Trigger width="100%" iconAfter={ChevronDown}>
                <Select.Value placeholder="Kategori Seçin" />
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

              <CategoryMenu categories={categories} />
            </Select>
            <XStack alignItems="center">
              <Text marginRight="$2">Tarih:</Text>
              <Input
                placeholder="Tarih (YYYY-MM-DD)"
                value={date.toISOString().split("T")[0]}
                onChangeText={(text) => setDate(new Date(text))}
              />
            </XStack>
            <Input
              placeholder="Görsel URL"
              value={imageUrl}
              onChangeText={setImageUrl}
            />
            <Button onPress={handleSubmit} themeInverse>
              Haber Ekle
            </Button>
          </YStack>
        </Form>
      </AppContainer>
      </ScrollView>
    </SafeAreaView>
  );
}
