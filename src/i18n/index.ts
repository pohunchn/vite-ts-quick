import { createI18n } from "vue-i18n"

export async function loadLanguages() {
    const context = import.meta.globEager("./languages/*.ts");

    const languages: AnyObject = {};

    let langs = Object.keys(context);
    for (let key of langs) {
        if (key === "./index.ts") return;
        let lang = context[key].lang;
        let name = key.replace(/(\.\/languages\/|\.ts)/g, '');
        // try {
        //     if (name === "en") console.log('?????')
        //     // const elLang = await import(`element-plus/lib/locale/lang/en`) as  AnyObject;
        //     let elLang = await import(`element-plus/lib/locale/lang/${name}`) as AnyObject;
        //     lang = Object.assign(lang, {el: elLang.deafault.default.el})
        // } catch (error) {}
        languages[name] = lang
    }
    
    return languages
}

export const i18n = createI18n({
    locale: 'zh-cn',
    fallbackLocale: 'zh-cn',
    messages: await loadLanguages()
})

export function setLanguage(locale: string) {
    i18n.global.locale = locale
}