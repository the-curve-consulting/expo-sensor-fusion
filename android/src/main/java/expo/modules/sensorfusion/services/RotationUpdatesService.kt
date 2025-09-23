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
  private var rotationVectorSensor: Sensor? = null;

  private var rotationUpdateEventListener: RotationUpdateEventListener? = null

  private var observing: Boolean = false

  var isSensorAvailable: Boolean = false;

  init {
    val sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR)
    this.isSensorAvailable = sensor !== null;

    if (this.isSensorAvailable) {
      this.rotationVectorSensor = sensor;
      this.rotationUpdateEventListener = RotationUpdateEventListener(
        EVENT_NAME,
        RotationUpdateSensorEventProcessor(),
        this.eventCallback)
    }
  }

  companion object {
    const val EVENT_NAME = "onRotationUpdated"
  }

  fun startObservingRotationUpdates() {
    if (!this.isSensorAvailable || this.observing) {
      // Sensor is not available or it's already being observed.
      return;
    }

    this.sensorManager.registerListener(
      this.rotationUpdateEventListener,
      this.rotationVectorSensor,
      SensorManager.SENSOR_DELAY_FASTEST
    )
    this.observing = true;
  }

  fun stopObservingRotationUpdates() {
    this.sensorManager.unregisterListener(rotationUpdateEventListener)
    this.observing = false
  }
}