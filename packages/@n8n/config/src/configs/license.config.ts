import { Config, Env } from '../decorators';

@Config
export class LicenseConfig {
	// License bypassed - configuration disabled
	serverUrl: string = '';
	autoRenewalEnabled: boolean = false;
	activationKey: string = '';
	detachFloatingOnShutdown: boolean = false;
	tenantId: number = 0;
	cert: string = '';
}
