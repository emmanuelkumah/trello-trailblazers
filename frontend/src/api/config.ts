import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

export type ProgressCallback = (percentage: number) => void;

export interface UploadOptions {
  onProgress?: ProgressCallback;
  additionalData?: Record<string, string>;
  headers?: Record<string, string>;
  timeout?: number;
}

const baseUrl = import.meta.env.VITE_API_URL;

const cookies = new Cookies();

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  timeout: 30000,
});

// Helper to create a multipart axios instance
const createMultipartInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
    },
    timeout: 30000,
  });
};

// Upload a single file
export const uploadFile = async <T = any>(
  url: string,
  file: File | Blob,
  options?: UploadOptions
): Promise<AxiosResponse<T>> => {
  const multipartInstance = createMultipartInstance();
  const formData = new FormData();
  formData.append('file', file);

  if (options?.additionalData) {
    Object.entries(options.additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  const token = cookies.get("divvy_token");
  if (token) {
    multipartInstance.defaults.headers.Authorization = `Bearer ${token}`;
  }

  if (options?.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      multipartInstance.defaults.headers[key] = value;
    });
  }

  if (options?.timeout) {
    multipartInstance.defaults.timeout = options.timeout;
  }

  return multipartInstance.post<T>(url, formData, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total && options?.onProgress) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        options.onProgress(percentCompleted);
      }
    },
  });
};

// Upload multiple files
export const uploadMultipleFiles = async <T = any>(
  url: string,
  files: File[] | Blob[],
  fieldName: string = 'files',
  options?: UploadOptions
): Promise<AxiosResponse<T>> => {
  const multipartInstance = createMultipartInstance();
  const formData = new FormData();

  files.forEach((file, index) => {
    formData.append(`${fieldName}[${index}]`, file);
  });

  if (options?.additionalData) {
    Object.entries(options.additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  const token = cookies.get("divvy_token");
  if (token) {
    multipartInstance.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return multipartInstance.post<T>(url, formData, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total && options?.onProgress) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        options.onProgress(percentCompleted);
      }
    },
  });
};

// Attach token to requests automatically
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = cookies.get("divvy_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Global response handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response) {
      if (error.response.status === 401) {
        cookies.remove("divvy_token");
        window.location.href = "/auth"; // redirect to login
      } else if (error.response.status === 403) {
        console.error("Permission denied");
      }
    } else {
      console.error("No response received from server");
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
export default axiosInstance;
