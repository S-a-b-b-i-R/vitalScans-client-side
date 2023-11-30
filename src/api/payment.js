import axios from "axios";

export const getPaymentsBySearchString = async (searchString) => {
    const queryString = searchString ? searchString : "null";
    const response = await axios.get(
        `https://vitalscan-server.vercel.app/searchpayment/${queryString}`
    );
    const data = await response.data;
    return data;
};
