import AstralObject from './AstralObject.js';

const COMETHS_URL = "https://challenge.crossmint.io/api/comeths";
const CANDIDATE_ID = process.env.CANDIDATE_ID;

class ComethsController extends AstralObject {
    constructor() {
        super(COMETHS_URL, CANDIDATE_ID);
    }
}

export const comethsController = new ComethsController();
