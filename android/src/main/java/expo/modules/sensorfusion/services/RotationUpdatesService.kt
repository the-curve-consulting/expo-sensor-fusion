package expo.modules.sensorfusion.services

import android.hardware.Sensor
import android.hardware.SensorManager
import android.os.Bundle
import expo.modules.sensorfusion.libs.RotationUpdateEventListener
import expo.modules.sensorfusion.libs.RotationUpdateSensorEventProcessor

class RotationUpdatesService(
  private val sensorManager: SensorManager,
  private val eventCallback: (name: String, body: Bundle?) -> Unit
) {
  private var rotationVectorSensor: Sensor

  private var rotationUpdateEventListener: RotationUpdateEventListener? = null

  private var observing: Boolean = false

  init {
    val sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR)
    if (sensor === null) {
      throw Error("Could not get the 'TYPE_ROTATION_VECTOR' sensor on this device.")
    }

    this.rotationVectorSensor = sensor
    this.rotationUpdateEventListener = RotationUpdateEventListener(
      EVENT_NAME,
      RotationUpdateSensorEventProcessor(),
      this.eventCallback)
  }

  companion object {
    const val EVENT_NAME = "rotationUpdated"
  }

  fun start() {
    this.sensorManager.registerListener(
      this.rotationUpdateEventListener,
      this.rotationVectorSensor,
      SensorManager.SENSOR_DELAY_FASTEST
    )
    this.observing = true;
  }

  fun stop() {
    this.sensorManager.unregisterListener(rotationUpdateEventListener)
    this.observing = false
  }
}