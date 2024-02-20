// Function to get json response, and check for validity
import axios from "axios";

import { searchRequestPayload } from './types';

const postRequest = async (fullUrl: string, request: searchRequestPayload) => {
    // If it is a postRequest, we already have some information about the payload. It will be a component based one or a regular image search.
    const { imageName, component, searchQuery, encodedImage, vendor } = request;

    const body = {
        image: imageName,
        component: component,
        text: searchQuery,
        encodedImage: encodedImage,
        vendor: vendor,
    }
    const response = await axios.post(fullUrl, {
        method: "POST",
        json: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status === 200 || response.status === 201) {
        return response.data;
    }
    throw new Error("Error fetching the items");
}

const getRequest = async (fullUrl: string, request: searchRequestPayload) => {
    // If it is a getRequest, we already have some information about the payload. It will be a component based one or a regular image search.
    const { imageName, component, searchQuery, encodedImage, vendor } = request;

    const response = await axios.get(fullUrl, {
        params: {
            imageName: imageName,
            component: component,
            prompt: searchQuery,
            encodedImage: encodedImage,
            vendor: vendor,
        }
    });
    return response.data;
}


export const getJsonResponse = (endpointBaseUrl: string, endpointPath : string, request: searchRequestPayload) => {
    const fullUrl = `${endpointBaseUrl}${endpointPath}`;
    return postRequest(fullUrl, request);
}

    
