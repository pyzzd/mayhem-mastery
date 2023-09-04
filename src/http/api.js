import service from "@/http/request"


export function heroData() {
    const plaintext = "https://daluandou.cn/" + "@" + new Date().getTime().toString();
    return service({
        method: "POST",
        url: "api/lol/heroes",
        data: {"dld": window.b64encrypt(plaintext)},
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}