import service from "@/http/request"


function b64encrypt(plaintext) {
    const b64Text = btoa(plaintext)
    let result = ""
    for (const char of b64Text) {
        result += (btoa(char)).slice(0, 2);
    }
    return result
}

function b64decrypt(inputString) {
    let splitString = [];
    for (let i = 0; i < inputString.length; i += 2) {
        const chunk = inputString.slice(i, i + 2);
        splitString.push(atob(chunk + "=="));
    }
    splitString = splitString.join("")
    console.log(atob(splitString))
}

export function heroData() {
    const plaintext = "https://daluandou.cn/" + "@" + new Date().getTime().toString();
    let result = b64encrypt(plaintext)
    return service({
        method: "POST",
        url: "api/lol/heroes",
        data: {"dld": result},
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}