import AstralObject from './AstralObject.js';

const POLYANETS_URL = "https://challenge.crossmint.io/api/polyanets";
const CANDIDATE_ID = process.env.CANDIDATE_ID;

class PolyanetsController extends AstralObject {
    constructor() {
        super(POLYANETS_URL, CANDIDATE_ID);
    }
}

export const polyanetsController = new PolyanetsController();
