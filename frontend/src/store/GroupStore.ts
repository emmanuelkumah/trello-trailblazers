import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

type GroupParticipants = {
  userId: string;
  userName: string;
};

type Group = {
  id: string;
  name: string;
  desc: string;
  image: string;
  slug: string;
  code: string;
  createdAt: string;
  groupMembers: GroupParticipants[] | null;
};

type DivvyGroupStore = {
  data: Group[];
  createGroup: (name: string, desc: string, image: string) => void;
  getGroupById: (id: string) => Group | undefined;
  getGroupBySlug: (slug: string) => Group | undefined;
  removeGroup: (id: string) => void;
  clearGroups: () => void;
};

const generateGroupCode = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumerics with dashes
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing dashes

// Helper function to compress large Base64 images
const compressImage = async (base64String: string): Promise<string> => {
  // Check if it's already a small image (less than ~500KB)
  if (base64String.length < 700000) {
    return base64String;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");

      // Calculate new dimensions (reducing to max 800px width or height while maintaining aspect ratio)
      let width = img.width;
      let height = img.height;
      const maxDimension = 800;

      if (width > height && width > maxDimension) {
        height = (height * maxDimension) / width;
        width = maxDimension;
      } else if (height > maxDimension) {
        width = (width * maxDimension) / height;
        height = maxDimension;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);

      // Compress with reduced quality
      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
      resolve(compressedBase64);
    };

    img.src = base64String;
  });
};

export const useDivvyGroupStore = create<DivvyGroupStore>()(
  persist(
    (set, get) => ({
      data: [],
      createGroup: async (name, desc, image) => {
        const id = uuidv4();
        const slug = slugify(name);
        const code = generateGroupCode();

        // Compress image if it's a base64 string
        const compressedImage = image.startsWith("data:image")
          ? await compressImage(image)
          : image;

        const newGroup: Group = {
          id,
          name,
          desc,
          image: compressedImage,
          slug,
          code,
          createdAt: new Date().toISOString(),
          groupMembers: null,
        };

        set((state) => ({ data: [newGroup, ...state.data] }));
      },
      getGroupById: (id) => get().data.find((group) => group.id === id),
      getGroupBySlug: (slug) => get().data.find((group) => group.slug === slug),
      removeGroup: (id) =>
        set((state) => ({ data: state.data.filter((g) => g.id !== id) })),
      clearGroups: () => set({ data: [] }),
    }),
    {
      name: "divvy-group-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        data: state.data,
      }),
    }
  )
);
