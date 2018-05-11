
export class LoginService{

    private endpoint = 'http://localhost:8030/authenticate';

    public login(username:string, password: string): Promise<any> {

        return fetch(this.endpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        }).then(response => {

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
}