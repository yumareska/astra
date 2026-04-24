type GtagParams = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: GtagParams) => void;
  }
}

export function trackEvent(eventName: string, params?: GtagParams) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

export function trackQuizComplete(strategyId: string) {
  trackEvent("quiz_complete", { strategy_id: strategyId });
}

export function trackCtaClick(strategyId: string) {
  trackEvent("cta_click", { strategy_id: strategyId });
}
