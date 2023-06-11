import service from "@/http/request"
import {website} from "@/http/request";


export function heroData() {
    return service({
        method: "GET",
        url: "api/lol/heroes",
        headers: {authorization: 'Darker'}
    })
}