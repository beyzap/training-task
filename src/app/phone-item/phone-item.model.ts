export class Phone {
    public name: string;
    public price: number;
    public image: string;
    public color: string;
    public screenSize: string;
    public description: string;
    public sku: string;
    public modelName: string;
    public id : number;

    constructor(name: string, price: number, image: string, color: string, screenSize: string, description: string,
        sku: string, modelName: string, id: number) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.color = color;
        this.screenSize = screenSize;
        this.description = description;
        this.sku = sku;
        this.modelName = modelName;
        this.id = id;
    }
}
