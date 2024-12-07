import axios from 'axios';

const CLARIFAI_API_KEY = '0710f08dbba14e88892df385399f8695';
const FOOD_MODEL_ID = 'bd367be194cf45149e75f01d59f77ba7';

export const analyzeFoodImage = async (base64Image) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `https://api.clarifai.com/v2/models/${FOOD_MODEL_ID}/outputs`,
      headers: {
        'Authorization': `Key ${CLARIFAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        inputs: [{
          data: {
            image: {
              base64: base64Image
            }
          }
        }]
      }
    });

    const concepts = response.data.outputs[0].data.concepts;
    if (!concepts || concepts.length === 0) {
      throw new Error('No food items detected in the image');
    }

    // Get the most likely food item
    const topConcept = concepts[0];
    return {
      name: topConcept.name,
      confidence: topConcept.value
    };
  } catch (error) {
    console.error('Clarifai API error:', error);
    throw new Error('Failed to analyze image: ' + (error.response?.data?.message || error.message));
  }
};