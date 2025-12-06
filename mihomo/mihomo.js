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
  
  config.dns = {
    enable: true,
    ipv6: true,
    'respect-rules': true,
    'enhanced-mode': 'fake-ip',
    'fake-ip-range': '28.0.0.1/8',
    'fake-ip-range6': '2400::1/64',
    'fake-ip-filter': [
      'rule-set:fakeip_filter',
      'rule-set:private_domain'
    ],
    'nameserver': [
      'https://8.8.8.8/dns-query',
      'https://8.8.4.4/dns-query'
    ],
    'proxy-server-nameserver': [
      'https://223.6.6.6/dns-query',
      'https://223.5.5.5/dns-query'
    ],
    'direct-nameserver': [
      'https://223.6.6.6/dns-query',
      'https://223.5.5.5/dns-query'
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
      name: "GLOBAL",
      type: "select",
      proxies: [
        "Proxy"
      ]
    }
  ];
  
  config.rules = [
    'RULE-SET,fakeip_filter,DIRECT',
    'RULE-SET,private_domain,DIRECT',
    'RULE-SET,reject_domain,REJECT',
    'RULE-SET,telegram_domain,Proxy',
    'RULE-SET,google_domain,Proxy',
    'RULE-SET,ai_domain,Proxy',
    'RULE-SET,github_domain,Proxy',
    'RULE-SET,youtube_domain,Proxy',
    'RULE-SET,tiktok_domain,Proxy',
    'RULE-SET,instagram_domain,Proxy',
    'RULE-SET,twitter_domain,Proxy',
    'RULE-SET,steam_domain,Proxy',
    'RULE-SET,microsoft_domain,DIRECT',
    'RULE-SET,proxy_domain,Proxy',
    'RULE-SET,cn_domain,DIRECT',
    'RULE-SET,private_ip,DIRECT,no-resolve',
    'RULE-SET,telegram_ip,Proxy,no-resolve',
    'RULE-SET,google_ip,Proxy,no-resolve',
    'RULE-SET,cn_ip,DIRECT,no-resolve',
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
    ai_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-ai-!cn.mrs'
    },
    youtube_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/youtube.mrs'
    },
    google_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/google.mrs'
    },
    github_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/github.mrs'
    },
    telegram_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/telegram.mrs'
    },
    instagram_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/instagram.mrs'
    },
    microsoft_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/microsoft.mrs'
    },
    tiktok_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/tiktok.mrs'
    },
    twitter_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/twitter.mrs'
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
