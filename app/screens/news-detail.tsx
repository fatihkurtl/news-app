import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { ScrollView, YStack, XStack, H1, H2, Paragraph, Image, Text, Separator } from "tamagui";

export default function DetailScreen() {
  const params: any = useRoute().params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView flex={1} contentContainerStyle={{ paddingBottom: 20 }}>
        <YStack space="$4" padding="$4">
          <H1 color="$color" fontSize="$8">{params.title}</H1>
          
          <XStack justifyContent="space-between" alignItems="center">
            <Text color="$color" fontSize="$3" opacity={0.7}>{params.category}</Text>
            <Text color="$color" fontSize="$3" opacity={0.7}>{params.formattedDate}</Text>
          </XStack>
          
          <Image 
            source={{ uri: params.imageUrl }} 
            width="100%" 
            height={250} 
            resizeMode="cover"
          />
          
          <Separator />
          
          <YStack space="$3">
            <H2 color="$color" fontSize="$6">Haber Detayı</H2>
            <Paragraph color="$color" fontSize="$4" lineHeight="$6">
              {params.description}
            </Paragraph>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}