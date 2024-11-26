const API = "http://localhost:8080/";
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Hàm GET
export const get = async (path) => {
  try {
    const response = await fetch(API + path, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in GET request:", error.message);
    throw error;
  }
};

// Hàm POST
export const post = async (path, data) => {
  try {
    const response = await fetch(API + path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error("Error in POST request:", error.message);

    throw error;
  }
};


export const fetchWithAuth = async (
  path,
  method = "GET",
  body = null,
  additionalHeaders = {}
) => {
  // Lấy thông tin đăng nhập từ localStorage hoặc cookie
  let username = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  if (!username || !password) {
    console.warn("Không tìm thấy thông tin đăng nhập trong localStorage. Kiểm tra cookie...");
    username = getCookie("username");
    password = getCookie("password");
  }

  if (!username || !password) {
    throw new Error("Thông tin đăng nhập không hợp lệ.");
  }

  // Tạo header Authorization
  const authHeader = "Basic " + btoa(`${username}:${password}`);

  // Headers mặc định
  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    ...additionalHeaders, // Headers bổ sung
  };

  // Cấu hình yêu cầu
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  try {
    // Gửi yêu cầu đến API
    const response = await fetch(`http://localhost:8080${path}`, options);

    // Kiểm tra trạng thái HTTP
    if (!response.ok) {
      let errorData = { message: "Đã xảy ra lỗi không xác định.", statusCode: response.status };

      // Thử parse JSON nếu phản hồi lỗi có nội dung
      try {
        const errorText = await response.text();
        if (errorText) {
          const errorJson = JSON.parse(errorText);
          errorData = { ...errorData, ...errorJson }; // Kết hợp với lỗi từ backend
        }
      } catch (e) {
        console.warn("Không thể parse lỗi từ backend:", e.message);
      }

      // Ném lỗi với cấu trúc tương tự Axios
      throw { response: { data: errorData } };
    }

    // Xử lý phản hồi rỗng
    const responseText = await response.text();
    if (!responseText || response.status === 204) {
      console.warn("Phản hồi rỗng từ API.");
      return null;
    }

    // Trả về JSON nếu phản hồi có nội dung
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Lỗi khi gọi API:", error.message);
    throw error;
  }
};




export const register = async (options) => {
  try {
    const response = await fetch(`${API}api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    return await response.json(); // Phân tích dữ liệu JSON từ phản hồi
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu đăng ký:", error.message);
    throw error; // Ném lỗi ra ngoài để xử lý
  }
};

// Hàm PUT
export const put = async (path, data) => {
  try {
    const response = await fetch(API + path, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in PUT request:", error.message);
    throw error;
  }
};

// Hàm DELETE
export const remove = async (path) => {
  try {
    const response = await fetch(API + path, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in DELETE request:", error.message);
    throw error;
  }
};
