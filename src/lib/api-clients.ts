import axios from "axios";

export const cloudRunApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLOUDRUN_BACKEND_URL,
});

export const lambdaApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LAMBDA_BACKEND_URL,
});
