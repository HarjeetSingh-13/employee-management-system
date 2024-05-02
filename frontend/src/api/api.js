import axios from "axios";

const serverApi = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://employee-management-system-jg3t.onrender.com/api",
  withCredentials: true,
});

export const login = async (loginInfo) => {
  const requestBody = { email: loginInfo.email, password: loginInfo.password };
  const response = await serverApi.post("/employers/login", requestBody);
  console.log(response);
};

export const register = async (signupinfo) => {
  const requestBody = {
    name: signupinfo.name,
    email: signupinfo.email,
    password: signupinfo.password,
  };
  console.log(requestBody);
  return await serverApi.post("/employers/register", requestBody);
};

export const getUser = async () => {
  const response = await serverApi.get("/employers/getUser");
  return response.data;
};

export const updateUser = async (updateInfo) => {
  const requestBody = {
    name: updateInfo.name,
    phone: updateInfo.phone,
    photo: updateInfo.photo,
  };
  const response = await serverApi.patch("/employers/updateUser", requestBody);
  return response.data;
};

export const changePassword = async (changepass) => {
  const requestBody = {
    oldPassword: changepass.oldPassword,
    password: changepass.password,
  };
  return await serverApi.patch("/employers/changePassword", requestBody);
};

export const logout = async () => {
  const response = await serverApi.get("/employers/logout");
  return response;
};

export const getWorkers = async () => {
  const response = await serverApi.get("/workers/getWorker");
  return response.data;
};

export const getWorker = async (id) => {
  const response = await serverApi.get(`/workers/getWorker/${id.queryKey[1]}`);
  return response.data;
};

export const createWorker = async (worker) => {
  const requestBody = {
    name: worker.name,
    phoneNumber: worker.phoneNumber,
    age: worker.age,
    payRate: worker.salary,
    photo: worker.photo,
  };
  const response = await serverApi.post("/workers/createWorker", requestBody);
  return response.data;
};

export const updateWorker = async (updateInfo) => {
  const requestBody = {
    name: updateInfo.name,
    phoneNumber: updateInfo.phoneNumber,
    age: updateInfo.age,
    photo: updateInfo.photo,
  };
  const response = await serverApi.patch(
    `/workers/updateWorker/${updateInfo.id}`,
    requestBody
  );
  return response.data;
};

export const deleteWorker = async (id) => {
  console.log(id);
  const response = await serverApi.delete(`/workers/deleteWorker/${id}`);
  return response.data;
};

export const markAttendance = async (worker) => {
  // console.log(worker);
  const response = await serverApi.post(`/workers/markAttendance`, worker);
  return response.data;
};

export const updateAttendance = async (worker) => {
  // console.log(worker);
  const response = await serverApi.patch(`/workers/updateAttendance`, worker);
  return response.data;
};

export const financialDetails = async (id) => {
  const response = await serverApi.get(`/workers/getFinance/${id.queryKey[1]}`);
  return response.data;
};

export const addloan = async (loan) => {
  const requestBody = {
    amount: loan.amount,
    reason: loan.reason,
    date: loan.date,
  };
  console.log(requestBody, loan);
  const response = await serverApi.post(
    `/workers/addloan/${loan.id}`,
    requestBody
  );
  return response.data;
};

export const paySalary = async (paymentInfo) => {
  const requestBody = {
    amount: paymentInfo.amount,
    netSalary: paymentInfo.netSalary,
  };
  console.log(requestBody);
  const response = await serverApi.post(
    `/workers/paysalary/${paymentInfo.id}`,
    requestBody
  );
  console.log(response.data);
  return response.data;
};

export const getDashboardInfo = async () => {
  const response = await serverApi.get("/workers/getdashboardinfo");
  console.log(response.data);
  return response.data;
};
