import cv2
import numpy as np
import os

# Initialize ORB object
orb = cv2.ORB_create(nfeatures=1500)

# Function to find descriptors for images
def findDes(images):
    desList = []
    for img in images:
        kp, des = orb.detectAndCompute(img, None)
        desList.append(des)
    return desList

# Function to classify food images into good or bad condition
def classifyFood(img, desList):
    kp2, des2 = orb.detectAndCompute(img, None)
    if des2 is None:
        print("No descriptors found for query image.")
        return "Unknown"

    bf = cv2.BFMatcher()
    matchList = []
    try:
        for des in desList:
            if des is None:
                print("Descriptors not found for a reference image.")
                matchList.append(0)
                continue

            matches = bf.knnMatch(des, des2, k=2)
            good = []
            for m, n in matches:
                if m.distance < 0.75 * n.distance:
                    good.append([m])
            matchList.append(len(good))
    except Exception as e:
        print("Error:", e)

    if len(matchList) != 0:
        if max(matchList) > 10:  # Threshold to classify as good or bad
            return "Good"
        else:
            return "Bad"
    else:
        return "Unknown"

# Load images from ImageTrain folder
image_folder = 'ImageTrain'
image_files = [f for f in os.listdir(image_folder) if os.path.isfile(os.path.join(image_folder, f))]

images = []
for file in image_files:
    img = cv2.imread(os.path.join(image_folder, file), cv2.IMREAD_GRAYSCALE)
    images.append(img)

# Find descriptors for images in ImageTrain folder
desList = findDes(images)
print("Descriptors computed for reference images.")

# Capture a single frame
cap = cv2.VideoCapture(0)
ret, frame = cap.read()

# Convert frame to grayscale
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

# Classify the food image
result = classifyFood(gray, desList)

# Display the result on the screen
cv2.putText(frame, f"Food Condition: {result}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
cv2.imshow('Food Quality Classifier', frame)

# Release video capture and close all windows
cap.release()
cv2.waitKey(0)
cv2.destroyAllWindows()
