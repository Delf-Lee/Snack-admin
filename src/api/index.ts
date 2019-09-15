import axios from "axios";
import { OutputData } from "@editorjs/editorjs";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api"
});

interface IFetchNewsListParams {
  startDateTime: string;
  endDateTime: string;
}
export async function fetchNewsList (params: IFetchNewsListParams): Promise<INews[]> {
  const { data } = await axiosInstance.get<INews[]>("/news", { params });

  return data;
}

interface ICreateNewsParams {
  title: string;
  date: string;
  topicLink: string;
  topic: string;
  category: string;
  contents: OutputData["blocks"];
  link: string;
  reservedDate: string;
}

export async function createNews (params: ICreateNewsParams) {
  const { data } = await axiosInstance.post("/news", params);

  return data;
}
