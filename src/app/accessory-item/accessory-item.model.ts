export class Accessory {
    public name: string;
    public price: number;
    public image: string;
    public id: number;

    constructor(name: string, price: number, image: string, id: number) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.id = id;
    }
}
