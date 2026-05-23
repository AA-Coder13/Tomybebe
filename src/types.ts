export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  date: string;
  location: string;
  description: string;
  likes: number;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  iconName: string;
  color: string;
}

export interface GreetingCardData {
  id: string;
  title: string;
  frontText: string;
  backText: string;
  insideText: string;
  emoji: string;
  color: string; // Tailwind bg color class
  accentColor: string; // Tailwind text/border accent
}
