import amplitude from 'amplitude-js';
export default class Amplitude {
    static init() {
        if(process.env.NEXT_PUBLIC_ANALYTICS_ID) {
            amplitude.getInstance().init(process.env.NEXT_PUBLIC_ANALYTICS_ID);
        }
    }

    static analyticsPageView(page: string, properties?: { [key: string]: any }) {
        if (process.env.NEXT_PUBLIC_ENV === "development") {
            // console.log(`pageView ${page}`, properties);
            return;
        }

        if (properties == null) {
            properties = { page: page };
        } else {
            properties["page"] = page;
        }

        amplitude.getInstance().logEvent("PageView", properties);

        //Logger.log(`pageView ${page}`, properties);
    }

    static analyticsEvent(event: {
        category: string;
        action: string;
        label?: string;
        value?: number;
        [key: string]: any;
    }) {
        if (process.env.NEXT_PUBLIC_ENV === "development") {
            console.log(`event: [${event.category}][${event.action}]`, event);
            return;
        }

        amplitude.getInstance().logEvent(`[${event.category}][${event.action}]`, event);
        //console.log(`event: [${event.category}][${event.action}]`, event);
    }
}
