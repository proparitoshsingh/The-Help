import subprocess
import sys
import base64
import os
import pandas as pd
import matplotlib.pyplot as plt
from fer import Video, FER
from io import BytesIO

# Run the pip install command to download and install the module
subprocess.check_call([sys.executable, "-m", "pip", "install", "fer"])
subprocess.check_call([sys.executable, "-m", "pip", "install", "tensorflowjs"])
subprocess.check_call([sys.executable, "-m", "pip", "install", "imageio-ffmpeg"])

# Put in the location of the video file that has to be processed
location_videofile = sys.argv[1]

# Build the Face detection detector
face_detector = FER(mtcnn=True)

# Input the video for processing
input_video = Video(location_videofile)

# The analyze() function will run analysis on every frame of the input video. 
# It will create a rectangular box around every image and show the emotion values next to that.
# Finally, the method will publish a new video that will have a box around the face of the human with live emotion values.
processing_data = input_video.analyze(face_detector, display=False)

# We will now convert the analyzed information into a dataframe.
# This will help us import the data as a .CSV file to perform analysis over it later
vid_df = input_video.to_pandas(processing_data)
vid_df = input_video.get_first_face(vid_df)
vid_df = input_video.get_emotions(vid_df)

# Plotting the emotions against time in the video
plt.figure(figsize=(20, 8))
vid_df.plot(ax=plt.gca(), fontsize=16)
plt.xlabel('Time')
plt.ylabel('Emotion Values')
plt.title('Emotions vs. Time in Video')
plt.savefig('emotion_plot.png')

# We will now work on the dataframe to extract which emotion was prominent in the video
angry = sum(vid_df.angry)
disgust = sum(vid_df.disgust)
fear = sum(vid_df.fear)
happy = sum(vid_df.happy)
sad = sum(vid_df.sad)
surprise = sum(vid_df.surprise)
neutral = sum(vid_df.neutral)

emotions = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']
emotions_values = [angry, disgust, fear, happy, sad, surprise, neutral]

score_comparisons = pd.DataFrame(emotions, columns=['Human Emotions'])
score_comparisons['Emotion Value from the Video'] = emotions_values

# Save the figure to a BytesIO object
buffer = BytesIO()
plt.savefig(buffer, format='png')
buffer.seek(0)

# Encode the image data as base64
base64_data = base64.b64encode(buffer.getvalue())

# Convert the base64 data to a string
my_string = base64_data.decode('utf-8')

# Concatenating data frame to the string
score_comparisons_str = score_comparisons.to_string(index=False)

# Concatenate the string before s
my_string = score_comparisons_str + '\n' + my_string

print(my_string)
