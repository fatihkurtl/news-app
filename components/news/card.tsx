import type { NewsItem } from "@/interfaces/news_item";
import { XStack, YStack, Card, H3, Image, Button, Text, styled } from "tamagui";
import { format } from 'date-fns';

export const NewsCard: React.FC<NewsItem> = ({ title, category, imageUrl, date }: NewsItem) => {
  const formattedDate = format((date as any).toDate(), 'dd/MM/yyyy');

  return (
    <StyledCard elevate>
      <Image source={{ uri: imageUrl }} width="100%" height={150} resizeMode="cover" />
      <Card.Header padded>
        <YStack space="$2">
          <XStack justifyContent="space-between" alignItems="center">
            <Text color="$color" fontSize="$2" opacity={0.7}>{category}</Text>
            <Text color="$color" fontSize="$2" opacity={0.7}>{formattedDate}</Text>
          </XStack>
          <H3 color="$color" numberOfLines={2}>{title}</H3>
        </YStack>
      </Card.Header>
      <Card.Footer padded>
        <Button size="$2" themeInverse fontWeight="bold" alignSelf="flex-start">
          Devamını Oku
        </Button>
      </Card.Footer>
    </StyledCard>
  );
};

const StyledCard = styled(Card, {
  width: "100%",
  height: "auto",
  marginBottom: "$4",
  overflow: "hidden",
});
