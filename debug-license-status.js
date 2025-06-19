// Debug script to check license status from n8n API
const fetch = require('node-fetch');

async function checkLicenseStatus() {
    try {
        // Check the settings endpoint to see what enterprise features are enabled
        const response = await fetch('http://localhost:5678/rest/settings');
        const settings = await response.json();
        
        console.log('🔍 Enterprise Feature Status:');
        console.log('================================');
        
        if (settings.data?.enterprise) {
            const enterprise = settings.data.enterprise;
            Object.entries(enterprise).forEach(([feature, enabled]) => {
                const status = enabled ? '✅' : '❌';
                console.log(`${status} ${feature}: ${enabled}`);
            });
        } else {
            console.log('❌ No enterprise settings found');
        }
        
        console.log('\n🔍 Loaded Modules:');
        console.log('==================');
        if (settings.data?.loadedModules) {
            settings.data.loadedModules.forEach(module => {
                console.log(`✅ ${module}`);
            });
        } else {
            console.log('❌ No loaded modules found');
        }
        
        console.log('\n🔍 Module Settings:');
        console.log('==================');
        if (settings.data?.moduleSettings) {
            console.log(JSON.stringify(settings.data.moduleSettings, null, 2));
        } else {
            console.log('❌ No module settings found');
        }
        
        console.log('\n🔍 License Info:');
        console.log('================');
        if (settings.data?.license) {
            console.log(`Plan: ${settings.data.license.planName}`);
            console.log(`Environment: ${settings.data.license.environment}`);
        }
        
    } catch (error) {
        console.error('❌ Error checking license status:', error.message);
        console.log('Make sure n8n is running on http://localhost:5678');
    }
}

checkLicenseStatus();