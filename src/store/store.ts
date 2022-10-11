import create from "zustand";

interface UseStore {
  tick: number;
  inc: () => void;
  reset: () => void;
}

const useStore = create<UseStore>((set) => ({
  tick: 1,
  inc: () => set((state) => ({ tick: state.tick + 1 })),
  reset: () => set(() => ({ tick: 0 })),
}));

export default useStore;
