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
/**
 * DeidaraTV - FIFA World Cup 2026™ Matches Data
 * ================================================
 */

const SHARED_SERVERS = [
  { name: "سيرفر 1 (رئيسي)", url: "aHR0cHM6Ly96MS5kZXBvb29vLmNvbS9hbGJhcGxheWVyL2JlaW4tMS8/c2Vydj0x" },
  { name: "سيرفر 2", url: "aHR0cHM6Ly9wNC5wYW5kYS1oZC5vbmxpbmUvYWxiYXBsYXllci9leHRyYS0x" },
  { name: "سيرفر 3 (متعدد)", url: "aHR0cHM6Ly9saXZlLmtvb3JhbjE4LmNmZC90aXN0MS9pbmRleC5tM3U4" }
];

const MATCHES_DATA = [
  // ===========================
  // الجولة الأولى (Matchday 1)
  // ===========================
  {
    id: 1,
    team1: { name: "المكسيك", logo: "https://flagcdn.com/w160/mx.png" },
    team2: { name: "جنوب أفريقيا", logo: "https://flagcdn.com/w160/za.png" },
    team1Score: 2, team2Score: 0,
    dateTime: "2026-06-11T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة A",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 2,
    team1: { name: "كوريا الجنوبية", logo: "https://flagcdn.com/w160/kr.png" },
    team2: { name: "التشيك", logo: "https://flagcdn.com/w160/cz.png" },
    team1Score: 2, team2Score: 1,
    dateTime: "2026-06-12T01:00:00Z",
    league: "كأس العالم 2026 - المجموعة A",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 3,
    team1: { name: "كندا", logo: "https://flagcdn.com/w160/ca.png" },
    team2: { name: "البوسنة والهرسك", logo: "https://flagcdn.com/w160/ba.png" },
    team1Score: 1, team2Score: 1,
    dateTime: "2026-06-12T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة B",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 4,
    team1: { name: "الولايات المتحدة", logo: "https://flagcdn.com/w160/us.png" },
    team2: { name: "باراغواي", logo: "https://flagcdn.com/w160/py.png" },
    team1Score: 4, team2Score: 1,
    dateTime: "2026-06-13T01:00:00Z",
    league: "كأس العالم 2026 - المجموعة D",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 5,
    team1: { name: "قطر", logo: "https://flagcdn.com/w160/qa.png" },
    team2: { name: "سويسرا", logo: "https://flagcdn.com/w160/ch.png" },
    team1Score: 1, team2Score: 1,
    dateTime: "2026-06-13T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة B",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 6,
    team1: { name: "البرازيل", logo: "https://flagcdn.com/w160/br.png" },
    team2: { name: "المغرب", logo: "https://flagcdn.com/w160/ma.png" },
    team1Score: 1, team2Score: 1,
    dateTime: "2026-06-13T22:00:00Z",
    league: "كأس العالم 2026 - المجموعة C",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 7,
    team1: { name: "هايتي", logo: "https://flagcdn.com/w160/ht.png" },
    team2: { name: "اسكتلندا", logo: "https://flagcdn.com/w160/gb-sct.png" },
    team1Score: 0, team2Score: 1,
    dateTime: "2026-06-14T01:00:00Z",
    league: "كأس العالم 2026 - المجموعة C",
    channel: "beIN Sports HD 3",
    servers: SHARED_SERVERS
  },
  {
    id: 8,
    team1: { name: "أستراليا", logo: "https://flagcdn.com/w160/au.png" },
    team2: { name: "تركيا", logo: "https://flagcdn.com/w160/tr.png" },
    team1Score: 2, team2Score: 0,
    dateTime: "2026-06-14T04:00:00Z",
    league: "كأس العالم 2026 - المجموعة D",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 9,
    team1: { name: "ألمانيا", logo: "https://flagcdn.com/w160/de.png" },
    team2: { name: "كوراساو", logo: "https://flagcdn.com/w160/cw.png" },
    team1Score: 7, team2Score: 1,
    dateTime: "2026-06-14T17:00:00Z",
    league: "كأس العالم 2026 - المجموعة E",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 10,
    team1: { name: "هولندا", logo: "https://flagcdn.com/w160/nl.png" },
    team2: { name: "اليابان", logo: "https://flagcdn.com/w160/jp.png" },
    team1Score: 2, team2Score: 2,
    dateTime: "2026-06-14T20:00:00Z",
    league: "كأس العالم 2026 - المجموعة F",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 11,
    team1: { name: "ساحل العاج", logo: "https://flagcdn.com/w160/ci.png" },
    team2: { name: "الإكوادور", logo: "https://flagcdn.com/w160/ec.png" },
    team1Score: 1, team2Score: 0,
    dateTime: "2026-06-14T23:00:00Z",
    league: "كأس العالم 2026 - المجموعة E",
    channel: "beIN Sports HD 3",
    servers: SHARED_SERVERS
  },
  {
    id: 12,
    team1: { name: "السويد", logo: "https://flagcdn.com/w160/se.png" },
    team2: { name: "تونس", logo: "https://flagcdn.com/w160/tn.png" },
    team1Score: 5, team2Score: 1,
    dateTime: "2026-06-15T02:00:00Z",
    league: "كأس العالم 2026 - المجموعة F",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 13,
    team1: { name: "إسبانيا", logo: "https://flagcdn.com/w160/es.png" },
    team2: { name: "الرأس الأخضر", logo: "https://flagcdn.com/w160/cv.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-15T16:00:00Z",
    league: "كأس العالم 2026 - المجموعة H",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 14,
    team1: { name: "بلجيكا", logo: "https://flagcdn.com/w160/be.png" },
    team2: { name: "مصر", logo: "https://flagcdn.com/w160/eg.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-15T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة G",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 15,
    team1: { name: "السعودية", logo: "https://flagcdn.com/w160/sa.png" },
    team2: { name: "أوروغواي", logo: "https://flagcdn.com/w160/uy.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-15T22:00:00Z",
    league: "كأس العالم 2026 - المجموعة H",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 16,
    team1: { name: "إيران", logo: "https://flagcdn.com/w160/ir.png" },
    team2: { name: "نيوزيلندا", logo: "https://flagcdn.com/w160/nz.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-16T01:00:00Z",
    league: "كأس العالم 2026 - المجموعة G",
    channel: "beIN Sports HD 3",
    servers: SHARED_SERVERS
  },
  {
    id: 17,
    team1: { name: "فرنسا", logo: "https://flagcdn.com/w160/fr.png" },
    team2: { name: "السنغال", logo: "https://flagcdn.com/w160/sn.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-16T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة I",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 18,
    team1: { name: "العراق", logo: "https://flagcdn.com/w160/iq.png" },
    team2: { name: "النرويج", logo: "https://flagcdn.com/w160/no.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-16T22:00:00Z",
    league: "كأس العالم 2026 - المجموعة I",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 19,
    team1: { name: "الأرجنتين", logo: "https://flagcdn.com/w160/ar.png" },
    team2: { name: "الجزائر", logo: "https://flagcdn.com/w160/dz.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-17T01:00:00Z",
    league: "كأس العالم 2026 - المجموعة J",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 20,
    team1: { name: "النمسا", logo: "https://flagcdn.com/w160/at.png" },
    team2: { name: "الأردن", logo: "https://flagcdn.com/w160/jo.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-17T04:00:00Z",
    league: "كأس العالم 2026 - المجموعة J",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 21,
    team1: { name: "البرتغال", logo: "https://flagcdn.com/w160/pt.png" },
    team2: { name: "الكونغو الديمقراطية", logo: "https://flagcdn.com/w160/cd.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-17T15:00:00Z",
    league: "كأس العالم 2026 - المجموعة K",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 22,
    team1: { name: "إنجلترا", logo: "https://flagcdn.com/w160/gb-eng.png" },
    team2: { name: "كرواتيا", logo: "https://flagcdn.com/w160/hr.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-17T20:00:00Z",
    league: "كأس العالم 2026 - المجموعة L",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 23,
    team1: { name: "غانا", logo: "https://flagcdn.com/w160/gh.png" },
    team2: { name: "بنما", logo: "https://flagcdn.com/w160/pa.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-11T23:00:00Z",
    league: "كأس العالم 2026 - المجموعة L",
    channel: "beIN Sports HD 3",
    servers: SHARED_SERVERS
  },
  {
    id: 24,
    team1: { name: "أوزبكستان", logo: "https://flagcdn.com/w160/uz.png" },
    team2: { name: "كولومبيا", logo: "https://flagcdn.com/w160/co.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-18T02:00:00Z",
    league: "كأس العالم 2026 - المجموعة K",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },

  // ===========================
  // الجولة الثانية (Matchday 2)
  // ===========================
  {
    id: 25,
    team1: { name: "التشيك", logo: "https://flagcdn.com/w160/cz.png" },
    team2: { name: "جنوب أفريقيا", logo: "https://flagcdn.com/w160/za.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-18T16:00:00Z",
    league: "كأس العالم 2026 - المجموعة A",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 26,
    team1: { name: "سويسرا", logo: "https://flagcdn.com/w160/ch.png" },
    team2: { name: "البوسنة والهرسك", logo: "https://flagcdn.com/w160/ba.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-18T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة B",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 27,
    team1: { name: "كندا", logo: "https://flagcdn.com/w160/ca.png" },
    team2: { name: "قطر", logo: "https://flagcdn.com/w160/qa.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-18T22:00:00Z",
    league: "كأس العالم 2026 - المجموعة B",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 28,
    team1: { name: "المكسيك", logo: "https://flagcdn.com/w160/mx.png" },
    team2: { name: "كوريا الجنوبية", logo: "https://flagcdn.com/w160/kr.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-19T01:00:00Z",
    league: "كأس العالم 2026 - المجموعة A",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 29,
    team1: { name: "الولايات المتحدة", logo: "https://flagcdn.com/w160/us.png" },
    team2: { name: "أستراليا", logo: "https://flagcdn.com/w160/au.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-19T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة D",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 30,
    team1: { name: "اسكتلندا", logo: "https://flagcdn.com/w160/gb-sct.png" },
    team2: { name: "المغرب", logo: "https://flagcdn.com/w160/ma.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-19T22:00:00Z",
    league: "كأس العالم 2026 - المجموعة C",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 31,
    team1: { name: "البرازيل", logo: "https://flagcdn.com/w160/br.png" },
    team2: { name: "هايتي", logo: "https://flagcdn.com/w160/ht.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-20T00:30:00Z",
    league: "كأس العالم 2026 - المجموعة C",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 32,
    team1: { name: "تركيا", logo: "https://flagcdn.com/w160/tr.png" },
    team2: { name: "باراغواي", logo: "https://flagcdn.com/w160/py.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-20T03:00:00Z",
    league: "كأس العالم 2026 - المجموعة D",
    channel: "beIN Sports HD 3",
    servers: SHARED_SERVERS
  },
  {
    id: 33,
    team1: { name: "هولندا", logo: "https://flagcdn.com/w160/nl.png" },
    team2: { name: "السويد", logo: "https://flagcdn.com/w160/se.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-20T17:00:00Z",
    league: "كأس العالم 2026 - المجموعة F",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 34,
    team1: { name: "ألمانيا", logo: "https://flagcdn.com/w160/de.png" },
    team2: { name: "ساحل العاج", logo: "https://flagcdn.com/w160/ci.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-20T20:00:00Z",
    league: "كأس العالم 2026 - المجموعة E",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 35,
    team1: { name: "الإكوادور", logo: "https://flagcdn.com/w160/ec.png" },
    team2: { name: "كوراساو", logo: "https://flagcdn.com/w160/cw.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-21T00:00:00Z",
    league: "كأس العالم 2026 - المجموعة E",
    channel: "beIN Sports HD 3",
    servers: SHARED_SERVERS
  },
  {
    id: 36,
    team1: { name: "تونس", logo: "https://flagcdn.com/w160/tn.png" },
    team2: { name: "اليابان", logo: "https://flagcdn.com/w160/jp.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-21T04:00:00Z",
    league: "كأس العالم 2026 - المجموعة F",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 37,
    team1: { name: "إسبانيا", logo: "https://flagcdn.com/w160/es.png" },
    team2: { name: "السعودية", logo: "https://flagcdn.com/w160/sa.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-21T16:00:00Z",
    league: "كأس العالم 2026 - المجموعة H",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 38,
    team1: { name: "بلجيكا", logo: "https://flagcdn.com/w160/be.png" },
    team2: { name: "إيران", logo: "https://flagcdn.com/w160/ir.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-21T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة G",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 39,
    team1: { name: "أوروغواي", logo: "https://flagcdn.com/w160/uy.png" },
    team2: { name: "الرأس الأخضر", logo: "https://flagcdn.com/w160/cv.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-21T22:00:00Z",
    league: "كأس العالم 2026 - المجموعة H",
    channel: "beIN Sports HD 3",
    servers: SHARED_SERVERS
  },
  {
    id: 40,
    team1: { name: "نيوزيلندا", logo: "https://flagcdn.com/w160/nz.png" },
    team2: { name: "مصر", logo: "https://flagcdn.com/w160/eg.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-22T01:00:00Z",
    league: "كأس العالم 2026 - المجموعة G",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 41,
    team1: { name: "الأرجنتين", logo: "https://flagcdn.com/w160/ar.png" },
    team2: { name: "النمسا", logo: "https://flagcdn.com/w160/at.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-22T17:00:00Z",
    league: "كأس العالم 2026 - المجموعة J",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 42,
    team1: { name: "فرنسا", logo: "https://flagcdn.com/w160/fr.png" },
    team2: { name: "العراق", logo: "https://flagcdn.com/w160/iq.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-22T21:00:00Z",
    league: "كأس العالم 2026 - المجموعة I",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 43,
    team1: { name: "النرويج", logo: "https://flagcdn.com/w160/no.png" },
    team2: { name: "السنغال", logo: "https://flagcdn.com/w160/sn.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-23T00:00:00Z",
    league: "كأس العالم 2026 - المجموعة I",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 44,
    team1: { name: "الأردن", logo: "https://flagcdn.com/w160/jo.png" },
    team2: { name: "الجزائر", logo: "https://flagcdn.com/w160/dz.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-23T03:00:00Z",
    league: "كأس العالم 2026 - المجموعة J",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 45,
    team1: { name: "البرتغال", logo: "https://flagcdn.com/w160/pt.png" },
    team2: { name: "أوزبكستان", logo: "https://flagcdn.com/w160/uz.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-23T17:00:00Z",
    league: "كأس العالم 2026 - المجموعة K",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 46,
    team1: { name: "إنجلترا", logo: "https://flagcdn.com/w160/gb-eng.png" },
    team2: { name: "غانا", logo: "https://flagcdn.com/w160/gh.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-23T20:00:00Z",
    league: "كأس العالم 2026 - المجموعة L",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 47,
    team1: { name: "بنما", logo: "https://flagcdn.com/w160/pa.png" },
    team2: { name: "كرواتيا", logo: "https://flagcdn.com/w160/hr.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-23T23:00:00Z",
    league: "كأس العالم 2026 - المجموعة L",
    channel: "beIN Sports HD 3",
    servers: SHARED_SERVERS
  },
  {
    id: 48,
    team1: { name: "كولومبيا", logo: "https://flagcdn.com/w160/co.png" },
    team2: { name: "الكونغو الديمقراطية", logo: "https://flagcdn.com/w160/cd.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-24T02:00:00Z",
    league: "كأس العالم 2026 - المجموعة K",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },

  // ===========================
  // الجولة الثالثة (Matchday 3)
  // ===========================
  {
    id: 49,
    team1: { name: "سويسرا", logo: "https://flagcdn.com/w160/ch.png" },
    team2: { name: "كندا", logo: "https://flagcdn.com/w160/ca.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-24T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة B",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 50,
    team1: { name: "البوسنة والهرسك", logo: "https://flagcdn.com/w160/ba.png" },
    team2: { name: "قطر", logo: "https://flagcdn.com/w160/qa.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-24T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة B",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 51,
    team1: { name: "اسكتلندا", logo: "https://flagcdn.com/w160/gb-sct.png" },
    team2: { name: "البرازيل", logo: "https://flagcdn.com/w160/br.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-24T22:00:00Z",
    league: "كأس العالم 2026 - المجموعة C",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 52,
    team1: { name: "المغرب", logo: "https://flagcdn.com/w160/ma.png" },
    team2: { name: "هايتي", logo: "https://flagcdn.com/w160/ht.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-24T22:00:00Z",
    league: "كأس العالم 2026 - المجموعة C",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 53,
    team1: { name: "التشيك", logo: "https://flagcdn.com/w160/cz.png" },
    team2: { name: "المكسيك", logo: "https://flagcdn.com/w160/mx.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-25T01:00:00Z",
    league: "كأس العالم 2026 - المجموعة A",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 54,
    team1: { name: "جنوب أفريقيا", logo: "https://flagcdn.com/w160/za.png" },
    team2: { name: "كوريا الجنوبية", logo: "https://flagcdn.com/w160/kr.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-25T01:00:00Z",
    league: "كأس العالم 2026 - المجموعة A",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 55,
    team1: { name: "الإكوادور", logo: "https://flagcdn.com/w160/ec.png" },
    team2: { name: "ألمانيا", logo: "https://flagcdn.com/w160/de.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-25T20:00:00Z",
    league: "كأس العالم 2026 - المجموعة E",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 56,
    team1: { name: "كوراساو", logo: "https://flagcdn.com/w160/cw.png" },
    team2: { name: "ساحل العاج", logo: "https://flagcdn.com/w160/ci.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-25T20:00:00Z",
    league: "كأس العالم 2026 - المجموعة E",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 57,
    team1: { name: "تونس", logo: "https://flagcdn.com/w160/tn.png" },
    team2: { name: "هولندا", logo: "https://flagcdn.com/w160/nl.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-25T23:00:00Z",
    league: "كأس العالم 2026 - المجموعة F",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 58,
    team1: { name: "اليابان", logo: "https://flagcdn.com/w160/jp.png" },
    team2: { name: "السويد", logo: "https://flagcdn.com/w160/se.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-25T23:00:00Z",
    league: "كأس العالم 2026 - المجموعة F",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 59,
    team1: { name: "تركيا", logo: "https://flagcdn.com/w160/tr.png" },
    team2: { name: "الولايات المتحدة", logo: "https://flagcdn.com/w160/us.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-26T02:00:00Z",
    league: "كأس العالم 2026 - المجموعة D",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 60,
    team1: { name: "باراغواي", logo: "https://flagcdn.com/w160/py.png" },
    team2: { name: "أستراليا", logo: "https://flagcdn.com/w160/au.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-26T02:00:00Z",
    league: "كأس العالم 2026 - المجموعة D",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 61,
    team1: { name: "النرويج", logo: "https://flagcdn.com/w160/no.png" },
    team2: { name: "فرنسا", logo: "https://flagcdn.com/w160/fr.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-26T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة I",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 62,
    team1: { name: "السنغال", logo: "https://flagcdn.com/w160/sn.png" },
    team2: { name: "العراق", logo: "https://flagcdn.com/w160/iq.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-26T19:00:00Z",
    league: "كأس العالم 2026 - المجموعة I",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 63,
    team1: { name: "أوروغواي", logo: "https://flagcdn.com/w160/uy.png" },
    team2: { name: "إسبانيا", logo: "https://flagcdn.com/w160/es.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-27T00:00:00Z",
    league: "كأس العالم 2026 - المجموعة H",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 64,
    team1: { name: "الرأس الأخضر", logo: "https://flagcdn.com/w160/cv.png" },
    team2: { name: "السعودية", logo: "https://flagcdn.com/w160/sa.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-27T00:00:00Z",
    league: "كأس العالم 2026 - المجموعة H",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 65,
    team1: { name: "نيوزيلندا", logo: "https://flagcdn.com/w160/nz.png" },
    team2: { name: "بلجيكا", logo: "https://flagcdn.com/w160/be.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-27T03:00:00Z",
    league: "كأس العالم 2026 - المجموعة G",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 66,
    team1: { name: "مصر", logo: "https://flagcdn.com/w160/eg.png" },
    team2: { name: "إيران", logo: "https://flagcdn.com/w160/ir.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-27T03:00:00Z",
    league: "كأس العالم 2026 - المجموعة G",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 67,
    team1: { name: "بنما", logo: "https://flagcdn.com/w160/pa.png" },
    team2: { name: "إنجلترا", logo: "https://flagcdn.com/w160/gb-eng.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-27T21:00:00Z",
    league: "كأس العالم 2026 - المجموعة L",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 68,
    team1: { name: "كرواتيا", logo: "https://flagcdn.com/w160/hr.png" },
    team2: { name: "غانا", logo: "https://flagcdn.com/w160/gh.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-27T21:00:00Z",
    league: "كأس العالم 2026 - المجموعة L",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 69,
    team1: { name: "كولومبيا", logo: "https://flagcdn.com/w160/co.png" },
    team2: { name: "البرتغال", logo: "https://flagcdn.com/w160/pt.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-27T23:30:00Z",
    league: "كأس العالم 2026 - المجموعة K",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 70,
    team1: { name: "الكونغو الديمقراطية", logo: "https://flagcdn.com/w160/cd.png" },
    team2: { name: "أوزبكستان", logo: "https://flagcdn.com/w160/uz.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-27T23:30:00Z",
    league: "كأس العالم 2026 - المجموعة K",
    channel: "beIN Sports HD 2",
    servers: SHARED_SERVERS
  },
  {
    id: 71,
    team1: { name: "الأردن", logo: "https://flagcdn.com/w160/jo.png" },
    team2: { name: "الأرجنتين", logo: "https://flagcdn.com/w160/ar.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-28T02:00:00Z",
    league: "كأس العالم 2026 - المجموعة J",
    channel: "beIN Sports HD 1",
    servers: SHARED_SERVERS
  },
  {
    id: 72,
    team1: { name: "الجزائر", logo: "https://flagcdn.com/w160/dz.png" },
    team2: { name: "النمسا", logo: "https://flagcdn.com/w160/at.png" },
    team1Score: 0, team2Score: 0,
    dateTime: "2026-06-28T02:00:00Z",
    league: "كأس العالم 2026 - المجموعة J",
    channel: "beIN Sports HD 2",
  }
];

const BLOGS_DATA = [
  {
    id: 1,
    title: "موعد مباريات اليوم بث مباشر كأس العالم 2026 والقنوات الناقلة كورة لايف",
    slug: "world-cup-2026-today-matches-schedule-koora-live",
    meta_description: "تعرف على جدول مواعيد مباريات اليوم في بطولة كأس العالم 2026 والقنوات الناقلة لها. تابع التغطية الحية والبث المباشر بدون تقطيع على كورة لايف koora live وديدارا تي في.",
    image_url: "https://deidaratv.live/imgs/cover.jpg",
    created_at: "2026-07-02T08:00:00Z"
  },
  {
    id: 2,
    title: "كيفية مشاهدة البث المباشر لمباريات اليوم بدون تقطيع - دليل كورة لايف",
    slug: "how-to-watch-live-matches-without-cutting-kora-live",
    meta_description: "دليلك الشامل لتشغيل البث المباشر للمباريات بجودة عالية وبدون تقطيع. تعرف على كيفية اختيار السيرفرات السريعة ومتابعة كورة لايف koora live مجاناً.",
    image_url: "https://deidaratv.live/imgs/cover.jpg",
    created_at: "2026-07-01T15:30:00Z"
  },
  {
    id: 3,
    title: "أفضل مواقع بث مباشر للمباريات 2026: ديدارا تي في في الصدارة",
    slug: "best-live-streaming-sites-2026-deidaratv",
    meta_description: "مقارنة شاملة لأفضل مواقع البث المباشر للمباريات وكورة لايف. لماذا يعتبر موقع ديدارا تي في Deidara TV الخيار الأول لعشاق الرياضة العربية؟",
    image_url: "https://deidaratv.live/imgs/cover.jpg",
    created_at: "2026-06-30T12:00:00Z"
  }
];