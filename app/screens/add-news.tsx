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
  styled,
  Adapt,
  Sheet
} from "tamagui";
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

const categories = ['Teknoloji', 'Ekonomi', 'Spor', 'Sağlık', 'Kültür', 'Gündem'];

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
    console.log({ title, description, category, date, imageUrl });
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

              <Select.Content zIndex={200000}>
                <Select.ScrollUpButton alignItems="center" justifyContent="center" position="relative" width="100%" height="$3">
                  <ChevronUp size="$1" />
                </Select.ScrollUpButton>

                <Select.Viewport minWidth={200}>
                  <Select.Group>
                    <Select.Label>Kategoriler</Select.Label>
                    {categories.map((cat, index) => (
                      <Select.Item key={cat} index={index} value={cat}>
                        <Select.ItemText>{cat}</Select.ItemText>
                        <Select.ItemIndicator marginLeft="auto">
                          <Text>✓</Text>
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Viewport>

                <Select.ScrollDownButton alignItems="center" justifyContent="center" position="relative" width="100%" height="$3">
                  <ChevronDown size="$1" />
                </Select.ScrollDownButton>
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