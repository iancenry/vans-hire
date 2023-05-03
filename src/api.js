// file containes all library/utility funcs - has all interface with api

export async function getVans(){
    const res = await fetch("/api/vans")
    if(!res.ok) {
        throw Error({
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        })
    }
    const data = await res.json()
    return data.vans
}

//5:03:13