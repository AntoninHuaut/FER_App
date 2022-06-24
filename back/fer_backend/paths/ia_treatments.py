import numpy as np
import pandas as pd
import os
import tensorflow as tf
from keras.preprocessing.image import ImageDataGenerator
from keras.layers import Conv2D, Dense, BatchNormalization, Activation, Dropout, MaxPooling2D, Flatten
from keras.optimizers import Adam, RMSprop, SGD
from keras import regularizers
from keras.callbacks import ModelCheckpoint, CSVLogger, TensorBoard, EarlyStopping, ReduceLROnPlateau
import datetime
import matplotlib.pyplot as plt
from keras.utils import load_img, plot_model
from PIL import Image

def get_model(input_size, classes=14):
    #initializing the CNN
    model = tf.keras.models.Sequential()
    
    model.add(Conv2D(32, kernel_size=(3, 3), padding='same', activation='relu', input_shape =input_size))
    model.add(Conv2D(64, kernel_size=(3, 3), activation='relu', padding='same'))
    model.add(BatchNormalization())
    model.add(MaxPooling2D(2, 2))
    model.add(Dropout(0.25))

    model.add(Conv2D(128, kernel_size=(3, 3), activation='relu', padding='same', kernel_regularizer=regularizers.l2(0.01)))
    model.add(Conv2D(256, kernel_size=(3, 3), activation='relu', kernel_regularizer=regularizers.l2(0.01)))
    model.add(BatchNormalization())
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Flatten())
    model.add(Dense(1024, activation='relu'))
    model.add(Dropout(0.5))
    
    model.add(Dense(classes, activation='softmax'))

    #Compliling the model
    model.compile(optimizer=Adam(lr=0.0001, decay=1e-6), 
                  loss='categorical_crossentropy', 
                  metrics=['accuracy'])
    return model

def load_picture(picture):
    np_image = tf.keras.utils.load_img( 
    f"{picture}", target_size=(48, 48), color_mode='grayscale')#TODO MODIFIER
    np_image = np.array(np_image).astype('float32')/255
    np_image = np.expand_dims(np_image, axis=0)
    return np_image

def test_image(raw_picture):
    #pretretement
    row, col = 48,48
    classes = 6
    tiny_emotion_set = get_model((row, col, 1), classes)
    tiny_emotion_set.load_weights('../../static/model_weights/backup/tiny_emotion-v6/tiny_emotion_bestweight.h5')

    label_dict = {0: 'Angry', 1: 'Disgust', 2: 'Fear', 3: 'Joy', 4: 'Sad', 5: 'Surprise'}

    picture = load_picture(raw_picture)
    result = tiny_emotion_set.predict(picture, verbose=0)
    result = list(result[0])

