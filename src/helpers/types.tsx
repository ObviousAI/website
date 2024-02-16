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

export interface searchRequestPayload {
  requestType: "POST" | "GET";
  imageName: stringOrNull;
  component: stringOrNull;
  searchQuery: stringOrNull;
  encodedImage: stringOrNull;
}

export interface routeInput {
  pathname: string;
  query: {
    q: stringOrNull;
    imageSearch: boolean;
    imageName: stringOrNull;
    component: stringOrNull;
  };
}
