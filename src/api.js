// library/utility functions - has all interface with apis

//can take id to give one van/not and gets all vans
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
