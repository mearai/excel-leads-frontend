const fetchAPI = async (url, method = 'GET', data = null) => {
    let options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include', // Send cookies along with the request
    };

    if (method === 'GET') {
        // Append query parameters to the URL
        if (data) {
            const queryParams = new URLSearchParams(data).toString();
            url += `?${queryParams}`;
        }
    } else {
        // For other methods, include parameters in the request body
        options.body = data ? JSON.stringify(data) : null;
    }

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, options);
        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message || 'Something went wrong');
        }

        return responseData;
    } catch (error) {
        throw error;
    }
};

export default fetchAPI;
