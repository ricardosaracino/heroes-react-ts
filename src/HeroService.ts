import {HeroModel} from './models/HeroModel';

import apiFetch from './FetchService';

export class HeroService {

    private endpoint = 'http://localhost:8030/heroes';

    /**
     * GET
     * @returns {Promise<HeroModel[]>}
     */
    public getHeroes(): Promise<HeroModel[]> {
        return apiFetch(this.endpoint, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
    }

    /**
     * GET
     * @param {string} id
     * @returns {Promise<HeroModel>}
     */
    public getHero(id: string): Promise<HeroModel> {

        return fetch(`${this.endpoint}/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }).then(response => {

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json();
        });
    }

    /**
     * POST
     * @param {HeroModel} hero
     * @returns {Promise<any>}
     */
    public addHero(hero: HeroModel): Promise<any> {

        return fetch(this.endpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(hero)
        }).then(response => {

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }

    /**
     * PUT
     * @param {HeroModel} hero
     * @returns {Promise<any>}
     */
    public updateHero(hero: HeroModel): Promise<any> {

        return fetch(this.endpoint, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(hero)
        }).then(response => {

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }

    /**
     * DELETE
     * @param {HeroModel} hero
     * @returns {Promise<any>}
     */
    public deleteHero(hero: HeroModel): Promise<any> {

        return fetch(this.endpoint, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(hero) // todo just need _rev & _id
        }).then(response => {

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
}