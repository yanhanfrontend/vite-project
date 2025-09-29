import axios from "axios";

let instance = axios.create({
  timeout: 20000,
})

export let $get = async (url: string, params: object): Promise<any[]> => {
  let {data} = await instance.get(url, {params})
  return data;
};

export let $post = async (url: string, params: object): Promise<any[]> => {
  let {data} = await instance.post(url, params)
  return data;
};