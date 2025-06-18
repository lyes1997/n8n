import type { BooleanLicenseFeature } from '@n8n/constants';
import { UNLIMITED_LICENSE_QUOTA } from '@n8n/constants';
import { Service } from '@n8n/di';
import { UnexpectedError } from 'n8n-workflow';

import type { FeatureReturnType, LicenseProvider } from './types';

class ProviderNotSetError extends UnexpectedError {
	constructor() {
		super('Cannot query license state because license provider has not been set');
	}
}

@Service()
export class LicenseState {
	licenseProvider: LicenseProvider | null = null;

	setLicenseProvider(provider: LicenseProvider) {
		this.licenseProvider = provider;
	}

	private assertProvider(): asserts this is { licenseProvider: LicenseProvider } {
		if (!this.licenseProvider) throw new ProviderNotSetError();
	}

	// --------------------
	//     core queries
	// --------------------

	isLicensed(feature: BooleanLicenseFeature) {
		// License bypassed - all features are licensed
		return true;
	}

	getValue<T extends keyof FeatureReturnType>(feature: T): FeatureReturnType[T] {
		// License bypassed - return unlimited values
		if (feature === 'planName') {
			return 'Enterprise (Unlimited)' as FeatureReturnType[T];
		}
		// Return unlimited quota for numeric features
		return UNLIMITED_LICENSE_QUOTA as FeatureReturnType[T];
	}

	// --------------------
	//      booleans
	// --------------------
	// License bypassed - all features return true

	isSharingLicensed() {
		return true;
	}

	isLogStreamingLicensed() {
		return true;
	}

	isLdapLicensed() {
		return true;
	}

	isSamlLicensed() {
		return true;
	}

	isOidcLicensed() {
		return true;
	}

	isApiKeyScopesLicensed() {
		return true;
	}

	isAiAssistantLicensed() {
		return true;
	}

	isAskAiLicensed() {
		return true;
	}

	isAiCreditsLicensed() {
		return true;
	}

	isAdvancedExecutionFiltersLicensed() {
		return true;
	}

	isAdvancedPermissionsLicensed() {
		return true;
	}

	isDebugInEditorLicensed() {
		return true;
	}

	isBinaryDataS3Licensed() {
		return true;
	}

	isMultiMainLicensed() {
		return true;
	}

	isVariablesLicensed() {
		return true;
	}

	isSourceControlLicensed() {
		return true;
	}

	isExternalSecretsLicensed() {
		return true;
	}

	isWorkflowHistoryLicensed() {
		return true;
	}

	isAPIDisabled() {
		return false; // API should be enabled
	}

	isWorkerViewLicensed() {
		return true;
	}

	isProjectRoleAdminLicensed() {
		return true;
	}

	isProjectRoleEditorLicensed() {
		return true;
	}

	isProjectRoleViewerLicensed() {
		return true;
	}

	isCustomNpmRegistryLicensed() {
		return true;
	}

	isFoldersLicensed() {
		return true;
	}

	isInsightsSummaryLicensed() {
		return true;
	}

	isInsightsDashboardLicensed() {
		return true;
	}

	isInsightsHourlyDataLicensed() {
		return true;
	}

	// --------------------
	//      integers
	// --------------------
	// License bypassed - all quotas return unlimited

	getMaxUsers() {
		return UNLIMITED_LICENSE_QUOTA;
	}

	getMaxActiveWorkflows() {
		return UNLIMITED_LICENSE_QUOTA;
	}

	getMaxVariables() {
		return UNLIMITED_LICENSE_QUOTA;
	}

	getMaxAiCredits() {
		return UNLIMITED_LICENSE_QUOTA;
	}

	getWorkflowHistoryPruneQuota() {
		return UNLIMITED_LICENSE_QUOTA;
	}

	getInsightsMaxHistory() {
		return UNLIMITED_LICENSE_QUOTA;
	}

	getInsightsRetentionMaxAge() {
		return UNLIMITED_LICENSE_QUOTA;
	}

	getInsightsRetentionPruneInterval() {
		return UNLIMITED_LICENSE_QUOTA;
	}

	getMaxTeamProjects() {
		return UNLIMITED_LICENSE_QUOTA;
	}

	getMaxWorkflowsWithEvaluations() {
		return UNLIMITED_LICENSE_QUOTA;
	}
}
