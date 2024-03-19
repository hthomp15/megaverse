import axios from 'axios';

const baseUrl = 'https://challenge.crossmint.io/api/soloons';
const candidateId = process.env.CANDIDATE_ID;

export const createSoloon = async (req, res) => {
  const { row, column } = req.body;
  try {
    const response = await axios.post(baseUrl, {
      candidateId,
      row,
      column
    });
    res.status(201).json(response.data);
  } catch (error) {
    console.error(`Error creating Soloon: ${error.message}`);
    res.status(500).json({ message: 'Failed to create Soloon', error: error.message });
  }
};

export const deleteSoloon = async (req, res) => {
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
    console.error(`Error deleting Soloon: ${error.message}`);
    res.status(500).json({ message: 'Failed to delete Soloon', error: error.message });
  }
};
