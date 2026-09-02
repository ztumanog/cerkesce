export type UserRole = 'VIEWER' | 'ANALYST' | 'EDITOR' | 'ADMIN';

export interface LoginRequestDTO {
  username: string;
  passwordHash: string;
}

export interface JwtPayloadDTO {
  sub: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface LoginResponseDTO {
  accessToken: string;
  expiresIn: number;
  role: UserRole;
}

export interface AuditEventDTO {
  action: 'SEARCH_EXECUTED' | 'EXPORT_GENERATED' | 'NETWORK_EXPANDED' | 'ANALYTICS_VIEWED';
  userId: string;
  timestamp: number;
  details?: string;
}