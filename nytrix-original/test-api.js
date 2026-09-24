const http = require('http');

const scenarios = [
  'My employer has not paid my salary',
  'I was fired wrongfully',
  'I need a divorce',
  'My neighbor is harassing me',
  'Online shopping fraud',
  'child custody issue'
];

scenarios.forEach(scenario => {
  const postData = JSON.stringify({ scenario });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/analyze-scenario',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      const result = JSON.parse(data);
      console.log(`\n✅ "${scenario}"`);
      console.log(`   Law: ${result.law}`);
      console.log(`   Risk: ${result.riskLevel}`);
      console.log(`   Lawyer: ${result.lawyerRecommendation}`);
      console.log(`   Steps: ${result.actionSteps[0]}`);
    });
  });

  req.write(postData);
  req.end();
});
