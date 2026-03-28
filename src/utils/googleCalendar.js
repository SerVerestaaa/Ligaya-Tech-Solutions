/**
 * Builds a Google Calendar "create event" URL for a placeholder strategy-call block.
 * Time is intentionally approximate — users adjust after email confirmation.
 */
export function strategyCallGoogleCalendarUrl() {
  const start = new Date()
  start.setUTCDate(start.getUTCDate() + 5)
  start.setUTCHours(9, 0, 0, 0)
  const end = new Date(start.getTime() + 30 * 60 * 1000)

  const pad = (n) => String(n).padStart(2, '0')
  const toG = (d) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(
      d.getUTCMinutes(),
    )}00Z`

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Strategy call — Ligaya Technology Solutions',
    dates: `${toG(start)}/${toG(end)}`,
    details:
      'Placeholder hold — move to your confirmed slot after our team emails you.\n\nligayatechsolutions@gmail.com',
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
