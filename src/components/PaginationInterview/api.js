const API = "https://dummyjson.com/products?limit=5";

export const getProducts = async () => {
    try {
        const response = await fetch(API);
        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Response failed!")
        }
    } catch (err) {
        console.error(err);
    }
}