export class ResponseMarvelList<T> {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: DataMarvelList<T>;

    constructor({ code, status, data, attributionText, attributionHTML, etag, copyright }: ResponseMarvelList<T>) {
        this.code = code;
        this.status = status;
        this.data = data;
        this.attributionText = attributionText;
        this.attributionHTML = attributionHTML;
        this.etag = etag;
        this.copyright = copyright;
    }
}

class DataMarvelList<T> {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: T[];

    constructor({ offset, limit, total, count, results }: DataMarvelList<T>) {
        this.offset = offset;
        this.limit = limit;
        this.total = total;
        this.count = count;
        this.results = results;
    }
}