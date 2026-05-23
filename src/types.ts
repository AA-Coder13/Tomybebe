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
