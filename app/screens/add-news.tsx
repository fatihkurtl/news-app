import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { 
  Form, 
  YStack, 
  XStack,
  Input, 
  Button, 
  Text, 
  TextArea,
  Select,
  styled
} from "tamagui";
import { useRouter } from 'expo-router';

const categories = ['Teknoloji', 'Ekonomi', 'Spor', 'Sağlık', 'Kültür'];

const AppContainer = styled(YStack, {
  flex: 1,
  backgroundColor: "$background",
  padding: "$4",
});

export default function AddNewsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [imageUrl, setImageUrl] = useState('');

  const router = useRouter();

  const handleSubmit = () => {
    // Burada form verilerini işleyebilir ve API'ye gönderebilirsiniz
    console.log({ title, description, category, date, imageUrl });
    // İşlem tamamlandıktan sonra haber listesi sayfasına dönebilirsiniz
    router.push('/screens/news');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppContainer>
        <Text fontSize="$6" fontWeight="bold" marginBottom="$4">Haber Ekle</Text>
        <Form onSubmit={handleSubmit}>
          <YStack space="$4">
            <Input
              placeholder="Başlık"
              value={title}
              onChangeText={setTitle}
            />
            <TextArea
              placeholder="Açıklama"
              value={description}
              onChangeText={setDescription}
              numberOfLines={4}
            />
            <Select value={category} onValueChange={setCategory}>
              <Select.Trigger>
                <Select.Value placeholder="Kategori Seçin" />
              </Select.Trigger>
              <Select.Content>
                {categories.map((category, index) => (
                  <Select.Item key={category} value={category} index={index}>
                    <Select.ItemText>{category}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
            <XStack alignItems="center">
              <Text marginRight="$2">Tarih:</Text>
              <Input
                placeholder="Tarih (YYYY-MM-DD)"
                value={date.toISOString().split('T')[0]}
                onChangeText={(text) => setDate(new Date(text))}
              />
            </XStack>
            <Input
              placeholder="Görsel URL"
              value={imageUrl}
              onChangeText={setImageUrl}
            />
            <Button onPress={handleSubmit} themeInverse>Haber Ekle</Button>
          </YStack>
        </Form>
      </AppContainer>
    </SafeAreaView>
  );
}