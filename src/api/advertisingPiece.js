import axios from "./axios";

export const getAPsRequest = async () =>
  axios.get("/auth/users/advertising-pieces");

export const createAPRequest = async (advertisiment) =>
  axios.post("/auth/users/advertising-pieces", advertisiment);

export const updateAPRequest = async (id, advertisiment) =>
  axios.put(`/auth/users/advertising-pieces/${id}`, advertisiment);

export const deleteAPRequest = async (id) =>
  axios.delete(`/auth/users/advertising-pieces/${id}`);

export const getAPRequest = async (id) =>
  axios.get(`/auth/users/advertising-pieces/${id}`);
