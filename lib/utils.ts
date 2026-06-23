export function cn(...inputs: (string | boolean | undefined | null | {[key: string]: boolean})[]) {
  const classes: string[] = []
  inputs.forEach((input) => {
    if (!input) return
    if (typeof input === 'string') {
      classes.push(input)
    } else if (typeof input === 'object') {
      Object.entries(input).forEach(([key, value]) => {
        if (value) classes.push(key)
      })
    }
  })
  return classes.join(' ')
}

export function decodeBase64(str: string): string {
  if (!str) return ''
  try {
    // Check if it runs in browser or server
    if (typeof window !== 'undefined') {
      return window.atob(str)
    } else {
      return Buffer.from(str, 'base64').toString('utf-8')
    }
  } catch (e) {
    return str
  }
}

export function encodeBase64(str: string): string {
  if (!str) return ''
  try {
    if (typeof window !== 'undefined') {
      return window.btoa(str)
    } else {
      return Buffer.from(str, 'utf-8').toString('base64')
    }
  } catch (e) {
    return str
  }
}

export function formatLocalDate(dateString: string | Date): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ar-EG', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function formatLocalTime(dateString: string | Date): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    // Allow alphanumeric characters, Arabic unicode range, and hyphens
    .replace(/[^\w\u0600-\u06FF-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}
