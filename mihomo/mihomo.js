const main = (config) => {

  Object.assign(config, {
    'mixed-port': 7890,
    'ipv6': true,
    'allow-lan': true,
    'unified-delay': true,
    'tcp-concurrent': true,
    'external-controller': '127.0.0.1:9090',
    'secret': '',
    'find-process-mode': 'strict',
    'global-client-fingerprint': 'random'
    }
  );
  
  config.profile = {
    'store-selected': true,
    'store-fake-ip': true
  };
  
  config.sniffer = {
    enable: true,
    sniff: {
      HTTP: {
        ports: [80, '8080-8880'],
        'override-destination': true
      },
      TLS: {
        ports: [443, 8443]
      },
      QUIC: {
        ports: [443, 8443]
      }
    }
  };
  
  config.tun = {
    enable: true,
    stack: 'mixed',
    'dns-hijack': [
      'any:53',
      'tcp://any:53'
    ],
    'auto-route': true,
    'auto-detect-interface': true,
    'strict-route': true
  };

  config.hosts = {
    'dns.alidns.com': ['223.6.6.6', '223.5.5.5'],
    'dns.google': ['8.8.8.8', '8.8.4.4']
  };
  
  config.dns = {
    enable: true,
    'cache-algorithm': 'arc',
    ipv6: true,
    'respect-rules': true,
    'enhanced-mode': 'fake-ip',
    'fake-ip-filter': [
      'rule-set:fakeip_filter',
      'rule-set:private_domain'
    ],
    'nameserver-policy': {
      'rule-set:private_domain': ['system'],
      'rule-set:fakeip_filter': [
        'https://dns.alidns.com/dns-query'
      ]
    },
    'nameserver': [
      'https://dns.google/dns-query#Proxy'
    ],
    'proxy-server-nameserver': [
      'https://dns.alidns.com/dns-query'
    ],
    'direct-nameserver': [
      'https://dns.alidns.com/dns-query'
    ]
  };
  
  config['proxy-groups'] = [
    {
      name: 'Proxy',
      type: 'select',
      'include-all': true,
      'exclude-type': 'direct'
    },
    {
      name: 'GLOBAL',
      type: 'select',
      proxies: [
        'Proxy'
      ]
    }
  ];
  
  config.rules = [
    'RULE-SET,fakeip_filter,DIRECT',
    'RULE-SET,private_domain,DIRECT',
    'RULE-SET,private_ip,DIRECT,no-resolve',
    'RULE-SET,reject_domain,REJECT',
    'RULE-SET,telegram_ip,Proxy,no-resolve',
    'RULE-SET,google_domain,Proxy',
    'RULE-SET,google_ip,Proxy,no-resolve',
    'RULE-SET,github_domain,Proxy',
    'RULE-SET,steam_domain,Proxy',
    'RULE-SET,proxy_domain,Proxy',
    'RULE-SET,cn_domain,DIRECT',
    'RULE-SET,cn_ip,DIRECT',
    'MATCH,Proxy'
  ];
  
  const domainConfig = {
    type: 'http',
    interval: 86400,
    behavior: 'domain',
    format: 'mrs'
  };
  const ipConfig = {
    type: 'http',
    interval: 86400,
    behavior: 'ipcidr',
    format: 'mrs'
  };
  
  config['rule-providers'] = {
    fakeip_filter: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/DustinWin/ruleset_geodata@mihomo-ruleset/fakeip-filter.mrs'
    },
    private_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/private.mrs'
    },
    reject_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-ads-all.mrs'
    },
    google_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/google.mrs'
    },
    github_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/github.mrs'
    },
    steam_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/steam.mrs'
    },
    cn_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/cn.mrs'
    },
    proxy_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/geolocation-!cn.mrs'
    },
    private_ip: {
      ...ipConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/private.mrs'
    },
    cn_ip: {
      ...ipConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/cn.mrs'
    },
    google_ip: {
      ...ipConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/google.mrs'
    },
    telegram_ip: {
      ...ipConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/telegram.mrs'
    }
  };
  return config;
};
