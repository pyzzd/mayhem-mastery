
import service from "@/http/request";



export function heroData() {
    const plaintext = "https://daluandou.cn/" + "@" + new Date().getTime().toString();
    return service({
        method: "POST",
        url: "api/aram/balances",
        data: {"dld": window.b64encrypt(plaintext)},
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export function lastUpdateTime() {
    return service({
        method: "GET",
        url: "api/aram/lastUpdateTime",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}