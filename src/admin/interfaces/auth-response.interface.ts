export interface AuthResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    image?: string;
    role: string | object;
    is_active: boolean;
    isPhoneVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  accessToken: string;
  refreshToken: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface PaginatedResponse<T> {
  users: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
