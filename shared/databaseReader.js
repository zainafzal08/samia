function decrypt(data, password) {
    // TODO.
}

export async function checkPassword(password) {
    return true;
    
    const r = await fetch("./passCheck.json");
    const passCheck = await r.json();
    return decrypt(passCheck.encrypted, password) === passCheck.expected;
}