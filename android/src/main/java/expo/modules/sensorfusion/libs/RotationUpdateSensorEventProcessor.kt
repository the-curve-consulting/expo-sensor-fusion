package expo.modules.sensorfusion.libs

import android.hardware.SensorEvent
import android.hardware.SensorManager
import android.os.Bundle
import androidx.core.os.bundleOf

class RotationUpdateSensorEventProcessor() {
  private val rotationMatrixOutput = FloatArray(16);

  fun toRotationMatrixBundle(sensorEvent: SensorEvent): Bundle {
    SensorManager.getRotationMatrixFromVector(rotationMatrixOutput, sensorEvent.values);

    val rotationMatrixBundle = bundleOf().apply {
      putBundle("rotationMatrix", bundleOf().apply {
        putDouble("m11", rotationMatrixOutput[0].toDouble())
        putDouble("m21", rotationMatrixOutput[1].toDouble())
        putDouble("m31", rotationMatrixOutput[2].toDouble())

        putDouble("m12", rotationMatrixOutput[4].toDouble())
        putDouble("m22", rotationMatrixOutput[5].toDouble())
        putDouble("m32", rotationMatrixOutput[6].toDouble())

        putDouble("m13", rotationMatrixOutput[8].toDouble())
        putDouble("m23", rotationMatrixOutput[8].toDouble())
        putDouble("m33", rotationMatrixOutput[10].toDouble())
      })
    }

    return rotationMatrixBundle;
  }
}
