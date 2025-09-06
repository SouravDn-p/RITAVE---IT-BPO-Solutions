export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// https://developers.google.com/analytics/devguides/collection/ga4/pages
export const pageview = (gaMeasurementId: string, url: string) => {
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.gtag("config", gaMeasurementId, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/ga4/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
