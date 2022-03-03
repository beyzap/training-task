export class Accessory {
    public name: string;
    public price: number;
    public image: string;
    public id: string;

    constructor(name: string, price: number, image: string, id: string) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.id = id;
    }
}
