import { LoginRequestDTO, LoginResponseDTO, JwtPayloadDTO, UserRole, AuditEventDTO } from '../dto/AuthDTO';

export class AuthService {
  private static auditLogs: AuditEventDTO[] = [];
  private static requestCounts = new Map<string, { count: number; windowStart: number }>();

  private static ROLE_HIERARCHY: Record<UserRole, number> = {
    VIEWER: 1,
    ANALYST: 2,
    EDITOR: 3,
    ADMIN: 4
  };

  public static login(request: LoginRequestDTO): LoginResponseDTO {
    const role: UserRole = request.username.includes('admin') ? 'ADMIN' : 'VIEWER';
    const payload: JwtPayloadDTO = {
      sub: request.username,
      role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    };

    const accessToken = `Bearer mock_token.${btoa(JSON.stringify(payload))}`;
    return { accessToken, expiresIn: 3600, role };
  }

  public static verifyToken(token: string): JwtPayloadDTO | null {
    try {
      if (!token.startsWith('Bearer ')) return null;
      const raw = token.replace('Bearer ', '').split('.')[1];
      if (!raw) return null;
      return JSON.parse(atob(raw)) as JwtPayloadDTO;
    } catch {
      return null;
    }
  }

  public static isAuthorized(userRole: UserRole, requiredRole: UserRole): boolean {
    return this.ROLE_HIERARCHY[userRole] >= this.ROLE_HIERARCHY[requiredRole];
  }

  public static checkRateLimit(clientId: string, limit = 100, windowMs = 60000): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const record = this.requestCounts.get(clientId) || { count: 0, windowStart: now };

    if (now - record.windowStart > windowMs) {
      record.count = 1;
      record.windowStart = now;
    } else {
      record.count += 1;
    }

    this.requestCounts.set(clientId, record);

    const allowed = record.count <= limit;
    const remaining = Math.max(0, limit - record.count);
    return { allowed, remaining };
  }

  public static logAudit(event: AuditEventDTO): void {
    this.auditLogs.push(event);
  }

  public static getAuditLogs(): AuditEventDTO[] {
    return [...this.auditLogs];
  }

  public static clearState(): void {
    this.auditLogs = [];
    this.requestCounts.clear();
  }
}