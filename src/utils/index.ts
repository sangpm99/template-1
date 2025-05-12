export const openNewTab = (url: string) => {
  const validUrl = new URL(url);
  window.open(validUrl.href, "_blank");
};

export const navigateNewTab = (url: string) => {
  window.open(url, "_blank");
};

export const downloadFile = (url: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = "url.ext";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const getTimeNow = (format?: string) => {
  if (format === "seconds") {
    return Math.floor(new Date().getTime() / 1000);
  }
  return new Date().getTime();
};

export const getTimeStamp = (date: string) => {
  return new Date(date).getTime();
};

export const getDateFromTimeStamp = (timestamp: number) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatTimestampToDate = (
  timestamp: number | null,
): string | null => {
  if (!timestamp || Number.isNaN(timestamp)) return null;
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const randomAvatarColor = () => {
  const colorArr: string[] = [
    "success",
    "error",
    "info",
    "warning",
    "primary",
    "teal",
    "purple",
    "indigo",
  ];

  const random = (color: string[]): string => {
    const randomIndex = Math.floor(Math.random() * color.length);

    return color[randomIndex];
  };

  return { color: random(colorArr) };
};

export const AvatarColorInOrder = (order: number): string => {
  const colorArr: string[] = [
    "success",
    "error",
    "info",
    "warning",
    "primary",
    "teal",
    "purple",
    "indigo",
  ];
  return colorArr[order % colorArr.length];
};

export function getFirstTwoWords(str: string) {
  return str.split(" ").slice(0, 2).join(" ");
}

export const formatNumberWithCommas = (value: any): string => {
  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return value.toLocaleString("en-US");
    } else {
      return Number(value).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  } else {
    return value;
  }
};

export const calNumByDiscount = (discount: number, origin: number) => {
  if (discount < 0 || discount > 100) return 0;
  return Number((origin * (1 - Number(discount) / 100)).toFixed(2));
};

export const calDiscountByNum = (num: number, origin: number) => {
  return Math.round(((origin - Number(num)) / origin) * 100);
};

// Fingerprint
export const id = (): string | null => {
  const {
    cookieEnabled: e,
    deviceMemory: t,
    doNotTrack: r,
    hardwareConcurrency: a,
    language: i,
    languages: o,
    maxTouchPoints: n,
    platform: c,
    userAgent: l,
    vendor: h,
  } = window.navigator;

  const { width: w, height: d, colorDepth: f, pixelDepth: s } = window.screen;

  return crc(
    JSON.stringify({
      colorDepth: f,
      cookieEnabled: e,
      deviceMemory: t,
      devicePixelRatio: window.devicePixelRatio,
      doNotTrack: r,
      hardwareConcurrency: a,
      height: d,
      width: w,
      language: i,
      languages: o,
      maxTouchPoints: n,
      pixelDepth: s,
      platform: c,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      touchSupport: "ontouchstart" in window,
      userAgent: l,
      vendor: h,
      canvas: canvas(),
    }),
  ).toString();
};
export const canvas = () => {
  try {
    const e = document.createElement("canvas");
    const t = e.getContext("2d");

    const r =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?";

    if (t === null) return;
    (t.textBaseline = "top"),
      (t.font = "14px 'Arial'"),
      (t.textBaseline = "alphabetic"),
      (t.fillStyle = "#f60"),
      t.fillRect(125, 1, 62, 20),
      (t.fillStyle = "#069"),
      t.fillText(r, 2, 15),
      (t.fillStyle = "rgba(102, 204, 0, 0.7)"),
      t.fillText(r, 4, 17);

    const a = e.toDataURL();

    return t.clearRect(0, 0, e.width, e.height), crc(a);
  } catch {
    return null;
  }
};
export const crc = (e: string): number => {
  const t = 3 & e.length;
  const r = e.length - t;
  let a = 0;
  let i;
  let o;
  for (let n = 0; n < r; n++) {
    (o =
      (255 & e.charCodeAt(n)) |
      ((255 & e.charCodeAt(++n)) << 8) |
      ((255 & e.charCodeAt(++n)) << 16) |
      ((255 & e.charCodeAt(++n)) << 24)),
      ++n,
      (a ^= o =
        ((65535 &
          (o =
            ((o =
              ((65535 & o) * 3432918353 +
                ((((o >>> 16) * 3432918353) & 65535) << 16)) &
              4294967295) <<
              15) |
            (o >>> 17))) *
          461845907 +
          ((((o >>> 16) * 461845907) & 65535) << 16)) &
        4294967295),
      (a =
        (65535 &
          (i =
            ((65535 & (a = (a << 13) | (a >>> 19))) * 5 +
              ((((a >>> 16) * 5) & 65535) << 16)) &
            4294967295)) +
        27492 +
        ((((i >>> 16) + 58964) & 65535) << 16));
  }
  const c = r - 1;
  switch (((o = 0), t)) {
    case 3:
      o ^= (255 & e.charCodeAt(c + 2)) << 16;
      break;
    case 2:
      o ^= (255 & e.charCodeAt(c + 1)) << 8;
      break;
    case 1:
      o ^= 255 & e.charCodeAt(c);
  }

  return (
    (a ^= o =
      ((65535 &
        (o =
          ((o =
            ((65535 & o) * 3432918353 +
              ((((o >>> 16) * 3432918353) & 65535) << 16)) &
            4294967295) <<
            15) |
          (o >>> 17))) *
        461845907 +
        ((((o >>> 16) * 461845907) & 65535) << 16)) &
      4294967295),
    (a ^= e.length),
    (a ^= a >>> 16),
    (a =
      ((65535 & a) * 2246822507 + ((((a >>> 16) * 2246822507) & 65535) << 16)) &
      4294967295),
    (a ^= a >>> 13),
    (a =
      ((65535 & a) * 3266489909 + ((((a >>> 16) * 3266489909) & 65535) << 16)) &
      4294967295),
    (a ^= a >>> 16) >>> 0
  );
};

export const getOriginalCoordinates = (
  xPrime: number,
  yPrime: number,
  alpha: number,
  centerX: number,
  centerY: number,
) => {
  const radians = (Math.PI / 180) * alpha;
  const x =
    centerX +
    (xPrime - centerX) * Math.cos(-radians) -
    (yPrime - centerY) * Math.sin(-radians);
  const y =
    centerY +
    (xPrime - centerX) * Math.sin(-radians) +
    (yPrime - centerY) * Math.cos(-radians);

  return { x, y };
};

export const calculatePosition = (
  renderWith: number,
  renderHeight: number,
  oWidth: number,
  oHeight: number,
  left: number,
  top: number,
  width: number,
  height: number,
  angle: number,
  cX: number,
  cY: number,
) => {
  const { x, y } = getOriginalCoordinates(left, top, angle, cX, cY);
  return {
    left: (renderWith * x) / oWidth,
    top: (renderHeight * y) / oHeight,
    width: (renderWith * width) / oWidth,
    height: (renderHeight * height) / oHeight,
    angle: angle,
  };
};

export const arrayToBase64URL = (array: Uint8Array) => {
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const generateCodeVerifier = () => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return arrayToBase64URL(array);
};

export const generateCodeChallenge = async (codeVerifier: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hash = await window.crypto.subtle.digest("SHA-256", data);
  return arrayToBase64URL(new Uint8Array(hash));
};

export const generateStateCode = () => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
};

export const resolveAcceptFileType = (types: string, file: File): boolean => {
  return types.split(",").some((type) => {
    switch (type.trim()) {
      case ".jpg":
      case ".jpeg":
        return file.type === "image/jpeg";
      case ".png":
        return file.type === "image/png";
      case ".gif":
        return file.type === "image/gif";
      case ".tiff":
        return file.type === "image/tiff";
      case ".webp":
        return file.type === "image/webp";
      case ".zip":
        return (
          file.type === "application/zip" ||
          file.type === "application/x-zip-compressed"
        );
      case ".rar":
        return file.type === "application/x-rar-compressed";
      case ".xml":
        return file.type === "application/xml" || file.type === "text/xml";
      case ".json":
        return file.type === "application/json";
      case ".csv":
        return file.type === "text/csv";
      case ".xlsx":
        return (
          file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
      case ".mp3":
        return file.type === "audio/mpeg";
      case ".mp4":
        return file.type === "video/mp4";
      case ".mov":
        return file.type === "video/quicktime";
      default:
        return false;
    }
  });
};
