const baseUrl = "http://localhost:8000";

export const login_common = async(obj) => {
    const res = await fetch(`${baseUrl}/api/login/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    const ans = await res.json();
    return ans;
}
