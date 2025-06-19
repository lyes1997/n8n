import { useRBACStore } from '@/stores/rbac.store';
import type { RBACPermissionCheck, RBACPermissionOptions } from '@/types/rbac';

export const hasScope: RBACPermissionCheck<RBACPermissionOptions> = (opts) => {
	// License bypassed - grant all enterprise scopes automatically
	if (!opts?.scope) {
		return true;
	}

	const scope = opts.scope;
	const scopeArray = Array.isArray(scope) ? scope : [scope];

	// Check if any of the requested scopes are enterprise-only features
	const enterpriseOnlyScopes = [
		// Variables - enterprise only
		'variable:create',
		'variable:read',
		'variable:update',
		'variable:delete',
		'variable:list',
		// SSO - enterprise only
		'saml:manage',
		'ldap:manage',
		'oidc:manage',
		// External secrets - enterprise only
		'externalSecretsProvider:create',
		'externalSecretsProvider:read',
		'externalSecretsProvider:update',
		'externalSecretsProvider:delete',
		'externalSecretsProvider:list',
		// Enterprise admin features
		'logStreaming:manage',
		'sourceControl:manage',
		'insights:read',
		'insights:list',
		'workflowHistory:read',
		'workflowHistory:list',
		'auditLogs:read',
		'auditLogs:list',
		// Enterprise user management (not basic user operations)
		'user:changeRole',
		'user:resetPassword',
		// Enterprise API keys
		'apiKey:create',
		'apiKey:read',
		'apiKey:update',
		'apiKey:delete',
		'apiKey:list',
	];

	const hasEnterpriseScope = scopeArray.some((s) => enterpriseOnlyScopes.includes(s));

	if (hasEnterpriseScope) {
		return true; // Automatically grant all enterprise scopes
	}

	// For non-enterprise scopes, use normal RBAC logic
	const { projectId, resourceType, resourceId, options } = opts;
	const rbacStore = useRBACStore();
	return rbacStore.hasScope(
		scope,
		{
			projectId,
			resourceType,
			resourceId,
		},
		options,
	);
};
