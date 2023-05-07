// library/utility functions - has all interface with apis
export async function getVans(){
    const res = await fetch("/api/vans")
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
