import { get, post } from "../ultils/request";
import { fetchWithAuth } from "../ultils/request";


export const login = async (username, password) => {
  const payload = {
    username,
    password,
  };
  const result = await post("api/auth/login", payload);
  return result;
};
export const register = async (formData) => {
  try {
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Đảm bảo phản hồi được xử lý dưới dạng JSON
    const result = await response.text();
    return result;
  } catch (error) {
    console.error("Error in register function:", error.message);
    throw error;
  }
};

// export const register = async (options) => {
//   const result = await post("api/auth/register", options);
//   return result;
// };

export const checkExit = async (key, value) => {
  const result = await post(`api/auth/register?${key}=${value}`);
  return result;
};



export const getAllEmployees = async () => {
  return await fetchWithAuth("/api/employees");
};

export const addEmployee = async (employee) => {
  return await fetchWithAuth("/api/employees", "POST", employee);
};

export const updateEmployee = async (employeeId, employee) => {
  return await fetchWithAuth(`/api/employees/${employeeId}`, "PUT", employee);
};

export const deleteEmployee = async (employeeId) => {
  return await fetchWithAuth(`/api/employees/${employeeId}`, "DELETE");
};