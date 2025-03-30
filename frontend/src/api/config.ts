import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

// Types for progress tracking
export type ProgressCallback = (percentage: number) => void;

// Type for upload options
export interface UploadOptions {
  onProgress?: ProgressCallback;
  additionalData?: Record<string, string>;
  headers?: Record<string, string>;
  timeout?: number;
}

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Create cookies instance
const cookies = new Cookies();

// Create and configure the axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  timeout: 30000,
});

// Helper function for multipart requests
export const createMultipartInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
    },
    timeout: 30000,
  });
};

// Helper function to upload files with progress tracking
export const uploadFile = async <T = any>(
  url: string, 
  file: File | Blob, 
  options?: UploadOptions
): Promise<AxiosResponse<T>> => {
  const multipartInstance = createMultipartInstance();
  const formData = new FormData();
  
  // Add file to FormData
  formData.append('file', file);
  
  // Add any additional data
  if (options?.additionalData) {
    Object.entries(options.additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }
  
  // Add auth token
  const token = cookies.get("authToken");
  if (token) {
    multipartInstance.defaults.headers.Authorization = `Bearer ${token}`;
  }
  
  // Add custom headers if provided
  if (options?.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      multipartInstance.defaults.headers[key] = value;
    });
  }
  
  // Set custom timeout if provided
  if (options?.timeout) {
    multipartInstance.defaults.timeout = options.timeout;
  }
  
  return multipartInstance.post<T>(url, formData, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (options?.onProgress && typeof options.onProgress === "function") {
          options.onProgress(percentCompleted);
        }
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
  
  // Add files to FormData
  files.forEach((file, index) => {
    formData.append(`${fieldName}[${index}]`, file);
  });
  
  // Add any additional data
  if (options?.additionalData) {
    Object.entries(options.additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }
  
  // Add auth token
  const token = cookies.get("authToken");
  if (token) {
    multipartInstance.defaults.headers.Authorization = `Bearer ${token}`;
  }
  
  return multipartInstance.post<T>(url, formData, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (options?.onProgress && typeof options.onProgress === "function") {
          options.onProgress(percentCompleted);
        }
      }
    },
  });
};

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = cookies.get("authToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Don't set Content-Type for FormData automatically
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      if (error.response.status === 401) {
        // Handle unauthorized access
        cookies.remove("token");
        window.location.href = "/auth/login";
      } else if (error.response.status === 403) {
        // Handle forbidden access
        console.error("Permission denied");
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from server");
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
export default axiosInstance;