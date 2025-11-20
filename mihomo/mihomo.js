const main = (config) => {

  config['mixed-port'] = 7890;
  config['ipv6'] = true;
  config['allow-lan'] = true;
  config['unified-delay'] = true;
  config['tcp-concurrent'] = true;
  config['external-controller'] = '127.0.0.1:9090';
  config['secret'] = 'leejieun';
  config['find-process-mode'] = 'strict';
  config['global-client-fingerprint'] = 'random';
  config.profile = {
    'store-selected': true,
    'store-fake-ip': true
  };
  
  if (config.proxies) {
  config.proxies = config.proxies.filter(proxy => 
    !proxy.name?.match(/剩余|重置|官网|套餐|订阅|重启|群组|电报|备用/)
  );
  };
  
  config.sniffer = {
    enable: true,
    'parse-pure-ip': true,
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
    },
    'skip-domain': [
      '*.vivox.com'
    ]
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
    'fake-ip-filter': [
      '+.lan',
      '+.local',
      '+.msftconnecttest.com',
      '+.msftncsi.com',
      'rule-set:private_domain',
      'rule-set:microsoft_domain',
      'rule-set:cn_domain'
    ],
    'default-nameserver': [
      '223.5.5.5',
      '119.29.29.29'
    ],
    nameserver: [
      'https://dns.google/dns-query',
      'https://cloudflare-dns.com/dns-query'
    ],
    'proxy-server-nameserver': [
      'https://dns.alidns.com/dns-query',
      'https://doh.pub/dns-query'
    ],
    'direct-nameserver': [
      'https://dns.alidns.com/dns-query',
      'https://doh.pub/dns-query'
    ],
    fallback: []
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
    'RULE-SET,microsoft_domain,DIRECT',
    'RULE-SET,geolocation-!cn,Proxy',
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
    private_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/private.mrs'
    },
    reject_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/TG-Twilight/AWAvenue-Ads-Rule@main/Filters/AWAvenue-Ads-Rule-Clash.mrs'
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
    'geolocation-!cn': {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/geolocation-!cn.mrs'
    },
    cn_domain: {
      ...domainConfig,
      url: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/cn.mrs'
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
