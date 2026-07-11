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
  
  // If it's already a decoded URL or HTML content, do not decode.
  if (
    str.startsWith('http://') || 
    str.startsWith('https://') || 
    str.trim().startsWith('<') ||
    str.includes('://') ||
    str.includes('?')
  ) {
    return str
  }

  try {
    // Check if it runs in browser or server
    if (typeof window !== 'undefined') {
      return window.atob(str)
    } else {
      // Buffer.from doesn't throw on invalid base64 in Node.js, so we validate first
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/
      if (!base64Regex.test(str) || str.length % 4 !== 0) {
        return str
      }
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

export function getEffectiveStatus(status: string, startTimeString: string): string {
  if (!startTimeString) return status;
  if (status === 'FT') return 'FT'; // If explicitly marked finished, keep finished

  const startTime = new Date(startTimeString);
  const now = new Date();
  const diffMs = now.getTime() - startTime.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  // LIVE: from 1 hour before start_time to 3 hours after start_time (total 4 hours)
  if (diffHours >= -1 && diffHours < 3) {
    return 'LIVE';
  }

  // FT: after 3 hours from start_time
  if (diffHours >= 3) {
    return 'FT';
  }

  // NS: before 1 hour from start_time
  return 'NS';
}
