export function log(event: string, payload: Record<string, unknown> = {}) {
  console.log(JSON.stringify({ t: Date.now(), event, ...payload }));
}
