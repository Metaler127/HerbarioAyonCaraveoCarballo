import { create } from "zustand";
export const useModalStore = create((set) => ({
  showAgregarPlanta: false,
  showAgregarObservacion: false,
  setShowAgregarPlanta: (showAgregarPlanta) => set({ showAgregarPlanta }),
  setShowAgregarObservacion: (showAgregarObservacion) =>
    set({ showAgregarObservacion }),
}));
