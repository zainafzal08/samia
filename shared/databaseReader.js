import {aesjs} from "./aes-js.js";

async function decrypt(data, password) {
    if (data.algorithm !== "AES-CBC") {
        throw new Error(`Unexpected encryption algorithm: ${data.algorithm}`);
    }

    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const key = new Uint8Array(hashBuffer);
    
    const aesCtr = new aesjs.ModeOfOperation.cbc(key, Object.values(data.iv));
    const dataBytes = Uint8Array.from(atob(data.dump), c => c.charCodeAt(0));
    const decryptedBytes = aesCtr.decrypt(dataBytes);
    return aesjs.utils.utf8.fromBytes(
        decryptedBytes.filter(b => b >= 32 && b <= 126)
    );
}

export async function checkPassword(password) {
    const r = await fetch("./shared/passCheck.json");
    const passCheck = await r.json();
    return (await decrypt(passCheck.encrypted, password)) === passCheck.expected;
}

export async function getEncryptedData(password) {
    const r = await fetch("./shared/data.encrypted");
    const dataString = await decrypt(await r.json(), password);
    return JSON.parse(dataString);
}