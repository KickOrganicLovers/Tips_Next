import {ErrorScheme} from "@/types";

export async function postDataToServerWithJson<T>(url: string, obj: object): Promise<T | null> {
    const params = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }
    try {
        const res = await fetch(url, params)
        let json
        try{
            json = await res.json()
        }catch{
            throw {message: '無効なJSONデータです。', code: 'INVALID_JSON'}
        }
        if(!res.ok){
            throw {message: json.error?.message || '不明なエラー', code: json.error?.code || 'UNKNOWN_ERROR' }
        }

        console.log('wtf')

        if(!!json){
            const {error, ...jsonWithOutError} = json
            return jsonWithOutError as T
        }
        return null
    }catch (error) {
        if (error instanceof TypeError) {
            console.log(error)
            throw { message: 'ネットワークエラーが発生しました。', code: 'NETWORK_ERROR' } as ErrorScheme
        }
        throw error as ErrorScheme
    }
}

export async function getDataFromServerWithJson<T>(url: string): Promise<T | null> {
    const params = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }
    try {
        const res = await fetch(url, params)
        let json
        try{
            json = await res.json()
        }catch{
            throw {message: '無効なJSONデータです。', code: 'INVALID_JSON'}
        }
        if(!res.ok){
            throw {message: json.error?.message || '不明なエラー', code: json.error?.code || 'UNKNOWN_ERROR' }
        }


        if(!!json){
            const {error, ...jsonWithOutError} = json
            return jsonWithOutError as T
        }
        return null
    }catch (error) {
        if (error instanceof TypeError) {
            console.log(error)
            throw { message: 'ネットワークエラーが発生しました。', code: 'NETWORK_ERROR' } as ErrorScheme
        }
        throw error as ErrorScheme
    }
}
