import { createI18n } from "vue-i18n"

type LanguageModule = {
    lang: AnyObject
}

export function loadLanguages() {
    const context = import.meta.glob("./languages/*.ts", { eager: true }) as Record<string, LanguageModule>;
    const languages: AnyObject = {};

    for (const key of Object.keys(context)) {
        const module = context[key];
        const name = key.replace(/(\.\/languages\/|\.ts)/g, "");
        languages[name] = module.lang;
    }

    return languages;
}

export const i18n = createI18n({
    // globalInjection: true,
    // legacy: false,
    locale: "zh-cn",
    fallbackLocale: "zh-cn",
    messages: loadLanguages()
})

export const i18nt = i18n.global.t

export function setLanguage(locale: string) {
    const globalLocale = i18n.global.locale as unknown as { value?: string };
    if (typeof globalLocale === "object" && globalLocale !== null && "value" in globalLocale) {
        globalLocale.value = locale;
        return;
    }
    (i18n.global.locale as unknown as string) = locale;
}