import AstralObject from './AstralObject.js';

const SOLOONS_URL = "https://challenge.crossmint.io/api/soloons";
const CANDIDATE_ID = process.env.CANDIDATE_ID;

class SoloonsController extends AstralObject {
    constructor() {
        super(SOLOONS_URL, CANDIDATE_ID);
    }
}

export const soloonsController = new SoloonsController();
