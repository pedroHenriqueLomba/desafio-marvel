export class Character {
    marvel_id: number;
    name: string;
    description: string;
    modified: Date;
    resourceURI: string;
    urls: string[];
    thumbnail: string;

    constructor(
        marvel_id: number,
        name: string,
        description: string,
        modified: Date,
        resourceURI: string,
        urls: string[],
        thumbnail: string
    ) {
        this.marvel_id = marvel_id;
        this.name = name;
        this.description = description;
        this.modified = modified;
        this.resourceURI = resourceURI;
        this.urls = urls;
        this.thumbnail = thumbnail;
    }
}
