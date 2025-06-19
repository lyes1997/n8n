import type { LicenseProvider } from '@n8n/backend-common';
import { Logger } from '@n8n/backend-common';
import { GlobalConfig } from '@n8n/config';
import {
	LICENSE_FEATURES,
	LICENSE_QUOTAS,
	UNLIMITED_LICENSE_QUOTA,
	type BooleanLicenseFeature,
	type NumericLicenseFeature,
} from '@n8n/constants';
import { SettingsRepository } from '@n8n/db';
import { OnLeaderStepdown, OnLeaderTakeover, OnPubSubEvent, OnShutdown } from '@n8n/decorators';
import { Container, Service } from '@n8n/di';
import type { TEntitlement, TLicenseBlock } from '@n8n_io/license-sdk';
import { InstanceSettings } from 'n8n-core';

import config from '@/config';

import { N8N_VERSION, SETTINGS_LICENSE_CERT_KEY, Time } from './constants';

const LICENSE_RENEWAL_DISABLED_WARNING =
	'Automatic license renewal is disabled. The license will not renew automatically, and access to licensed features may be lost!';

export type FeatureReturnType = Partial<
	{
		planName: string;
	} & { [K in NumericLicenseFeature]: number } & { [K in BooleanLicenseFeature]: boolean }
>;

@Service()
export class License implements LicenseProvider {
	private isShuttingDown = false;

	constructor(
		private readonly logger: Logger,
		private readonly instanceSettings: InstanceSettings,
		private readonly settingsRepository: SettingsRepository,
		private readonly globalConfig: GlobalConfig,
	) {
		this.logger = this.logger.scoped('license');
	}

	async init({
		forceRecreate = false,
		isCli = false,
	}: { forceRecreate?: boolean; isCli?: boolean } = {}) {
		// License bypassed - all features are now freely available
		this.logger.info('License system bypassed - all enterprise features enabled');
	}

	async loadCertStr(): Promise<TLicenseBlock> {
		// License bypassed - return empty string
		return '';
	}

	private async onFeatureChange() {
		// License bypassed - no action needed
	}

	private async onLicenseRenewed() {
		// License bypassed - no action needed
	}

	private async broadcastReloadLicenseCommand() {
		// License bypassed - no action needed
	}

	async saveCertStr(value: TLicenseBlock): Promise<void> {
		// License bypassed - no need to save license data
	}

	async activate(activationKey: string): Promise<void> {
		// License bypassed - activation not needed
		this.logger.debug('License activation bypassed - all features available');
	}

	@OnPubSubEvent('reload-license')
	async reload(): Promise<void> {
		// License bypassed - reload not needed
		this.logger.debug('License reload bypassed');
	}

	async renew() {
		// License bypassed - renewal not needed
		this.logger.debug('License renewal bypassed');
	}

	async clear() {
		// License bypassed - clearing not needed
		this.logger.info('License clear bypassed');
	}

	@OnShutdown()
	async shutdown() {
		// License bypassed - shutdown not needed
		this.isShuttingDown = true;
		this.logger.debug('License shutdown bypassed');
	}

	isLicensed(feature: BooleanLicenseFeature) {
		// License bypassed - all features are licensed
		return true;
	}

	/** @deprecated Use `LicenseState.isSharingLicensed` instead. */
	isSharingEnabled() {
		return this.isLicensed(LICENSE_FEATURES.SHARING);
	}

	/** @deprecated Use `LicenseState.isLogStreamingLicensed` instead. */
	isLogStreamingEnabled() {
		return this.isLicensed(LICENSE_FEATURES.LOG_STREAMING);
	}

	/** @deprecated Use `LicenseState.isLdapLicensed` instead. */
	isLdapEnabled() {
		return this.isLicensed(LICENSE_FEATURES.LDAP);
	}

	/** @deprecated Use `LicenseState.isSamlLicensed` instead. */
	isSamlEnabled() {
		return this.isLicensed(LICENSE_FEATURES.SAML);
	}

