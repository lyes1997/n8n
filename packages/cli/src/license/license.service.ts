import { LicenseState, Logger } from '@n8n/backend-common';
import type { User } from '@n8n/db';
import { WorkflowRepository } from '@n8n/db';
import { Service } from '@n8n/di';
import axios, { AxiosError } from 'axios';
import { ensureError } from 'n8n-workflow';

import { BadRequestError } from '@/errors/response-errors/bad-request.error';
import { EventService } from '@/events/event.service';
import { License } from '@/license';
import { UrlService } from '@/services/url.service';

type LicenseError = Error & { errorId?: keyof typeof LicenseErrors };

export const LicenseErrors = {
	SCHEMA_VALIDATION: 'Activation key is in the wrong format',
	RESERVATION_EXHAUSTED: 'Activation key has been used too many times',
	RESERVATION_EXPIRED: 'Activation key has expired',
	NOT_FOUND: 'Activation key not found',
	RESERVATION_CONFLICT: 'Activation key not found',
	RESERVATION_DUPLICATE: 'Activation key has already been used on this instance',
};

@Service()
export class LicenseService {
	constructor(
		private readonly logger: Logger,
		private readonly license: License,
		private readonly licenseState: LicenseState,
		private readonly workflowRepository: WorkflowRepository,
		private readonly urlService: UrlService,
		private readonly eventService: EventService,
	) {}

	async getLicenseData() {
		const triggerCount = await this.workflowRepository.getActiveTriggerCount();
		const workflowsWithEvaluationsCount =
			await this.workflowRepository.getWorkflowsWithEvaluationCount();

		// License bypassed - return unlimited usage data
		return {
			usage: {
				activeWorkflowTriggers: {
					value: triggerCount,
					limit: -1, // Unlimited
					warningThreshold: 0.8,
				},
				workflowsHavingEvaluations: {
					value: workflowsWithEvaluationsCount,
					limit: -1, // Unlimited
				},
			},
			license: {
				planId: 'enterprise',
				planName: 'Enterprise (Unlimited)',
			},
		};
	}

	async requestEnterpriseTrial(user: User) {
		// License bypassed - no external license server calls needed
		this.logger.info('Enterprise trial request bypassed - all features already enabled');
		return;
	}

	async registerCommunityEdition({
		userId,
		email,
		instanceId,
		instanceUrl,
		licenseType,
	}: {
		userId: User['id'];
		email: string;
		instanceId: string;
		instanceUrl: string;
		licenseType: string;
	}): Promise<{ title: string; text: string }> {
		// License bypassed - no external license server calls needed
		this.logger.info('Community edition registration bypassed - all features already enabled');
		this.eventService.emit('license-community-plus-registered', {
			userId,
			email,
			licenseKey: 'bypassed',
		});
		return {
			title: 'Registration Complete',
			text: 'All enterprise features are enabled without registration.',
		};
	}

	getManagementJwt(): string {
		// License bypassed - return empty JWT
		return '';
	}

	async activateLicense(activationKey: string) {
		// License bypassed - activation always succeeds
		this.logger.info('License activation bypassed - all features enabled');
	}

	async renewLicense() {
		// License bypassed - renewal always succeeds
		this.eventService.emit('license-renewal-attempted', { success: true });
		this.logger.info('License renewal bypassed - all features remain enabled');
	}

	private mapErrorMessage(error: LicenseError, action: 'activate' | 'renew') {
		let message = error.errorId && LicenseErrors[error.errorId];
		if (!message) {
			message = `Failed to ${action} license: ${error.message}`;
			this.logger.error(message, { stack: error.stack ?? 'n/a' });
		}
		return message;
	}
}
