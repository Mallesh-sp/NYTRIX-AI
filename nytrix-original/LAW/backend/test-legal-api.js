/**
 * ============================================================
 * INDIAN LEGAL INTELLIGENCE API - TEST EXAMPLES
 * Run: node test-legal-api.js
 * ============================================================
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000';

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

/**
 * Make HTTP request
 */
function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'test_api_key_2026'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

/**
 * Log result
 */
function logResult(testName, result, expectedStatus = 200) {
  const success = result.status === expectedStatus;
  const icon = success ? '✅' : '❌';
  const color = success ? colors.green : colors.red;
  
  console.log(`\n${color}${icon} ${testName}${colors.reset}`);
  console.log(`   Status: ${result.status}`);
  
  if (result.data) {
    if (typeof result.data === 'object') {
      console.log(`   Response: ${JSON.stringify(result.data, null, 2).substring(0, 500)}...`);
    } else {
      console.log(`   Response: ${result.data.substring(0, 200)}`);
    }
  }
  
  return success;
}

/**
 * Run all tests
 */
async function runTests() {
  console.log(colors.bold + colors.cyan);
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║   🇮🇳 INDIAN LEGAL INTELLIGENCE API - TEST SUITE          ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log(colors.reset);
  
  let passed = 0;
  let failed = 0;

  try {
    // Test 1: Health Check
    console.log(colors.yellow + '\n📋 Test Group 1: Health & Status' + colors.reset);
    const health = await makeRequest('GET', '/api/v1/health');
    if (logResult('Health Check', health)) passed++; else failed++;

    // Test 2: Get Domains
    const domains = await makeRequest('GET', '/api/v1/domains');
    if (logResult('Get All Domains', domains)) passed++; else failed++;

    // Test 3: Get Stats
    const stats = await makeRequest('GET', '/api/v1/stats');
    if (logResult('Get Database Statistics', stats)) passed++; else failed++;

    // Test 4: Classification Tests
    console.log(colors.yellow + '\n📋 Test Group 2: Legal Query Classification' + colors.reset);
    
    const classifyTests = [
      { name: 'Criminal Query', query: 'Someone attacked me with a knife and stole my phone' },
      { name: 'Cyber Crime Query', query: 'My Facebook account was hacked and attacker is demanding money' },
      { name: 'Property Query', query: 'My builder has not given possession of flat even after 3 years' },
      { name: 'Labour Query', query: 'My company fired me without giving notice period or severance pay' },
      { name: 'Consumer Query', query: 'I bought a defective refrigerator and seller is not replacing it' },
      { name: 'Family Law Query', query: 'I want to file for divorce due to domestic violence and cruelty' }
    ];

    for (const test of classifyTests) {
      const result = await makeRequest('POST', '/api/v1/classify', { query: test.query });
      if (logResult(`Classify: ${test.name}`, result)) passed++; else failed++;
    }

    // Test 5: Full Analysis Tests
    console.log(colors.yellow + '\n📋 Test Group 3: Full Legal Analysis' + colors.reset);
    
    const analyzeTests = [
      {
        name: 'Murder Case Analysis',
        body: {
          query: 'What is the punishment for murder under new Indian criminal laws? Is it bailable?',
          limit: 3
        }
      },
      {
        name: 'Cyber Fraud Analysis',
        body: {
          query: 'Someone created fake profile using my photos and is cheating people online. What sections apply?',
          limit: 3
        }
      },
      {
        name: 'RERA Complaint Analysis',
        body: {
          query: 'Builder delayed my flat possession by 2 years. Can I file complaint under RERA and get compensation?',
          limit: 5
        }
      }
    ];

    for (const test of analyzeTests) {
      const result = await makeRequest('POST', '/api/v1/analyze', test.body);
      if (logResult(`Analyze: ${test.name}`, result)) passed++; else failed++;
    }

    // Test 6: Search Tests
    console.log(colors.yellow + '\n📋 Test Group 4: Database Search' + colors.reset);
    
    const searchResult = await makeRequest('GET', '/api/v1/search?q=cheating%20fraud%20punishment&limit=5');
    if (logResult('Search: Cheating Fraud', searchResult)) passed++; else failed++;

    const domainSearch = await makeRequest('GET', '/api/v1/search?q=murder&domain=CRIMINAL&limit=3');
    if (logResult('Search: Murder in Criminal Domain', domainSearch)) passed++; else failed++;

    // Test 7: Section Lookup
    console.log(colors.yellow + '\n📋 Test Group 5: Section Lookup' + colors.reset);
    
    const sectionLookup = await makeRequest('GET', '/api/v1/section/420');
    if (logResult('Section Lookup: Section 420', sectionLookup)) passed++; else failed++;

    // Test 8: Validation Tests
    console.log(colors.yellow + '\n📋 Test Group 6: Input Validation' + colors.reset);
    
    const shortQuery = await makeRequest('POST', '/api/v1/analyze', { query: 'help' });
    if (logResult('Validation: Short Query (Should Fail)', shortQuery, 400)) passed++; else failed++;

    const emptyQuery = await makeRequest('POST', '/api/v1/classify', { query: '' });
    if (logResult('Validation: Empty Query (Should Fail)', emptyQuery, 400)) passed++; else failed++;

  } catch (error) {
    console.log(colors.red + `\n❌ Test Error: ${error.message}` + colors.reset);
    failed++;
  }

  // Summary
  console.log(colors.bold + colors.cyan);
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║                    TEST SUMMARY                           ║');
  console.log('╠═══════════════════════════════════════════════════════════╣');
  console.log(`║   ${colors.green}Passed: ${passed}${colors.cyan}                                             ║`);
  console.log(`║   ${colors.red}Failed: ${failed}${colors.cyan}                                             ║`);
  console.log(`║   Total:  ${passed + failed}                                             ║`);
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log(colors.reset);

  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch(console.error);
