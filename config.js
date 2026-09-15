// Dynamic App Configuration Mapping
// Add new apps here to automatically support them in both privacy policy and terms of use pages.
const configMap = {
    "kkb": {
        name: "KKB",
        owner: "Sho Shibata",
        date: "2026年6月13日",
        contact: "App Storeのサポート窓口またはアプリ内のお問い合わせ",
        serviceType: "スマートフォン向けアプリケーション",
        dataTypes: "家計簿データ、収支記録、設定情報など",
        isInvestmentApp: false
    },
    "blog": {
        name: "Blog",
        owner: "Sho Shibata",
        date: "2026年6月13日",
        contact: "サポート窓口（support@mr-john-it.com）",
        serviceType: "Webアプリケーション",
        dataTypes: "アカウント情報、記事・コメント、閲覧履歴、設定情報など",
        isInvestmentApp: false
    },
    "stock": {
        name: "Mr.John Stock Research",
        owner: "Sho Shibata",
        date: "2026年9月15日",
        contact: "サポート窓口（support@mr-john-it.com）",
        serviceType: "株式分析＆クオンツAIターミナル",
        dataTypes: "アカウント情報、ポートフォリオ・仮想取引データ、分析設定、検索履歴など",
        isInvestmentApp: true
    }
};

// Default Configuration (fallback for unmatched query parameter/subdomain or local development)
const defaultConfig = {
    name: "本アプリ",
    owner: "Sho Shibata",
    date: "2026年6月13日",
    contact: "お問い合わせ窓口",
    serviceType: "アプリケーション",
    dataTypes: "登録データ、設定情報など",
    isInvestmentApp: false
};

/**
 * Resolves the app from the URL query parameter `?app=xxx` or the subdomain prefix,
 * and dynamically injects the corresponding configuration values into placeholder elements.
 * @param {string} pageTitlePrefix - The prefix for the document title (e.g., "プライバシーポリシー")
 */
function applyAppConfig(pageTitlePrefix) {
    document.addEventListener("DOMContentLoaded", function() {
        // 1. Get the app key from the query parameter (e.g., ?app=kkb)
        const urlParams = new URLSearchParams(window.location.search);
        let appKey = urlParams.get('app');

        // 2. Fallback to subdomain if the query parameter is not present
        if (!appKey) {
            const hostname = window.location.hostname;
            // E.g., kkb.doc.mr-john-it.com -> kkb
            appKey = hostname.split('.')[0].toLowerCase();
        } else {
            appKey = appKey.toLowerCase();
        }

        // 3. Resolve the config based on the app key
        const config = configMap[appKey] || defaultConfig;

        // 4. Inject resolved values into placeholder elements
        document.querySelectorAll(".app-name").forEach(el => el.textContent = config.name);
        document.querySelectorAll(".app-owner").forEach(el => el.textContent = config.owner);
        document.querySelectorAll(".app-date").forEach(el => el.textContent = config.date);
        document.querySelectorAll(".app-contact").forEach(el => el.textContent = config.contact);
        document.querySelectorAll(".app-service-type").forEach(el => el.textContent = config.serviceType || defaultConfig.serviceType);
        document.querySelectorAll(".app-data-types").forEach(el => el.textContent = config.dataTypes || defaultConfig.dataTypes);

        // 5. Handle conditional elements (e.g. investment disclaimer items)
        document.querySelectorAll(".investment-only").forEach(el => {
            el.style.display = config.isInvestmentApp ? "" : "none";
        });
        
        // 6. Update document title
        document.title = `${pageTitlePrefix} - ${config.name}`;
    });
}
