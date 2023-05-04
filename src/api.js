// file containes all library/utility funcs - has all interface with api

export async function getVans(){
    const res = await fetch("/api/vans")
    if(!res.ok) {
        const errObj = {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
        
        throw errObj
    }
    const data = await res.json()
    return data.vans
}
