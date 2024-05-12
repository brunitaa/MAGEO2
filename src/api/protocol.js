import axios from "./axios";

export const getProtocolsRequest = async () => axios.get("/protocols");

export const createProtocolRequest = async (protocol) =>
  axios.post("/protocols", protocol);

export const updateProtocolRequest = async (id, protocol) =>
  axios.put(`/protocols/${id}`, protocol);

export const deleteProtocolRequest = async (id) =>
  axios.delete(`/protocols/${id}`);

export const getProtocolRequest = async (id) => axios.get(`/protocols/${id}`);
