import service from "@/http/request"

export function heroData() {
    return service({
        method: "GET",
        url: "api/lol/heroes"
    })
}