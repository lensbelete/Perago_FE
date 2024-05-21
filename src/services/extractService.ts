import APIClient from "./apiClient";
import { io } from "socket.io-client";

const apiClient = new APIClient("");
const socketURL = "http://localhost:3000";

interface responseInterface {
  jobId: string;
  message: string;
}

export async function addGenerateJob(projectId: string) {
  apiClient.endPoint = `extractor/${projectId}/extract`;

  return await apiClient.get<responseInterface>();
}

export async function openWebSocket(
  jobId: string,
  callBack: (jobId: string) => void
) {
  const socket = io(socketURL, { transports: ["websocket"] });

  // Connection opened
  socket.on("connect", () => {
    console.log("connected to server");
  });

  // Listen for messages
  const result = socket.on(jobId, (event) => {
    callBack(jobId);
    console.log("Message from server ", event);
  });
}

export async function downloadProject(projectId: string) {
  const url = `http://localhost:3000/api/v1/extractor/${projectId}/obtain`;

  try {
    // Fetch the file from the server
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blob = await response.blob();

    // Create a handle for a file to save the content
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: "downloaded_file.zip",
      types: [
        {
          description: "ZIP Files",
          accept: { "application/zip": [".zip"] },
        },
      ],
    });

    // Create a writable stream and write the blob to it
    const writableStream = await fileHandle.createWritable();
    await writableStream.write(blob);
    await writableStream.close();

    console.log("File saved successfully");
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation or file save:",
      error
    );
  }
}
