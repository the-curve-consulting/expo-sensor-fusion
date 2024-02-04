package expo.modules.sensorfusion.libs

import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle

class RotationUpdateEventListener(
  private val eventName: String,
  private val eventCallback: (name: String, body: Bundle?) -> Unit
) : SensorEventListener {
  private val rotationMatrix = FloatArray(16);
  private val rotationMatrixBundle = Bundle();
  private val eventDataBundle = Bundle();

  override fun onSensorChanged(sensorEvent: SensorEvent) {
    if (sensorEvent.sensor.type != Sensor.TYPE_ROTATION_VECTOR) {
      return;
    }

    // Get the rotation matrix
    SensorManager.getRotationMatrixFromVector(rotationMatrix, sensorEvent.values);

    // Prepare the data to send back
    rotationMatrixBundle.apply {
      putFloat("m11", rotationMatrix[0])
      putFloat("m12", rotationMatrix[1])
      putFloat("m13", rotationMatrix[2])

      putFloat("m21", rotationMatrix[4])
      putFloat("m22", rotationMatrix[5])
      putFloat("m23", rotationMatrix[6])

      putFloat("m31", rotationMatrix[8])
      putFloat("m32", rotationMatrix[9])
      putFloat("m33", rotationMatrix[10])
    }

    eventDataBundle.apply {
      putBundle("rotationMatrix", rotationMatrixBundle)
    }

    // Send back the rotation matrix data
    this.eventCallback(eventName, eventDataBundle)
  }

  override fun onAccuracyChanged(sensor: Sensor, accuracy: Int) {
    // Nothing to do.
  }
}