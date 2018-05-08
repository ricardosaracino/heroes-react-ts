
import {HeroModel} from './HeroModel';

export class HeroService{

    private heroesUrl = 'http://localhost:8030/heroes';

    /**
     * GET
     * @returns {Promise<HeroModel[]>}
     */
    public getHeroes(): Promise<HeroModel[]> {
        return fetch(this.heroesUrl).then(response => {

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }

    /**
     * GET
     * @param {string} id
     * @returns {Promise<HeroModel>}
     */
    public getHero(id: string): Promise<HeroModel> {

        return fetch(`${this.heroesUrl}/${id}`).then(response => {

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

        return fetch(this.heroesUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
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

        return fetch(this.heroesUrl, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
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

        return fetch(this.heroesUrl, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(hero) // todo just need _rev & _id
        }).then(response => {

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
}