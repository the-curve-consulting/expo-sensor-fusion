package expo.modules.sensorfusion.libs

import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.os.Bundle

typealias EventCallback = (name: String, body: Bundle?) -> Unit

class RotationUpdateEventListener(
  private val eventName: String,
  private val eventProcessor: RotationUpdateSensorEventProcessor,
  private val eventCallback: EventCallback,
) : SensorEventListener {
  override fun onSensorChanged(sensorEvent: SensorEvent) {
    // Transform the sensor event data to a rotation matrix bundle
    val rotationMatrixBundle = eventProcessor.toRotationMatrixBundle(sensorEvent)

    // Emit the rotation matrix bundle data
    this.eventCallback(eventName, rotationMatrixBundle)
  }

  override fun onAccuracyChanged(sensor: Sensor, accuracy: Int) {
    // Nothing to do.
  }
}