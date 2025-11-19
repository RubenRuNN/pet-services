/**
 * API Configuration
 * Centralized API endpoint configuration and response types
 */

export const apiConfig = {
  // API Version
  version: 'v1',
  basePath: '/api',

  // Response Headers
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': 'v1',
  },

  // Error Codes
  errorCodes: {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    CONFLICT: 'CONFLICT',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  } as const,

  // Success Messages
  messages: {
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    RETRIEVED: 'Resource retrieved successfully',
  } as const,

  // Timeouts
  timeouts: {
    default: 30000, // 30 seconds
    upload: 60000, // 60 seconds
    longRunning: 120000, // 2 minutes
  },
} as const;

/**
 * Standard API Response Types
 */
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
    totalPages?: number;
  };
};

/**
 * API Error Response
 */
export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
  statusCode: number;
};

/**
 * Create standardized success response
 */
export function createSuccessResponse<T>(
  data: T,
  meta?: ApiResponse<T>['meta'],
): ApiResponse<T> {
  return {
    success: true,
    data,
    ...(meta && { meta }),
  };
}

/**
 * Create standardized error response
 */
export function createErrorResponse(
  code: string,
  message: string,
  details?: unknown,
  statusCode = 400,
): { response: ApiResponse; statusCode: number } {
  return {
    response: {
      success: false,
      error: {
        code,
        message,
        ...(details && { details }),
      },
    },
    statusCode,
  };
}

