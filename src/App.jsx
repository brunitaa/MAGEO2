import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./routes";
import { EventProvider } from "./context/EventsContext";
import { HomePage2 } from "./pages/aaa";
import EventForm from "./pages/Events";
import AdvertisingPiece from "./pages/AdvertisingPiece";
import { AdvertisingProvider } from "./context/AdvertisementContext";
import { AdminHomePage } from "./pages/admin/Admin";
import Form2 from "./pages/Form2";
import EventFormAdmin from "./pages/admin/Events";
import { SpectatorProvider } from "./context/SpectatorContext";
import { SpectatorsPage } from "./pages/admin/Spectators";
import ProtocoloLogistica from "./pages/Form2";
import AdvertisingPieceAdmin from "./pages/admin/AdvertisingPiece";
import Protocol from "./pages/Protocol";
import { ProtocolProvider } from "./context/ProtocolContext";
import ProtocolAdmin from "./pages/admin/Protocol";
import { LogisticProvider } from "./context/LogisticContext";
import Logistic from "./pages/Logistic";
import LogisticAdmin from "./pages/admin/Logistic";

function App() {
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  return (
    <AuthProvider>
      <LogisticProvider>
        <ProtocolProvider>
          <AdvertisingProvider>
            <SpectatorProvider>
              <EventProvider>
                <BrowserRouter>
                  <div className="flex flex-col min-h-screen">
                    <Navbar></Navbar>
                    <main className="flex-grow min-h-screen">
                      <div className="mx-auto px-10 md:px-0 min--screen">
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/loginPage" element={<LoginPage />} />
                          <Route element={<ProtectedRoute />}>
                            <Route path="/homepage" element={<HomePage2 />} />
                            <Route path="/events" element={<EventForm />} />
                            <Route path="/admin" element={<AdminHomePage />} />
                            <Route
                              path="/user/event/:id"
                              element={<EventForm />}
                            />
                            <Route
                              path="/advertisingPiece"
                              element={<AdvertisingPiece />}
                            />
                            <Route
                              path="/spectators"
                              element={<SpectatorsPage />}
                            />
                            <Route
                              path="/spectators/:id"
                              element={<SpectatorsPage />}
                            />
                            <Route
                              path="/user/protocol"
                              element={<Protocol />}
                            />
                            <Route
                              path="/user/advertisement/:id"
                              element={<AdvertisingPiece />}
                            />
                            <Route
                              path="/admin/event"
                              element={<EventFormAdmin />}
                            />
                            <Route
                              path="/admin/event/:id"
                              element={<EventFormAdmin />}
                            />
                            <Route
                              path="/admin/advertisement/:id"
                              element={<AdvertisingPieceAdmin />}
                            />
                            <Route
                              path="/admin/protocol/:id"
                              element={<ProtocolAdmin />}
                            />
                            <Route
                              path="/user/protocol/:id"
                              element={<Protocol />}
                            />

                            <Route
                              path="/admin/logistic/:id"
                              element={<LogisticAdmin />}
                            />
                            <Route
                              path="/user/logistic"
                              element={<Logistic />}
                            />
                            <Route
                              path="/user/logistic/:id"
                              element={<Logistic />}
                            />
                            <Route path="/test" element={<Form2 />} />
                          </Route>
                        </Routes>
                      </div>
                    </main>
                  </div>
                </BrowserRouter>
              </EventProvider>
            </SpectatorProvider>
          </AdvertisingProvider>
        </ProtocolProvider>
      </LogisticProvider>
    </AuthProvider>
  );
}

export default App;
