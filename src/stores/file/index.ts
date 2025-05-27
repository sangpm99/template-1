import { axiosDefault } from "@/plugins/axios";

export const useFileStore = defineStore("fileStore", () => {
  const loading: Ref<boolean> = ref(false);

  const uploadFile = async (file: File): Promise<string> => {
    try {
      loading.value = true;
      const formData = new FormData();
      formData.append("file", file, file.name);
      const { data } = await axiosDefault.post<string>(
        `/File/UploadFile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const deleteFile = async (url: string): Promise<void> => {
    try {
      loading.value = true;
      await axiosDefault.delete(`/File/DeleteFile`, { params: { url } });
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  return { loading, uploadFile, deleteFile };
});
