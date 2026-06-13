// Dynamic App Configuration Mapping
// Add new apps here to automatically support them in both privacy policy and terms of use pages.
const configMap = {
    "kkb": {
        name: "KKB",
        owner: "Sho Shibata",
        date: "2026年6月13日",
        contact: "App Storeのサポート窓口またはアプリ内のお問い合わせ"
    },
    "blog": {
        name: "Blog",
        owner: "Sho Shibata",
        date: "2026年6月13日",
        contact: "サポート窓口（support@mr-john-it.com）"
    }
};

// Default Configuration (fallback for unmatched query parameter/subdomain or local development)
const defaultConfig = {
    name: "本アプリ",
    owner: "Sho Shibata",
    date: "2026年6月13日",
    contact: "お問い合わせ窓口"
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
        
        // 5. Update document title
        document.title = `${pageTitlePrefix} - ${config.name}`;
    });
}
