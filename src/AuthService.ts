
export class LoginService{

    private endpoint = 'http://localhost:8030/authenticate';

    public login(username:string, password: string): Promise<any> {

        return fetch(this.endpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({username, password})
        }).then(response => {

            const headers = response.headers.get('set-cookie');

            console.log(headers);

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
}