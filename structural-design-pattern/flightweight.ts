// Flyweight Pattern -> It is a stateless can be shared across <Object>. 
// It is a pattern about <Memory management> and performance if the construction
// of objects is expensive.

// Single property that will shared with other objects.
type ExtractMaxInt = {
    setMaxInt: () => number;
    floorInt: (n: number) => number;
}

class ImageIndentifer {
    constructor(url: string) {}
}

class Showflake {
    image: ImageIndentifer
    constructor(public style: string){
        let url = style + ".png";
        this.image = new ImageIndentifer(url);    
    }

    render(x: number, y: number){
        // ...
    }
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

class ShowflakesFactory {
    cache: { [style: string]: Showflake } = {};

    get (style: string): Showflake {
        let cache = this.cache;
        let showflake: Showflake;

        if (hasOwnProperty.call(cache, style)){
            showflake = cache[style];
        } else {
            showflake = new Showflake(style);
            cache[style] = showflake;
        }

        return showflake;
    }
}

const SHOW_STYLES = ["A", "B", "C"];

class Sky {
    constructor(
        public width: number,
        public height: number
    ){}

    show(factory: ShowflakesFactory, count: number){
        let stylesCount = SHOW_STYLES.length;
        for (let i = 0; i < count; i++){
            let style = SHOW_STYLES[getRandomInteger(stylesCount)];
            let showflake = factory.get(style);

            let x = getRandomInteger(this.width);
            let y = getRandomInteger(this.height);
            let angle = getRandomInteger(60);

            showflake.render(x, y);
        }
    }
}

function getRandomInteger(max: number): number {
    return Math.floor(Math.random() * max);
}





