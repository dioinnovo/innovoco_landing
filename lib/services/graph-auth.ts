/**
 * Microsoft Graph API Authentication Service
 *
 * Handles Azure AD authentication using Client Credentials flow
 * for server-side access to SharePoint resources.
 */

import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';

// Environment variable validation
const REQUIRED_ENV_VARS = [
  'AZURE_AD_CLIENT_ID',
  'AZURE_AD_CLIENT_SECRET',
  'AZURE_AD_TENANT_ID',
] as const;

interface GraphConfig {
  clientId: string;
  clientSecret: string;
  tenantId: string;
}

/**
 * Get and validate Graph API configuration from environment
 */
function getGraphConfig(): GraphConfig {
  const config = {
    clientId: process.env.AZURE_AD_CLIENT_ID,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
    tenantId: process.env.AZURE_AD_TENANT_ID,
  };

  const missingVars = REQUIRED_ENV_VARS.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }

  return config as GraphConfig;
}

// Singleton instance for the Graph client
let graphClientInstance: Client | null = null;
let credentialInstance: ClientSecretCredential | null = null;

/**
 * Create Azure AD credential using Client Secret flow
 */
function getCredential(): ClientSecretCredential {
  if (credentialInstance) {
    return credentialInstance;
  }

  const config = getGraphConfig();

  credentialInstance = new ClientSecretCredential(
    config.tenantId,
    config.clientId,
    config.clientSecret
  );

  return credentialInstance;
}

/**
 * Get Microsoft Graph API client
 * Uses singleton pattern to reuse client across requests
 */
export function getGraphClient(): Client {
  if (graphClientInstance) {
    return graphClientInstance;
  }

  const credential = getCredential();

  // Create authentication provider
  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ['https://graph.microsoft.com/.default'],
  });

  // Create Graph client
  graphClientInstance = Client.initWithMiddleware({
    authProvider,
  });

  return graphClientInstance;
}

/**
 * Get an access token for direct API calls
 * Useful for debugging or custom requests
 */
export async function getAccessToken(): Promise<string> {
  const credential = getCredential();
  const tokenResponse = await credential.getToken(
    'https://graph.microsoft.com/.default'
  );

  if (!tokenResponse?.token) {
    throw new Error('Failed to obtain access token');
  }

  return tokenResponse.token;
}

/**
 * Reset the client instance (useful for testing or token refresh issues)
 */
export function resetGraphClient(): void {
  graphClientInstance = null;
  credentialInstance = null;
}

/**
 * Check if Graph API is properly configured
 */
export function isGraphConfigured(): boolean {
  try {
    getGraphConfig();
    return true;
  } catch {
    return false;
  }
}

/**
 * Test the Graph API connection
 * Returns true if authentication succeeds
 */
export async function testGraphConnection(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const client = getGraphClient();
    // Make a simple request to verify authentication
    await client.api('/sites/root').get();
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: message };
  }
}
