import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const sendMessageToBot = async ({ prompt, aiModel }) => {
  const url = `${apiServerUrl}/api/messages/${aiModel}`;
  console.log("Calling API:", url);

  const config = {
    url,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: {
      prompt,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};
