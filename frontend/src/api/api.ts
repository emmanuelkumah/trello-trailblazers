import { AxiosResponse } from 'axios';
import { axiosInstance, uploadFile, uploadMultipleFiles } from './config';

/**
 * Handles GET requests
 */
export const getFunction = async <T = any>(endpoint: string, params?: any): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.get(endpoint, { params });
  return response.data;
};

/**
 * Handles POST requests
 */
export const postFunction = async <T = any>(endpoint: string, data: any): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.post(endpoint, data);
  return response.data;
};

/**
 * Handles PUT requests
 */
export const putFunction = async <T = any>(endpoint: string, data: any): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.put(endpoint, data);
  return response.data;
};

/**
 * Handles PATCH requests
 */
export const patchFunction = async <T = any>(endpoint: string, data: any): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.patch(endpoint, data);
  return response.data;
};

/**
 * Handles DELETE requests
 */
export const deleteFunction = async <T = any>(endpoint: string, data?: any): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.delete(endpoint, { data });
  return response.data;
};

/**
 * Handles file uploads
 */
export const uploadFunction = async <T = any>(endpoint: string, file: File, additionalData?: Record<string, string>): Promise<T> => {
  const response = await uploadFile<T>(endpoint, file, { additionalData });
  return response.data;
};

/**
 * Handles multiple file uploads
 */
export const uploadMultipleFunction = async <T = any>(endpoint: string, files: File[], fieldName: string = 'files'): Promise<T> => {
  const response = await uploadMultipleFiles<T>(endpoint, files, fieldName);
  return response.data;
};

/*Usage

// Get users with type safety
interface User {
  id: number;
  name: string;
  email: string;
}

// Get user by ID
const user = await getFunction<User>('/users/1');
console.log(user.name);

// Create a new user
const newUser = await postFunction<User>('/users', { 
  name: 'John Doe', 
  email: 'john@example.com' 
});

// Update a user
await putFunction<User>('/users/1', { name: 'Jane Doe' });

// Partially update a user
await patchFunction<User>('/users/1', { email: 'jane@example.com' });

// Delete a user
await deleteFunction('/users/1');

// Upload a profile picture
const fileInput = document.querySelector<HTMLInputElement>('#avatar');
if (fileInput?.files?.[0]) {
  const result = await uploadFunction<{url: string}>('/upload/avatar', fileInput.files[0]);
  console.log('Uploaded image URL:', result.url);
}

// Upload multiple files
const filesInput = document.querySelector<HTMLInputElement>('#documents');
if (filesInput?.files) {
  const fileArray = Array.from(filesInput.files);
  await uploadMultipleFunction('/upload/documents', fileArray);
}

*/