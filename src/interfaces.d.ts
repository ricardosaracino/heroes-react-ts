
interface IHeroProps {
    id?: string,
    name?: string,
    age?: string,
}

export class HeroModel implements IHeroProps{
    public id: string;
    public name: string;
    public age: string;
}

interface INavbarProps {
    title: string,
}