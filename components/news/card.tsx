import type { NewsItem } from "@/interfaces/news_item";
import { XStack, YStack, Card, H3, Image, Button, Text, styled } from "tamagui";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { Timestamp } from "@/firebase";

export const NewsCard: React.FC<NewsItem> = ({
  title,
  category,
  imageUrl,
  description,
  date,
}: NewsItem) => {
  const formatDate = (dateInput: string | Timestamp) => {
    let dateObject: Date;
    if (dateInput instanceof Timestamp) {
      dateObject = dateInput.toDate();
    } else if (typeof dateInput === 'string') {
      dateObject = new Date(dateInput);
    } else {
      console.error('Invalid date input:', dateInput);
      return '';
    }
    return format(dateObject, 'dd.MM.yyyy HH:mm');
  };

  const formattedDate = formatDate(date);
  const router = useRouter();

  return (
    <StyledCard elevate backgroundColor={"$background"}>
      <Image
        source={{ uri: imageUrl }}
        width="100%"
        height={150}
        resizeMode="cover"
      />
      <Card.Header padded>
        <YStack space="$2">
          <XStack justifyContent="space-between" alignItems="center">
            <Text color="$color" fontSize="$2" opacity={0.7}>
              {category}
            </Text>
            <Text color="$color" fontSize="$2" opacity={0.7}>
              {formattedDate}
            </Text>
          </XStack>
          <H3 color="$color" numberOfLines={2}>
            {title}
          </H3>
        </YStack>
      </Card.Header>
      <Card.Footer padded>
        <Button
          onPress={() =>
            router.push({
              pathname: `/screens/news-detail` as any,
              params: { title, category, imageUrl, description, formattedDate },
            })
          }
          size="$2"
          themeInverse
          fontWeight="bold"
          alignSelf="flex-start"
        >
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
