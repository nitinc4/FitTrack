export const validateImageFile = (file) => {
  if (!file) {
    throw new Error('No file selected');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Please upload an image file');
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('Image size should be less than 5MB');
  }
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      if (!base64String) {
        reject(new Error('Failed to convert image to base64'));
        return;
      }
      resolve(base64String);
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
  });
};