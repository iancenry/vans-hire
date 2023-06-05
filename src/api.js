export async function getVans(id){
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if(!res.ok) {
        const errorObject = {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
        
        throw errorObject
    }
    const data = await res.json()
    return data.vans
}


export async function getHostVans(id){
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if(!res.ok) {
        const errorObject = {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
        
        throw errorObject
    }
    const data = await res.json()
    return data.vans
}

