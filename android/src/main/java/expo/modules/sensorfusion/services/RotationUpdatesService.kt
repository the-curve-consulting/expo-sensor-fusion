package expo.modules.sensorfusion.services

import android.hardware.Sensor
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import expo.modules.sensorfusion.libs.RotationUpdateEventListener

class RotationUpdatesService(
  private val sensorManager: SensorManager,
  private val eventCallback: (name: String, body: Bundle?) -> Unit
) {
  private var rotationVectorSensor: Sensor

  private var sensorEventListener: SensorEventListener? = null
  private var rotationUpdateEventListener: RotationUpdateEventListener? = null

  private var observing: Boolean = false

  init {
    val sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR)
    if (sensor === null) {
      throw Error("Could not get the 'TYPE_ROTATION_VECTOR' sensor on this device.")
    }

    this.rotationUpdateEventListener = RotationUpdateEventListener(EVENT_NAME, eventCallback)
    this.rotationVectorSensor = sensor
  }

  companion object {
    const val EVENT_NAME = "rotationUpdated"
  }

  fun startObservingRotationUpdates() {
    this.sensorManager.registerListener(
      sensorEventListener,
      rotationVectorSensor,
      SensorManager.SENSOR_DELAY_FASTEST
    )
    this.observing = true;
  }

  fun stopObservingRotationUpdates() {
    this.sensorManager.unregisterListener(sensorEventListener)
    this.observing = false;
  }
}