import { createContext, useContext, useState } from "react";
import {
  createAPRequest,
  deleteAPRequest,
  getAPRequest,
  getAPsRequest,
  updateAPRequest,
} from "../api/advertisingPiece";

const AdvertisingContext = createContext();

export const useAdvertisingRequest = () => {
  const context = useContext(AdvertisingContext);
  if (!context) throw new Error("useEvents must be used within a TaskProvider");
  return context;
};

export function AdvertisingProvider({ children }) {
  const [advertisements, setAdvertisings] = useState([]);

  const getAdvertisements = async () => {
    try {
      // Fetch tasks from the API
      const res = await getAPsRequest();

      const fetchedEvents = res.data.data;
      console.log(res.data.data);

      setAdvertisings(fetchedEvents);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  const deleteAdvertisement = async (id) => {
    try {
      const res = await deleteAPRequest(id);
      if (res.status === 204)
        setAdvertisings(
          advertisings.filter((event) => advertisement._id !== id)
        );
    } catch (error) {
      console.log(error);
    }
  };

  const createAdvertisement = async (advertisement) => {
    try {
      const res = await createAPRequest(advertisement);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAdvertisement = async (id) => {
    try {
      const res = await getAPRequest(id);
      console.log("hh");
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateAdevertisement = async (id, event) => {
    try {
      await updateAPRequest(id, event);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdvertisingContext.Provider
      value={{
        advertisements,
        getAdvertisements,
        deleteAdvertisement,
        createAdvertisement,
        getAdvertisement,
        updateAdevertisement,
      }}
    >
      {children}
    </AdvertisingContext.Provider>
  );
}
