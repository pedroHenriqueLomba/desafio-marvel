import dotenv from 'dotenv';
dotenv.config();

export class MarvelApiService {
  constructor() {
    this.fetch = this.fetch.bind(this);
  }

  async fetch(endpoint: string) {
    const response = await fetch(`${process.env.MARVEL_API_URL}/${endpoint}?${process.env.MARVEL_AUTORIZATION}&limit=100`);
    const data = await response.json();
    return data;
  }
}