type stringOrNull = string | null;

export interface Item {
  color: string;
  description: string;
  details: string;
  gender: string;
  id: string;
  image_base64: stringOrNull;
  main_image_url: string;
  name: string;
  other_image_urls: string[];
  product_url: string;
  size: string;
  url: string;
  vendor: string;
}

export interface searchBoxInput {
  onSeach: (input: string) => void;
  onAttachment: (input: string) => void;
  onSubmit: (input: string) => void;
}

export interface modalInput {
  upload: boolean;
  choices: string[];
  imageSrc: stringOrNull;
  selectedChoice: stringOrNull;
  handleSubmitButton: () => void;
  getImageComponents: () => void;
  setUpload: (input: boolean) => void;
  setImageSrc: (input: string | null) => void;
  setChoices: (input: string[]) => void;
  setSelectedChoice: (input: string | null) => void;
}
