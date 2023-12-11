const baseUrl = "http://localhost:8000";

export const signup_patient = async(obj) => {
    const res = await fetch(`${baseUrl}/api/patient/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    const ans = await res.json();
    return ans;
}

export const login_patient = async(obj) => {
    const res = await fetch(`${baseUrl}/api/patient/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    const ans = await res.json();
    return ans;
}

export const auth_patient = async(obj) => {
    const res = await fetch(`${baseUrl}/api/patient/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    const ans = await res.json();
    return ans;
}