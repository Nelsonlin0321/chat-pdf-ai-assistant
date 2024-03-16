import { cloudRunApiClient, lambdaApiClient } from "./api-clients";

export const getCloudRunHealthStatus = async () => {
  try {
    const response = await cloudRunApiClient.get("/health_check");
    console.log({ API: "Cloud Run", ...response.data });
  } catch (error) {
    console.error("Cloud Run Error fetching health status:", error);
  }
};

export const getLambdaHealthStatus = async () => {
  try {
    const response = await lambdaApiClient.get("/health_check");
    console.log({ API: "Lambda", ...response.data });
  } catch (error) {
    console.error("Lambda Error fetching health status:", error);
  }
};
