(async () => {
    try {
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admincenter', password: 'admin123' })
        });
        const token = (await loginRes.json()).token;
    
        const Boundary = '----WebKitFormBoundary';
        let data = '--' + Boundary + '\r\n';
        data += 'Content-Disposition: form-data; name="name"\r\n\r\nTest\r\n';
        data += '--' + Boundary + '\r\n';
        data += 'Content-Disposition: form-data; name="brand"\r\n\r\nBrand\r\n';
        data += '--' + Boundary + '\r\n';
        data += 'Content-Disposition: form-data; name="category"\r\n\r\nmen\r\n';
        data += '--' + Boundary + '\r\n';
        data += 'Content-Disposition: form-data; name="price"\r\n\r\n100\r\n';
        data += '--' + Boundary + '\r\n';
        data += 'Content-Disposition: form-data; name="originalPrice"\r\n\r\n200\r\n';
        data += '--' + Boundary + '\r\n';
        data += 'Content-Disposition: form-data; name="tags"\r\n\r\ntrending, new\r\n'; 
        data += '--' + Boundary + '--\r\n';
    
        const res = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'multipart/form-data; boundary=' + Boundary },
            body: data
        });
        console.log(await res.json());
    } catch(e) {
        console.error(e);
    }
})();
