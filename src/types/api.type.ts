export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: {
    total?: number;
    totalPages?: number;
    page?: number;
    limit?: number;
    [key: string]: any;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export type FilePayload = {
  file: File | File[];
  [key: string]: any;
};
