import { Timestamp } from "@/firebase";

export interface NewsItem {
    id: number | string;
    title: string;
    category: string;
    imageUrl: string;
    date: string | Timestamp;
    description: string;
  }