import numpy as np
import pandas as pd
import tensorflow as tf
from keras.layers import Conv2D, Dense, BatchNormalization, Dropout, MaxPooling2D, Flatten
from keras.optimizers import Adam
from keras import regularizers
from PIL import Image, ImageOps

WEIGHTS_PATH = './static/model_weights/secondary_emotion_bestweight.h5'


def get_model(input_size, classes):
    # initializing the CNN
    model = tf.keras.models.Sequential()

    model.add(Conv2D(32, kernel_size=(3, 3), padding='same',
              activation='relu', input_shape=input_size))
    model.add(Conv2D(64, kernel_size=(3, 3), activation='relu', padding='same'))
    model.add(BatchNormalization())
    model.add(MaxPooling2D(2, 2))
    model.add(Dropout(0.25))

    model.add(Conv2D(128, kernel_size=(3, 3), activation='relu',
              padding='same', kernel_regularizer=regularizers.l2(0.01)))
    model.add(Conv2D(256, kernel_size=(3, 3), activation='relu',
              kernel_regularizer=regularizers.l2(0.01)))
    model.add(BatchNormalization())
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Flatten())
    model.add(Dense(1024, activation='relu'))
    model.add(Dropout(0.5))

    model.add(Dense(classes, activation='softmax'))

    # Compliling the model
    model.compile(optimizer=Adam(lr=0.0001, decay=1e-6),
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    return model


def load_picture(picture):
    img = Image.open(picture)
    img_gray = ImageOps.grayscale(img)
    image = img_gray.resize((48, 48), Image.ANTIALIAS)
    np_image = np.array(image).astype('float32')/255
    np_image = np.expand_dims(np_image, axis=0)
    return np_image


def load_model():
    row, col = 48, 48
    classes = 4
    tiny_emotion_set = get_model((row, col, 1), classes)
    tiny_emotion_set.load_weights(WEIGHTS_PATH)
    return tiny_emotion_set


def test_image(raw_picture):
    picture = load_picture(raw_picture)
    result = tiny_emotion_set.predict(picture, verbose=0)
    result = list(result[0])
    return result


tiny_emotion_set = load_model()
