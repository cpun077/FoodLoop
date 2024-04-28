import cv2
from cvlib.object_detection import detect_common_objects, draw_bbox
from gtts import gTTS
from playsound import playsound
import os  
import os

def speech(text):
    print(text)
    language = "en"
    output = gTTS(text=text, lang=language, slow=False)
    
    # Create directory if it doesn't exist
    os.makedirs("./sounds", exist_ok=True)
    
    output.save("./sounds/output.mp3")
    playsound("./sounds/output.mp3")

dataset_paths = [
    "/GitHub/hackdavis24/server/Test",
    "/GitHub/hackdavis24/server/Train"
]

labels = set()  # Use a set for efficient label storage

for dataset_path in dataset_paths:
    for root, dirs, files in os.walk(dataset_path):
        for file in files:
            if file.lower().endswith((".png", ".jpg")):
                image_path = os.path.join(root, file)
                image = cv2.imread(image_path)

                if image is None:
                    print(f"Unable to read image: {image_path}")
                    continue

                try:
                    bbox, label, conf = detect_common_objects(image)
                    output_image = draw_bbox(image, bbox, label, conf)
                    cv2.imshow("Detection", output_image)
                    cv2.waitKey(1000)  # Display each image for 1 second

                    labels.update(label)  # Add labels to the set

                except Exception as e:
                    print(f"Error processing image {image_path}: {str(e)}")

cv2.destroyAllWindows()  # Close all OpenCV windows

new_sentence = [f"I found {' and '.join(labels)}."] if labels else ["No objects detected."]
speech(" ".join(new_sentence))
