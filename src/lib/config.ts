// NEXT_PUBLIC_* vars are inlined at build time. In production we don't always
// know the public URL at build time, so when no explicit value is baked in we
// fall back to the same origin the app is served from (nginx routes /api and
// /socket.io to the gateway). Local dev sets the explicit localhost values in
// .env.local, so this same-origin fallback never kicks in there.
function sameOrigin(): { http: string; ws: string } | null {
  if (typeof window === 'undefined') return null;
  const { protocol, host } = window.location;
  return {
    http: `${protocol}//${host}`,
    ws: `${protocol === 'https:' ? 'wss:' : 'ws:'}//${host}`,
  };
}

const origin = sameOrigin();

export const config = {
  gatewayHttpUrl:
    process.env.NEXT_PUBLIC_GATEWAY_HTTP_URL || origin?.http || 'http://localhost:4000',
  gatewayWsUrl:
    process.env.NEXT_PUBLIC_GATEWAY_WS_URL || origin?.ws || 'ws://localhost:4000',
};


