import axios from 'axios';

const baseUrl = 'https://challenge.crossmint.io/api/polyanets';
const candidateId = process.env.CANDIDATE_ID;

export const createPolyanet = async (req, res) => {
  const { row, column } = req.body;
  try {
    const response = await axios.post(baseUrl, {
      candidateId,
      row,
      column
    });
    res.status(201).json(response.data);
  } catch (error) {
    console.error(`Error creating Polyanet: ${error.message}`);
    res.status(500).json({ message: 'Failed to create Polyanet', error: error.message });
  }
};

export const deletePolyanet = async (req, res) => {
  const { row, column } = req.body;
  try {
    const response = await axios.delete(baseUrl, {
      data: {
        candidateId,
        row,
        column
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error deleting Polyanet: ${error.message}`);
    res.status(500).json({ message: 'Failed to delete Polyanet', error: error.message });
  }
};
