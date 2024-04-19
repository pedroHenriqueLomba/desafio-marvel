import CharacterService from "../services/character.service";

export default class CharacterController {
  private service = new CharacterService();

  constructor() {
    this.create = this.create.bind(this);
  }

  async create(req: any, res: any) {
    try {
      const character = await this.service.create(req.body);
      res.status(201).send(character);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
