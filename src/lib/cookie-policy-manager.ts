/**
 * Cookie策略管理器
 * 确保用户的"拒绝"指令拥有最高优先级
 */

// 检查是否在客户端环境
const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';

// 追踪脚本域名黑名单
const TRACKING_DOMAINS = [
  'google-analytics.com',
  'googletagmanager.com',
  'facebook.net',
  'hotjar.com',
  'amplitude.com',
  'mixpanel.com',
  'segment.com',
  'optimizely.com',
  'vwo.com',
  'doubleclick.net',
  'googlesyndication.com',
  'googleadservices.com',
  'google-analytics.com',
  'googletagmanager.com',
  'facebook.com',
  'twitter.com',
  'linkedin.com',
  'pinterest.com',
  'tiktok.com',
  'snapchat.com'
];

// 追踪Cookie黑名单
const TRACKING_COOKIES = [
  '_ga',
  '_gid',
  '_gat',
  '_fbp',
  '_fbc',
  'hotjar',
  'amplitude',
  'mixpanel',
  'segment',
  'optimizely',
  'vwo',
  '_hjid',
  '_hjSessionUser_',
  '_hjIncludedInSessionSample',
  '_hjAbsoluteSessionInProgress',
  '_hjFirstSeen',
  '_hjViewportId',
  '_hjSessionRejected',
  '_hjSessionTooLarge',
  '_hjSessionResumed',
  '_hjSessionPaused',
  '_hjSessionSampled',
  '_hjSessionCorrelationId',
  '_hjSessionUserId',
  '_hjSessionCreated',
  '_hjSessionLastActivity',
  '_hjSessionCount',
  '_hjSessionFirstActivity',
  '_hjSessionLastActivityTime',
  '_hjSessionFirstActivityTime',
  '_hjSessionLastActivityTimestamp',
  '_hjSessionFirstActivityTimestamp'
];

// 必要Cookie白名单（始终允许）
const ESSENTIAL_COOKIES = [
  'nano_cookie_consent', // 记住用户选择
  'nano_silent_mode',    // 静默模式标记
  'supabase.auth.token', // Supabase认证
  'supabase.auth.refreshToken',
  'supabase.auth.expiresAt',
  'supabase.auth.expiresIn',
  'supabase.auth.accessToken',
  'supabase.auth.refreshToken',
  'supabase.auth.providerToken',
  'supabase.auth.providerRefreshToken'
];

class CookiePolicyManager {
  private static instance: CookiePolicyManager;
  private isSilentMode: boolean = false;
  private originalCreateElement: typeof document.createElement | null = null;
  private originalSetAttribute: typeof Element.prototype.setAttribute | null = null;

  private constructor() {
    // 只在客户端环境中初始化
    if (isClient) {
      this.originalCreateElement = document.createElement;
      this.originalSetAttribute = Element.prototype.setAttribute;
      this.init();
    }
  }

  public static getInstance(): CookiePolicyManager {
    if (!CookiePolicyManager.instance) {
      CookiePolicyManager.instance = new CookiePolicyManager();
    }
    return CookiePolicyManager.instance;
  }

