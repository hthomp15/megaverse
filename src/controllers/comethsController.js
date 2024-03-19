import axios from 'axios';

const baseUrl = 'https://challenge.crossmint.io/api/comeths';
const candidateId = process.env.CANDIDATE_ID;

export const createCometh = async (req, res) => {
  const { row, column } = req.body;
  try {
    const response = await axios.post(baseUrl, {
      candidateId,
      row,
      column
    });
    res.status(201).json(response.data);
  } catch (error) {
    console.error(`Error creating Cometh: ${error.message}`);
    res.status(500).json({ message: 'Failed to create Cometh', error: error.message });
  }
};

export const deleteCometh = async (req, res) => {
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
    console.error(`Error deleting Cometh: ${error.message}`);
    res.status(500).json({ message: 'Failed to delete Cometh', error: error.message });
  }
};
