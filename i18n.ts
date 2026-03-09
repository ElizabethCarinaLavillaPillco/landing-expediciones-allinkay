import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
    locale,  // Agrega esto para eliminar el warning
    messages: (await import(`./messages/${locale}.json`)).default
}));