  private init(): void {
    if (!isClient) return;
    
    // 立即检查用户选择并应用策略
    this.checkAndApplyPolicy();
    
    // 监听localStorage变化
    window.addEventListener('storage', this.handleStorageChange.bind(this));
    
    // 在DOM加载完成后应用策略
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.applyPolicy.bind(this));
    } else {
      this.applyPolicy();
    }
  }

  private checkAndApplyPolicy(): void {
    if (!isClient) return;
    
    const consentChoice = localStorage.getItem('nano_cookie_consent');
    const silentMode = localStorage.getItem('nano_silent_mode');
    
    if (consentChoice === 'rejected' || silentMode === 'true') {
      this.enableSilentMode();
    }
  }

  private handleStorageChange(event: StorageEvent): void {
    if (!isClient) return;
    
    if (event.key === 'nano_cookie_consent' || event.key === 'nano_silent_mode') {
      this.checkAndApplyPolicy();
    }
  }

  private applyPolicy(): void {
    if (!isClient) return;
    
    if (this.isSilentMode) {
      this.enableSilentMode();
    }
  }

  public enableSilentMode(): void {
    if (!isClient || this.isSilentMode) return;
    
    this.isSilentMode = true;
    localStorage.setItem('nano_silent_mode', 'true');
    
    // 阻止所有追踪脚本
    this.blockAllTrackingScripts();
    
    // 删除所有追踪Cookie
    this.removeAllTrackingCookies();
    
    // 拦截动态脚本加载
    this.interceptScriptLoading();
    
    // 阻止iframe加载
    this.blockTrackingIframes();
    
    console.log('🔒 Silent mode enabled - All tracking blocked');
  }

  public disableSilentMode(): void {
    if (!isClient || !this.isSilentMode) return;
    
    this.isSilentMode = false;
    localStorage.setItem('nano_silent_mode', 'false');
    
    // 恢复正常的脚本加载
    this.restoreNormalScriptLoading();
    
    console.log('🔓 Silent mode disabled - Tracking allowed');
  }

  private blockAllTrackingScripts(): void {
    if (!isClient) return;
    
    // 阻止Google Analytics
    (window as any)['ga-disable-GA_MEASUREMENT_ID'] = true;
    
    // 阻止Google Tag Manager
    if ((window as any).dataLayer) {
      (window as any).dataLayer = [];
    }
    
    // 阻止所有常见追踪器
    const trackingFunctions = [
      'gtag', 'fbq', 'twq', 'snap', 'pintrk', 'ttq', 'linkedin', 'pinterest',
      'amplitude', 'mixpanel', 'segment', 'hotjar', 'optimizely', 'vwo'
    ];
    
    trackingFunctions.forEach(funcName => {
      if ((window as any)[funcName]) {
        (window as any)[funcName] = () => {};
      }
    });
  }

  private removeAllTrackingCookies(): void {
    if (!isClient) return;
    
    const hostname = window.location.hostname;
    const domainParts = hostname.split('.');
    
    // 删除根域名和子域名的追踪Cookie
    const domains = [hostname];
    if (domainParts.length > 2) {
      domains.push(`.${domainParts.slice(-2).join('.')}`);
    }
    
    TRACKING_COOKIES.forEach(cookieName => {
      domains.forEach(domain => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      });
    });
  }

  private interceptScriptLoading(): void {
    if (!isClient || !this.originalCreateElement) return;
    
    // 拦截document.createElement
    document.createElement = (tagName: string) => {
      const element = this.originalCreateElement!.call(document, tagName);
      
      if (tagName.toLowerCase() === 'script') {
        // 拦截script标签的src设置
        const originalSetAttribute = element.setAttribute;
        element.setAttribute = (name: string, value: string) => {
          if (name === 'src' && this.isTrackingScript(value)) {
            console.log(`🚫 Blocked tracking script: ${value}`);
            return;
          }
          return originalSetAttribute.call(element, name, value);
        };
        
        // 拦截script标签的innerHTML设置
        const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
        if (originalInnerHTML && originalInnerHTML.set) {
          Object.defineProperty(element, 'innerHTML', {
            set: (value: string) => {
              if (this.containsTrackingCode(value)) {
                console.log('🚫 Blocked tracking code in innerHTML');
                return;
              }
              originalInnerHTML.set!.call(element, value);
            }
          });
        }
      }
      
      return element;
    };
  }

  private blockTrackingIframes(): void {
    if (!isClient || !this.originalCreateElement) return;
    
    // 拦截iframe创建
    const originalCreateElement = this.originalCreateElement;
    document.createElement = (tagName: string) => {
      const element = originalCreateElement.call(document, tagName);
      
      if (tagName.toLowerCase() === 'iframe') {
        const originalSetAttribute = element.setAttribute;
        element.setAttribute = (name: string, value: string) => {
          if (name === 'src' && this.isTrackingIframe(value)) {
            console.log(`🚫 Blocked tracking iframe: ${value}`);
            return;
          }
          return originalSetAttribute.call(element, name, value);
        };
      }
      
      return element;
    };
  }

  private isTrackingScript(src: string): boolean {
    return TRACKING_DOMAINS.some(domain => src.includes(domain));
  }

  private isTrackingIframe(src: string): boolean {
    return TRACKING_DOMAINS.some(domain => src.includes(domain));
  }

  private containsTrackingCode(code: string): boolean {
    const trackingPatterns = [
      'gtag(',
      'fbq(',
      'twq(',
      'hotjar',
      'amplitude',
      'mixpanel',
      'segment',
      'optimizely',
      'vwo'
    ];
    
    return trackingPatterns.some(pattern => code.includes(pattern));
  }

  private restoreNormalScriptLoading(): void {
    if (!isClient || !this.originalCreateElement || !this.originalSetAttribute) return;
    
    // 恢复原始的document.createElement
    document.createElement = this.originalCreateElement;
    
    // 恢复原始的setAttribute
    Element.prototype.setAttribute = this.originalSetAttribute;
  }

  public getStatus(): { isSilentMode: boolean; consentChoice: string | null } {
    if (!isClient) {
      return { isSilentMode: false, consentChoice: null };
    }
    
    return {
      isSilentMode: this.isSilentMode,
      consentChoice: localStorage.getItem('nano_cookie_consent')
    };
  }

  public forceSilentMode(): void {
    if (!isClient) return;
    
    this.enableSilentMode();
    localStorage.setItem('nano_cookie_consent', 'rejected');
  }
}

// 创建全局实例（只在客户端）
const cookiePolicyManager = isClient ? CookiePolicyManager.getInstance() : null;

// 导出实例和类型
export default cookiePolicyManager;
export { CookiePolicyManager };
