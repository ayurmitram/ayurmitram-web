const baseUrl = "http://localhost:8000";

export const signup_doctor = async(obj) => {
    const res = await fetch(`${baseUrl}/api/doctor/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    const ans = await res.json();
    return ans;
}

export const login_doctor = async(obj) => {
    const res = await fetch(`${baseUrl}/api/doctor/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    const ans = await res.json();
    return ans;
}

export const auth_doctor = async(obj) => {
    const res = await fetch(`${baseUrl}/api/doctor/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    const ans = await res.json();
    return ans;
}

export const get_all_doctors = async(obj) => {
    const res = await fetch(`${baseUrl}/api/doctor/alldoctors`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    const ans = await res.json();
    return ans;
}