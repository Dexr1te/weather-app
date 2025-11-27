import { create } from "zustand";
import { persist } from "zustand/middleware";

type SearchStore = {
  history: SearchHistoryItem[];
  addToHistory: (item: SearchHistoryItem) => void;
  clearHistory: () => void;
};
type FavoriteStore = {
  favoriteHistory: SearchHistoryItem[];
  addToFavorite: (item: SearchHistoryItem) => void;
  deleteFavorite: (name: string) => void;
  clearHistory: () => void;
};
type SearchHistoryItem = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      history: [],
      addToHistory: (query) => {
        const current = get().history;

        const updated = [
          query,
          ...current.filter((h) => h.name !== query.name),
        ].slice(0, 5);

        set({ history: updated });
      },
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "search-history",
    },
  ),
);

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favoriteHistory: [],
      addToFavorite: (query) => {
        const current = get().favoriteHistory;

        const updated = [
          query,
          ...current.filter((h) => h.name !== query.name),
        ].slice(0, 5);

        set({ favoriteHistory: updated });
      },
      deleteFavorite: (name) => {
        set({
          favoriteHistory: get().favoriteHistory.filter((h) => h.name !== name),
        });
      },
      clearHistory: () => set({ favoriteHistory: [] }),
    }),
    {
      name: "favorite-history",
    },
  ),
);
