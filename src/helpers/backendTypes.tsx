type stringOrNull = string | null;

export interface searchRequestPayload {
  requestType: "POST" | "GET";
  imageName: stringOrNull;
  component: stringOrNull;
  searchQuery: stringOrNull;
  encodedImage: stringOrNull;
  vendor: stringOrNull;
}

export interface routeInput {
  pathname: string;
  query: {
    q: stringOrNull;
    imageSearch: boolean;
    imageName: stringOrNull;
    component: stringOrNull;
    vendor: stringOrNull;
  };
}

export interface configJson {
  s3_bucket_prefix: string;
  api: {
    current_version: string;
    api_endpoints: {
      v1: string;
      v2: string;
      debugEndpoint: string;
    };
  };
  aws: {
    region: string;
    bucket: string;
  };
}
