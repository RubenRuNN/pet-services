import type { UserRole, Permission } from '@/config/constants';
import { ROLE_PERMISSIONS, ROLE_HIERARCHY } from '@/config/constants';

/**
 * Check if a user role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  const rolePermissions = ROLE_PERMISSIONS[role] || [];
  return rolePermissions.includes(permission);
}

/**
 * Check if a user role has any of the specified permissions
 */
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}

/**
 * Check if a user role has all of the specified permissions
 */
export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission));
}

/**
 * Check if a role has higher or equal hierarchy level
 */
export function hasRoleAccess(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Check if user can access a resource based on tenant ownership
 */
export function canAccessResource(
  userTenantId: string,
  resourceTenantId: string,
): boolean {
  return userTenantId === resourceTenantId;
}

