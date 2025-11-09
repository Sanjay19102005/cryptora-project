// Mock data generators for simulation

export const generateRandomIP = () => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

export const generateRandomPort = () => {
  return Math.floor(Math.random() * 65535);
};

export const generateTORNodes = (count = 50) => {
  const countries = ['US', 'DE', 'FR', 'GB', 'NL', 'SE', 'CA', 'AU', 'JP', 'BR', 'RU', 'CN'];
  const nodes = [];
  
  for (let i = 0; i < count; i++) {
    nodes.push({
      id: `node-${i}`,
      ip: generateRandomIP(),
      port: generateRandomPort(),
      country: countries[Math.floor(Math.random() * countries.length)],
      type: ['entry', 'middle', 'exit'][Math.floor(Math.random() * 3)],
      bandwidth: Math.floor(Math.random() * 10000) + 1000,
      uptime: Math.floor(Math.random() * 100),
      fingerprint: Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      lat: (Math.random() - 0.5) * 180,
      lon: (Math.random() - 0.5) * 360,
    });
  }
  
  return nodes;
};

export const generateTrafficData = (hours = 24) => {
  const data = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      traffic: Math.floor(Math.random() * 1000) + 100,
      connections: Math.floor(Math.random() * 50) + 10,
      packets: Math.floor(Math.random() * 10000) + 1000,
    });
  }
  
  return data;
};

export const generateSession = () => {
  const startTime = new Date(Date.now() - Math.random() * 86400000);
  const duration = Math.floor(Math.random() * 3600) + 60;
  
  return {
    id: `session-${Math.random().toString(36).substr(2, 9)}`,
    startTime: startTime.toISOString(),
    duration: duration,
    entryNode: generateRandomIP(),
    exitNode: generateRandomIP(),
    dataTransferred: Math.floor(Math.random() * 1000000) + 10000,
    packets: Math.floor(Math.random() * 10000) + 100,
    status: ['active', 'closed', 'suspicious'][Math.floor(Math.random() * 3)],
  };
};

export const generateSessions = (count = 20) => {
  return Array.from({ length: count }, () => generateSession());
};

export const generateCorrelationResults = () => {
  const entryNodes = Array.from({ length: 5 }, () => ({
    ip: generateRandomIP(),
    country: ['US', 'DE', 'FR', 'GB', 'NL'][Math.floor(Math.random() * 5)],
    confidence: Math.floor(Math.random() * 40) + 60,
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    packetSize: Math.floor(Math.random() * 1000) + 100,
    flowProbability: Math.random() * 0.3 + 0.7,
  }));
  
  return {
    overallConfidence: Math.floor(Math.random() * 20) + 75,
    timestampMatch: Math.random() * 0.2 + 0.8,
    packetSizeSimilarity: Math.random() * 0.15 + 0.85,
    flowProbability: Math.random() * 0.1 + 0.9,
    entryNodes: entryNodes.sort((a, b) => b.confidence - a.confidence),
  };
};

export const generateOriginIP = () => {
  const countries = [
    { name: 'United States', code: 'US', lat: 37.0902, lon: -95.7129 },
    { name: 'Germany', code: 'DE', lat: 51.1657, lon: 10.4515 },
    { name: 'France', code: 'FR', lat: 46.2276, lon: 2.2137 },
    { name: 'United Kingdom', code: 'GB', lat: 55.3781, lon: -3.4360 },
    { name: 'Netherlands', code: 'NL', lat: 52.1326, lon: 5.2913 },
  ];
  
  const country = countries[Math.floor(Math.random() * countries.length)];
  
  return {
    ip: generateRandomIP(),
    country: country.name,
    countryCode: country.code,
    lat: country.lat + (Math.random() - 0.5) * 5,
    lon: country.lon + (Math.random() - 0.5) * 5,
    confidence: Math.floor(Math.random() * 15) + 80,
    patterns: [
      { type: 'Timestamp Correlation', match: Math.random() * 0.1 + 0.9 },
      { type: 'Packet Size Pattern', match: Math.random() * 0.1 + 0.85 },
      { type: 'Flow Characteristics', match: Math.random() * 0.1 + 0.88 },
      { type: 'Node Sequence', match: Math.random() * 0.1 + 0.82 },
    ],
    asn: `AS${Math.floor(Math.random() * 100000)}`,
    isp: ['Comcast', 'Verizon', 'AT&T', 'Deutsche Telekom', 'Orange'][Math.floor(Math.random() * 5)],
  };
};

export const generateTORCircuit = () => {
  const nodes = generateTORNodes(10);
  const entryNode = nodes.find(n => n.type === 'entry') || nodes[0];
  const middleNode = nodes.find(n => n.type === 'middle') || nodes[1];
  const exitNode = nodes.find(n => n.type === 'exit') || nodes[2];
  
  return {
    id: `circuit-${Math.random().toString(36).substr(2, 9)}`,
    entry: {
      ...entryNode,
      type: 'entry',
      position: { x: 100, y: 200 },
    },
    middle: {
      ...middleNode,
      type: 'middle',
      position: { x: 400, y: 200 },
    },
    exit: {
      ...exitNode,
      type: 'exit',
      position: { x: 700, y: 200 },
    },
    timestamp: new Date().toISOString(),
    duration: Math.floor(Math.random() * 3600) + 60,
  };
};

export const generateForensicReport = (circuit, originIP, correlation) => {
  return {
    reportId: `RPT-${Date.now()}`,
    generatedAt: new Date().toISOString(),
    circuit: circuit,
    originIP: originIP,
    correlation: correlation,
    summary: {
      totalSessions: Math.floor(Math.random() * 100) + 50,
      totalDataTransferred: Math.floor(Math.random() * 10000000) + 1000000,
      averageSessionDuration: Math.floor(Math.random() * 1800) + 300,
      suspectedActivities: ['Data Exfiltration', 'Anonymous Communication', 'Circumvention'],
    },
    timeline: Array.from({ length: 10 }, (_, i) => ({
      timestamp: new Date(Date.now() - (10 - i) * 3600000).toISOString(),
      event: ['Connection Established', 'Data Transfer', 'Node Change', 'Connection Closed'][Math.floor(Math.random() * 4)],
      details: `Event occurred at node ${generateRandomIP()}`,
    })),
  };
};

