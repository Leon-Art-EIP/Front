export function fileToImage(file: File) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url); // Release the object URL after the image is loaded
      resolve(img); // Resolve the promise with the image element
    };

    img.onerror = (error) => {
      URL.revokeObjectURL(url); // Release the object URL on error as well
      reject(error); // Reject the promise with the error
    };

    img.src = url; // Set the image source to the object URL
  });
}
