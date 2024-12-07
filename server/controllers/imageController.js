import axios from 'axios';

const CLARIFAI_API_KEY = '0710f08dbba14e88892df385399f8695';
const FOOD_MODEL_ID = 'bd367be194cf45149e75f01d59f77ba7';
const CALORIE_NINJA_API_KEY = "9AWK9Jt/hdW4RBKFSPPApQ==zDIOA8e7Ci1fw8hJ";

export const analyzeImage = async (req, res) => {
  try {
    const { base64Image } = req.body;

    // Call Clarifai API
    const clarifaiResponse = await axios({
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

    const concepts = clarifaiResponse.data.outputs[0].data.concepts;
    if (!concepts || concepts.length === 0) {
      return res.status(400).json({ error: 'No food items detected in the image' });
    }

    // Extract the top ingredients with a higher confidence threshold
    const topIngredients = concepts
      .filter(concept => concept.value > 0.8) // Adjust threshold for better precision
      .slice(0, 5); // Limit to top 5 ingredients

    if (topIngredients.length === 0) {
      return res.status(400).json({ error: 'No food items detected with high confidence' });
    }

    // Combine ingredient names for a more accurate query
    const ingredients = topIngredients.map(i => i.name);

    // Query CalorieNinja API for each ingredient
    let totalNutrition = {
      name: ingredients.join(' + '), // Combine ingredient names as a fallback
      calories: 0,
      protein_g: 0,
      fat_total_g: 0,
      carbohydrates_total_g: 0,
      fiber_g: 0,
      sugar_g: 0,
      serving_size_g: 100,
      sodium_mg: 0,
      potassium_mg: 0,
      cholesterol_mg: 0,
      ingredients: ingredients,
      confidence: topIngredients[0].value
    };

    for (const ingredient of ingredients) {
      const nutritionResponse = await axios({
        method: 'GET',
        url: `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(ingredient)}`,
        headers: {
          'X-Api-Key': CALORIE_NINJA_API_KEY
        }
      });

      if (nutritionResponse.data.items?.[0]) {
        const item = nutritionResponse.data.items[0];
        totalNutrition.calories += item.calories || 0;
        totalNutrition.protein_g += item.protein_g || 0;
        totalNutrition.fat_total_g += item.fat_total_g || 0;
        totalNutrition.carbohydrates_total_g += item.carbohydrates_total_g || 0;
        totalNutrition.fiber_g += item.fiber_g || 0;
        totalNutrition.sugar_g += item.sugar_g || 0;
        totalNutrition.sodium_mg += item.sodium_mg || 0;
        totalNutrition.potassium_mg += item.potassium_mg || 0;
        totalNutrition.cholesterol_mg += item.cholesterol_mg || 0;
      }
    }

    // Return the total nutrition info
    res.json(totalNutrition);
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze image',
      message: error.message 
    });
  }
};