	/** @deprecated Use `LicenseState.isApiKeyScopesLicensed` instead. */
	isApiKeyScopesEnabled() {
		return this.isLicensed(LICENSE_FEATURES.API_KEY_SCOPES);
	}

	/** @deprecated Use `LicenseState.isAiAssistantLicensed` instead. */
	isAiAssistantEnabled() {
		return this.isLicensed(LICENSE_FEATURES.AI_ASSISTANT);
	}

	/** @deprecated Use `LicenseState.isAskAiLicensed` instead. */
	isAskAiEnabled() {
		return this.isLicensed(LICENSE_FEATURES.ASK_AI);
	}

	/** @deprecated Use `LicenseState.isAiCreditsLicensed` instead. */
	isAiCreditsEnabled() {
		return this.isLicensed(LICENSE_FEATURES.AI_CREDITS);
	}

	/** @deprecated Use `LicenseState.isAdvancedExecutionFiltersLicensed` instead. */
	isAdvancedExecutionFiltersEnabled() {
		return this.isLicensed(LICENSE_FEATURES.ADVANCED_EXECUTION_FILTERS);
	}

	/** @deprecated Use `LicenseState.isAdvancedPermissionsLicensed` instead. */
	isAdvancedPermissionsLicensed() {
		return this.isLicensed(LICENSE_FEATURES.ADVANCED_PERMISSIONS);
	}

	/** @deprecated Use `LicenseState.isDebugInEditorLicensed` instead. */
	isDebugInEditorLicensed() {
		return this.isLicensed(LICENSE_FEATURES.DEBUG_IN_EDITOR);
	}

	/** @deprecated Use `LicenseState.isBinaryDataS3Licensed` instead. */
	isBinaryDataS3Licensed() {
		return this.isLicensed(LICENSE_FEATURES.BINARY_DATA_S3);
	}

	/** @deprecated Use `LicenseState.isMultiMainLicensed` instead. */
	isMultiMainLicensed() {
		return this.isLicensed(LICENSE_FEATURES.MULTIPLE_MAIN_INSTANCES);
	}

	/** @deprecated Use `LicenseState.isVariablesLicensed` instead. */
	isVariablesEnabled() {
		return this.isLicensed(LICENSE_FEATURES.VARIABLES);
	}

	/** @deprecated Use `LicenseState.isSourceControlLicensed` instead. */
	isSourceControlLicensed() {
		return this.isLicensed(LICENSE_FEATURES.SOURCE_CONTROL);
	}

	/** @deprecated Use `LicenseState.isExternalSecretsLicensed` instead. */
	isExternalSecretsEnabled() {
		return this.isLicensed(LICENSE_FEATURES.EXTERNAL_SECRETS);
	}

	/** @deprecated Use `LicenseState.isWorkflowHistoryLicensed` instead. */
	isWorkflowHistoryLicensed() {
		return this.isLicensed(LICENSE_FEATURES.WORKFLOW_HISTORY);
	}

	/** @deprecated Use `LicenseState.isAPIDisabled` instead. */
	isAPIDisabled() {
		return this.isLicensed(LICENSE_FEATURES.API_DISABLED);
	}

	/** @deprecated Use `LicenseState.isWorkerViewLicensed` instead. */
	isWorkerViewLicensed() {
		return this.isLicensed(LICENSE_FEATURES.WORKER_VIEW);
	}

	/** @deprecated Use `LicenseState.isProjectRoleAdminLicensed` instead. */
	isProjectRoleAdminLicensed() {
		return this.isLicensed(LICENSE_FEATURES.PROJECT_ROLE_ADMIN);
	}

	/** @deprecated Use `LicenseState.isProjectRoleEditorLicensed` instead. */
	isProjectRoleEditorLicensed() {
		return this.isLicensed(LICENSE_FEATURES.PROJECT_ROLE_EDITOR);
	}

