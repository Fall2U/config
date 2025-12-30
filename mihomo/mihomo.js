const main = (config) => {
  Object.assign(config, {
    "mixed-port": 7890,
    "ipv6": true,
    "allow-lan": true,
    "unified-delay": true,
    "tcp-concurrent": true,
    "external-controller": "127.0.0.1:9090",
    "secret": "",
    "find-process-mode": "strict",
    "global-client-fingerprint": "random"
  });

  config["profile"] = {
    "store-selected": true,
    "store-fake-ip": true
  };

  config["sniffer"] = {
    "enable": true,
    "parse-pure-ip": true,
    "sniff": {
      "TLS": { "ports": [443, 8443] },
      "QUIC": { "ports": [443, 8443] },
      "HTTP": { "ports": [80, "8080-8880"], "override-destination": true }
    },
    "skip-dst-address": ["0.0.0.0/8", "10.0.0.0/8", "100.64.0.0/10", "127.0.0.0/8", "169.254.0.0/16", "172.16.0.0/12", "192.0.0.0/24", "192.0.2.0/24", "192.88.99.0/24", "192.168.0.0/16", "198.51.100.0/24", "203.0.113.0/24", "224.0.0.0/3", "::/127", "fe80::/10", "ff00::/8", "fc00:4000::/18", "fc00:8000::/17", "fc01::/16", "fc02::/15", "fc04::/14", "fc08::/13", "fc10::/12", "fc20::/11", "fc40::/10", "fc80::/9", "fd00::/8"]
  };

  config["tun"] = {
    "enable": true,
    "stack": "gvisor",
    "dns-hijack": [
      "any:53",
      "tcp://any:53"
    ],
    "auto-route": true,
    "auto-detect-interface": true,
    "strict-route": true
  };

  config["hosts"] = {
    "dns.google": [
      "8.8.8.8",
      "8.8.4.4"
    ],
    "dns.alidns.com": [
      "223.6.6.6",
      "223.5.5.5"
    ]
  };

  config["dns"] = {
    "enable": true,
    "cache-algorithm": "arc",
    "ipv6": true,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.0/15",
    "fake-ip-range6": "fc00::/18",
    "fake-ip-filter": [
      "rule-set:fakeip_filter",
      "rule-set:private"
    ],
    "nameserver": [
      "https://dns.google/dns-query#Proxy"
    ],
    "proxy-server-nameserver": [
      "https://dns.alidns.com/dns-query"
    ],
    "direct-nameserver": [
      "https://dns.alidns.com/dns-query"
    ],
    "nameserver-policy": {
      "rule-set:private": [
        "system"
      ],
      "rule-set:fakeip_filter": [
        "https://dns.alidns.com/dns-query"
      ]
    }
  };

  config["proxy-groups"] = [{
      "name": "Proxy",
      "type": "select",
      "include-all": true,
      "exclude-type": "direct"
    },
    {
      "name": "GLOBAL",
      "type": "select",
      "proxies": [
        "Proxy"
      ]
    }
  ];

  config["rules"] = [
    "RULE-SET,fakeip_filter,DIRECT",
    "RULE-SET,private,DIRECT",
    "RULE-SET,private_ip,DIRECT,no-resolve",
    "RULE-SET,reject,REJECT",
    "RULE-SET,google,Proxy",
    "RULE-SET,google_ip,Proxy,no-resolve",
    "RULE-SET,telegram,Proxy",
    "RULE-SET,telegram_ip,Proxy,no-resolve",
    "RULE-SET,github,Proxy",
    "RULE-SET,steam,Proxy",
    "RULE-SET,proxy,Proxy",
    "RULE-SET,cn,DIRECT",
    "RULE-SET,cn_ip,DIRECT",
    "MATCH,Proxy"
  ];

  const domainConfig = {
    "type": "http",
    "interval": 86400,
    "behavior": "domain",
    "format": "mrs"
  };

  const ipConfig = {
    "type": "http",
    "interval": 86400,
    "behavior": "ipcidr",
    "format": "mrs"
  };

  config["rule-providers"] = {
    "fakeip_filter": {
      ...domainConfig,
      "url": "https://testingcf.jsdelivr.net/gh/DustinWin/ruleset_geodata@mihomo-ruleset/fakeip-filter.mrs"
    },
    "private": {
      ...domainConfig,
      "url": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/private.mrs"
    },
    "reject": {
      ...domainConfig,
      "url": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-ads-all.mrs"
    },
    "google": {
      ...domainConfig,
      "url": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/google.mrs"
    },
    "telegram": {
      ...domainConfig,
      "url": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/telegram.mrs"
    },
    "github": {
      ...domainConfig,
      "url": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/github.mrs"
    },
    "steam": {
      ...domainConfig,
      "url": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/steam.mrs"
    },
    "cn": {
      ...domainConfig,
      "url": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/cn.mrs"
    },
    "proxy": {
      ...domainConfig,
      "url": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/geolocation-!cn.mrs"
    },
    "private_ip": {
      ...ipConfig,
      "url": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/private.mrs"
    },
    "cn_ip": {
      ...ipConfig,
      "url": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/cn.mrs"
    },
    "google_ip": {
      ...ipConfig,
      "url": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/google.mrs"
    },
    "telegram_ip": {
      ...ipConfig,
      "url": "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/telegram.mrs"
    }
  };
  return config;
};
