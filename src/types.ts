export type ListElement = { title: string; description: string };

export type ColorOption = {
  hexCode: string;
  imageUrl: string;
  name: string;
};

export type StorageOption = {
  capacity: string;
  price: number;
};

export type Specs = {
  battery: string;
  mainCamera: string;
  os: string;
  processor: string;
  resolution: string;
  screen: string;
  screenRefreshRate: string;
  selfieCamera: string;
};

type SimilarProduct = {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
};

export type PhoneDetails = {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  imageUrl: string;
  colorOptions: ColorOption[];
  similarProducts: SimilarProduct[];
  specs: Specs;
  storageOptions: StorageOption[];
};

export type Phone = {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
};

export type SelectedPhone = {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
  selectedStorage: StorageOption;
  selectedColor: ColorOption;
};
