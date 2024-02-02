package expo.modules.sensorfusion

import android.app.Activity
import android.content.Context.SENSOR_SERVICE
import android.hardware.Sensor
import android.hardware.SensorManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.sensorfusion.support.RotationVectorEventListener

private const val EventName = "rotationVectorDidUpdate"

class ExpoSensorFusionModule() : Module() {
  var sensorManager: SensorManager? = null;
  var rotationEventListener: RotationVectorEventListener? = null;


  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoSensorFusion')` in JavaScript.
    Name("ExpoSensorFusion")

    Events(EventName)

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    Function("startObserving") {
      sensorManager = appContext.reactContext?.getSystemService(SENSOR_SERVICE) as SensorManager
      rotationEventListener = RotationVectorEventListener(EventName, ::sendEvent)

      val rotationVectorSensor = sensorManager?.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR)

      if (rotationVectorSensor !== null) {
        sensorManager?.registerListener(
          rotationEventListener,
          rotationVectorSensor,
          SensorManager.SENSOR_DELAY_FASTEST
        )
      }
    }

    Function("stopObserving") {
      sensorManager?.unregisterListener(rotationEventListener);
    }
  }

  /**
   * -----------------------
   * Private utility methods
   * -----------------------
   */

  private fun getActivity(): Activity {
    val activity = appContext.activityProvider?.currentActivity
    return activity!!
  }
}
