export function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Thời gian hết hạn là `days` ngày
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/"; // Đặt cookie
}

export function getCookie(name) {
  const cookieName = name + "=";
  const cookies = document.cookie.split(";"); // Tách các cookie thành mảng
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

export function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}
export function deleteAllCookies() {
  const cookies = document.cookie.split(";"); // Lấy danh sách tất cả cookies
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=")[0].trim();
    document.cookie =
      cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Xóa từng cookie
  }
}
