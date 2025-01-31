import axios from "axios";

const urlapi = "https://gsus.onrender.com";

export const addTransaction = async (transaction) => {
    try {
        const response = await axios.post(`${urlapi}/addtransaction`, transaction);
        return response.data;
    } catch (error) {
        return { error: "Error adding transaction" };
    }
}

export const getTransactions = async () => {
    try {
        const response = await axios.get(`${urlapi}/transactions`);
        return response.data;
    } catch (error) {
        return { error: "Error getting transactions" };
    }
}

export const getReports = async () => {
    try {
        const response = await axios.post(`${urlapi}/reports`);
        return response.data;
    } catch (error) {
        return { error: "Error generating report" };
    }
}

export const deleteTransaction = async (id) => {
    try {
        const response = await axios.delete(`${urlapi}/deletetransaction/${id}`);
        return response.data;
    } catch (error) {
        return { error: "Error deleting transaction" };
    }
}

export const getRecentTransactions = async () => {
    try {
        const response = await axios.get(`${urlapi}/recenttransactions`);
        return response.data;
    } catch (error) {
        return { error: "Error getting recent transactions" };
    }
}

export const parseSMS = async (sms) => {
    try {
        const response = await axios.post(`${urlapi}/parse-sms`, { sms });
        return response.data;
    } catch (error) {
        return { error: "Error parsing SMS" };
    }
}

export const signup = async (user) => {
    try {
        const response = await axios.post(`${urlapi}/signup`, user);
        return response.data;
    } catch (error) {
        return { error: "Error signing up" };
    }
}

export const login = async (user) => {
    try {
        const response = await axios.post(`${urlapi}/login`, user);
        return response.data;
    } catch (error) {
        return { error: "Error logging in" };
    }
}


