/**
 * DeidaraTV - FIFA World Cup 2026™ Matches Data
 * ================================================
 * 
 * IMPORTANT 1: All match times (dateTime) MUST be in UTC/GMT (with "Z" suffix).
 * The website will automatically convert and display them in each visitor's local timezone.
 * 
 * Example: If a match starts at 21:00 Morocco time (GMT+1), enter "2026-06-14T20:00:00Z"
 * 
 * IMPORTANT 2: LINK OBFUSCATION
 * To protect stream URLs from ad network scraping and crawlers, all streaming iframe URLs
 * must be stored here as Base64 encoded strings.
 * How to add/change a link:
 * 1. Take your raw URL (e.g. "https://my-stream-url.com/live")
 * 2. Encode it to Base64 (you can use an online tool like https://www.base64encode.org/ or run `btoa('your-url')` in your browser console)
 * 3. Paste the encoded string (e.g. "aHR0cHM6Ly9teS1zdHJlYW0tdXJsLmNvbS9saXZl") into the 'url' property below.
 */

const MATCHES_DATA = [
  // ===========================
  //  June 13 — يوم 13 يونيو
  // ===========================
  {
    id: 1,
    team1: {
      name: "الولايات المتحدة",
      logo: "https://flagcdn.com/w160/us.png"
    },
    team2: {
      name: "باراغواي",
      logo: "https://flagcdn.com/w160/py.png"
    },
    team1Score: 4,
    team2Score: 1,
    dateTime: "2026-06-13T01:00:00Z",
    league: "كأس العالم 2026 - المجموعة D",
    channel: "beIN Sports HD 1",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" },
      { name: "سيرفر 3 (متعدد)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" }
    ]
  },
  {
    id: 2,
    team1: {
      name: "قطر",
      logo: "https://flagcdn.com/w160/qa.png"
    },
    team2: {
      name: "سويسرا",
      logo: "https://flagcdn.com/w160/ch.png"
    },
    team1Score: 1,
    team2Score: 1,
    dateTime: "2026-06-13T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة B",
    channel: "beIN Sports HD 2",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" }
    ]
  },
  {
    id: 3,
    team1: {
      name: "البرازيل",
      logo: "https://flagcdn.com/w160/br.png"
    },
    team2: {
      name: "المغرب",
      logo: "https://flagcdn.com/w160/ma.png"
    },
    team1Score: 1,
    team2Score: 1,
    dateTime: "2026-06-13T22:00:00Z",
    league: "كأس العالم 2026 - المجموعة C",
    channel: "beIN Sports HD 1",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" },
      { name: "سيرفر 3 (متعدد)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" }
    ]
  },

  // ===========================
  //  June 14 — يوم 14 يونيو
  // ===========================
  {
    id: 4,
    team1: {
      name: "هايتي",
      logo: "https://flagcdn.com/w160/ht.png"
    },
    team2: {
      name: "اسكتلندا",
      logo: "https://flagcdn.com/w160/gb-sct.png"
    },
    team1Score: 0,
    team2Score: 1,
    dateTime: "2026-06-14T01:00:00Z",
    league: "كأس العالم 2026 - المجموعة C",
    channel: "beIN Sports HD 3",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" }
    ]
  },
  {
    id: 5,
    team1: {
      name: "أستراليا",
      logo: "https://flagcdn.com/w160/au.png"
    },
    team2: {
      name: "تركيا",
      logo: "https://flagcdn.com/w160/tr.png"
    },
    team1Score: 2,
    team2Score: 0,
    dateTime: "2026-06-14T04:00:00Z",
    league: "كأس العالم 2026 - المجموعة D",
    channel: "beIN Sports HD 2",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" }
    ]
  },
  {
    id: 6,
    team1: {
      name: "ألمانيا",
      logo: "https://flagcdn.com/w160/de.png"
    },
    team2: {
      name: "كوراساو",
      logo: "https://flagcdn.com/w160/cw.png"
    },
    team1Score: 7,
    team2Score: 1,
    dateTime: "2026-06-14T17:00:00Z",
    league: "كأس العالم 2026 - المجموعة E",
    channel: "beIN Sports HD 1",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" },
      { name: "سيرفر 3 (متعدد)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" }
    ]
  },
  {
    id: 7,
    team1: {
      name: "هولندا",
      logo: "https://flagcdn.com/w160/nl.png"
    },
    team2: {
      name: "اليابان",
      logo: "https://flagcdn.com/w160/jp.png"
    },
    team1Score: 1,
    team2Score: 1,
    dateTime: "2026-06-14T20:00:00Z",
    league: "كأس العالم 2026 - المجموعة F",
    channel: "beIN Sports HD 2",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" },
      { name: "سيرفر 3 (متعدد)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" }
    ]
  },
  {
    id: 8,
    team1: {
      name: "ساحل العاج",
      logo: "https://flagcdn.com/w160/ci.png"
    },
    team2: {
      name: "الإكوادور",
      logo: "https://flagcdn.com/w160/ec.png"
    },
    team1Score: 0,
    team2Score: 0,
    dateTime: "2026-06-14T23:00:00Z",
    league: "كأس العالم 2026 - المجموعة E",
    channel: "beIN Sports HD 3",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" }
    ]
  },

  // ===========================
  //  June 15 — يوم 15 يونيو
  // ===========================
  {
    id: 9,
    team1: {
      name: "السويد",
      logo: "https://flagcdn.com/w160/se.png"
    },
    team2: {
      name: "تونس",
      logo: "https://flagcdn.com/w160/tn.png"
    },
    team1Score: 0,
    team2Score: 0,
    dateTime: "2026-06-15T02:00:00Z",
    league: "كأس العالم 2026 - المجموعة F",
    channel: "beIN Sports HD 1",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" }
    ]
  },
  {
    id: 10,
    team1: {
      name: "إسبانيا",
      logo: "https://flagcdn.com/w160/es.png"
    },
    team2: {
      name: "الرأس الأخضر",
      logo: "https://flagcdn.com/w160/cv.png"
    },
    team1Score: 0,
    team2Score: 0,
    dateTime: "2026-06-15T16:00:00Z",
    league: "كأس لهوندوراس - المجموعة H",
    channel: "beIN Sports HD 1",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" },
      { name: "سيرفر 3 (متعدد)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" }
    ]
  },
  {
    id: 11,
    team1: {
      name: "بلجيكا",
      logo: "https://flagcdn.com/w160/be.png"
    },
    team2: {
      name: "مصر",
      logo: "https://flagcdn.com/w160/eg.png"
    },
    team1Score: 0,
    team2Score: 0,
    dateTime: "2026-06-15T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة G",
    channel: "beIN Sports HD 2",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" },
      { name: "سيرفر 3 (متعدد)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" }
    ]
  },
  {
    id: 12,
    team1: {
      name: "السعودية",
      logo: "https://flagcdn.com/w160/sa.png"
    },
    team2: {
      name: "أوروغواي",
      logo: "https://flagcdn.com/w160/uy.png"
    },
    team1Score: 0,
    team2Score: 0,
    dateTime: "2026-06-15T22:00:00Z",
    league: "كأس العالم 2026 - المجموعة H",
    channel: "beIN Sports HD 1",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" },
      { name: "سيرفر 3 (متعدد)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" }
    ]
  },

  // ===========================
  //  June 16 — يوم 16 يونيو
  // ===========================
  {
    id: 13,
    team1: {
      name: "إيران",
      logo: "https://flagcdn.com/w160/ir.png"
    },
    team2: {
      name: "نيوزيلندا",
      logo: "https://flagcdn.com/w160/nz.png"
    },
    team1Score: 0,
    team2Score: 0,
    dateTime: "2026-06-16T01:00:00Z",
    league: "كأس العالم 2026 - المجموعة G",
    channel: "beIN Sports HD 3",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" }
    ]
  },
  {
    id: 14,
    team1: {
      name: "فرنسا",
      logo: "https://flagcdn.com/w160/fr.png"
    },
    team2: {
      name: "السنغال",
      logo: "https://flagcdn.com/w160/sn.png"
    },
    team1Score: 0,
    team2Score: 0,
    dateTime: "2026-06-16T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة I",
    channel: "beIN Sports HD 1",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" },
      { name: "سيرفر 3 (متعدد)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" }
    ]
  },
  {
    id: 15,
    team1: {
      name: "العراق",
      logo: "https://flagcdn.com/w160/iq.png"
    },
    team2: {
      name: "النرويج",
      logo: "https://flagcdn.com/w160/no.png"
    },
    team1Score: 0,
    team2Score: 0,
    dateTime: "2026-06-16T22:00:00Z",
    league: "كأس العالم 2026 - المجموعة I",
    channel: "beIN Sports HD 2",
    servers: [
      { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
      { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" },
      { name: "سيرفر 3 (متعدد)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" }
    ]
  }
];
