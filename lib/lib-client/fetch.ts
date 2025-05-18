
export async function postDataToServerWithJson<T>(url: string, obj: object): Promise<T> {
    const params = {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(obj)
    }
    try {
        const res = await fetch(url, params)
        try{
            return await res.json() as T
        }
        catch(err){
            return {error: err as string} as T
        }
    }catch (err) {
        return {error: err as string} as T
    }
}

export async function getDataFromServerWithJson<T>(url: string): Promise<T> {
    const params = {
        method: 'GET',
        contentType: 'application/json',
    }
    try {
        const res = await fetch(url, params)
        try{
            return await res.json() as T
        }
        catch(err){
            return {error: err as string} as T
        }
    }catch (err) {
        return {error: err as string} as T
    }
}
