package expo.modules.sensorfusion.support

import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.os.Bundle

class RotationVectorEventListener(
  private val eventName: String,
  private val eventCallback: (name: String, body: Bundle?) -> Unit
) : SensorEventListener {
  override fun onSensorChanged(sensorEvent: SensorEvent) {
    if (sensorEvent.sensor.type != Sensor.TYPE_ROTATION_VECTOR) {
      return;
    }

    val data = Bundle().apply {
      putDouble("x", sensorEvent.values[0].toDouble())
      putDouble("y", sensorEvent.values[1].toDouble())
      putDouble("z", sensorEvent.values[2].toDouble())
    }

    this.eventCallback(eventName, data)
  }

  override fun onAccuracyChanged(sensor: Sensor, accuracy: Int) {
    // Nothing to do.
  }
}