	/** @deprecated Use `LicenseState.isProjectRoleViewerLicensed` instead. */
	isProjectRoleViewerLicensed() {
		return this.isLicensed(LICENSE_FEATURES.PROJECT_ROLE_VIEWER);
	}

	/** @deprecated Use `LicenseState.isCustomNpmRegistryLicensed` instead. */
	isCustomNpmRegistryEnabled() {
		return this.isLicensed(LICENSE_FEATURES.COMMUNITY_NODES_CUSTOM_REGISTRY);
	}

	/** @deprecated Use `LicenseState.isFoldersLicensed` instead. */
	isFoldersEnabled() {
		return this.isLicensed(LICENSE_FEATURES.FOLDERS);
	}

	getCurrentEntitlements() {
		// License bypassed - return empty entitlements
		return [];
	}

	getValue<T extends keyof FeatureReturnType>(feature: T): FeatureReturnType[T] {
		// License bypassed - return unlimited values for quotas, true for features
		if (feature === 'planName') {
			return 'Enterprise (Unlimited)' as FeatureReturnType[T];
		}
		// Return unlimited quota for numeric features
		if (Object.values(LICENSE_QUOTAS).includes(feature as any)) {
			return UNLIMITED_LICENSE_QUOTA as FeatureReturnType[T];
		}
		// Return true for boolean features
		return true as FeatureReturnType[T];
	}

	getManagementJwt(): string {
		// License bypassed - return empty JWT
		return '';
	}

	/**
	 * Helper function to get the latest main plan for a license
	 */
	getMainPlan(): TEntitlement | undefined {
		// License bypassed - return undefined (no license plan needed)
		return undefined;
	}

	getConsumerId() {
		// License bypassed - return mock consumer ID
		return 'enterprise-unlimited';
	}

	// Helper functions for computed data

	/** @deprecated Use `LicenseState` instead. */
	getUsersLimit() {
		return this.getValue(LICENSE_QUOTAS.USERS_LIMIT) ?? UNLIMITED_LICENSE_QUOTA;
	}

	/** @deprecated Use `LicenseState` instead. */
	getTriggerLimit() {
		return this.getValue(LICENSE_QUOTAS.TRIGGER_LIMIT) ?? UNLIMITED_LICENSE_QUOTA;
	}

	/** @deprecated Use `LicenseState` instead. */
	getVariablesLimit() {
		return this.getValue(LICENSE_QUOTAS.VARIABLES_LIMIT) ?? UNLIMITED_LICENSE_QUOTA;
	}

	/** @deprecated Use `LicenseState` instead. */
	getAiCredits() {
		return this.getValue(LICENSE_QUOTAS.AI_CREDITS) ?? 0;
	}

	/** @deprecated Use `LicenseState` instead. */
	getWorkflowHistoryPruneLimit() {
		return this.getValue(LICENSE_QUOTAS.WORKFLOW_HISTORY_PRUNE_LIMIT) ?? UNLIMITED_LICENSE_QUOTA;
	}

	/** @deprecated Use `LicenseState` instead. */
	getTeamProjectLimit() {
		return this.getValue(LICENSE_QUOTAS.TEAM_PROJECT_LIMIT) ?? 0;
	}

	getPlanName(): string {
		// License bypassed - return enterprise plan name
		return 'Enterprise (Unlimited)';
	}

	getInfo(): string {
		// License bypassed - return mock info
		return 'Enterprise (Unlimited) - All features enabled';
	}

	/** @deprecated Use `LicenseState` instead. */
	isWithinUsersLimit() {
		return this.getUsersLimit() === UNLIMITED_LICENSE_QUOTA;
	}

	@OnLeaderTakeover()
	enableAutoRenewals() {
		// License bypassed - no renewals needed
	}

	@OnLeaderStepdown()
	disableAutoRenewals() {
		// License bypassed - no renewals needed
	}
}
