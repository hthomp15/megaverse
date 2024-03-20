import axios from "axios";

class AstralObject {
  constructor(baseUrl, candidateId) {
    this.baseUrl = baseUrl;
    this.candidateId = candidateId;
  }

  async create(row, column, additionalInfo = {}) {
    const payload = {
      candidateId: this.candidateId,
      row,
      column,
      ...additionalInfo,
    };

    try {
      const response = await axios.post(this.baseUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error(`Error creating astral object: ${error.message}`);
      throw error;
    }
  }

  async delete(row, column) {
    const payload = {
      data: {
        candidateId: this.candidateId,
        row,
        column,
      },
    };

    try {
      const response = await axios.delete(this.baseUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting astral object: ${error.message}`);
      throw error;
    }
  }
}

export default AstralObject;
