#!/usr/bin/env node

/**
 * Integration check script
 * Verifies that frontend and backend can communicate
 */

const http = require('http');

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const FRONTEND_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const checks = [
  {
    name: 'Backend Health Check',
    url: `${API_URL}/health`,
    method: 'GET',
  },
  {
    name: 'Backend Auth Routes',
    url: `${API_URL}/api/v1/auth/me`,
    method: 'GET',
    expectAuth: true,
  },
  {
    name: 'Backend Blog Routes (Public)',
    url: `${API_URL}/api/v1/blogs`,
    method: 'GET',
  },
];

async function checkEndpoint(check) {
  return new Promise((resolve) => {
    const url = new URL(check.url);
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method: check.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (check.expectAuth) {
      // This will fail without auth, which is expected
      options.headers['Authorization'] = 'Bearer test-token';
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          success: res.statusCode < 500, // 401/403 are OK for auth endpoints
          status: res.statusCode,
          data: data,
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message,
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Timeout',
      });
    });

    req.end();
  });
}

async function runChecks() {
  console.log('🔍 Checking Integration...\n');

  for (const check of checks) {
    process.stdout.write(`Checking ${check.name}... `);
    const result = await checkEndpoint(check);

    if (result.success) {
      console.log(`✅ (Status: ${result.status})`);
    } else {
      console.log(`❌ ${result.error || `Status: ${result.status}`}`);
    }
  }

  console.log('\n📝 Integration Check Complete!');
  console.log('\nNote: Auth endpoints may return 401/403 without valid tokens - this is expected.');
}

runChecks().catch(console.error);

