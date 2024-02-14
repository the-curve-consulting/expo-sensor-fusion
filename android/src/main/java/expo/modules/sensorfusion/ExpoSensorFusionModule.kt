package expo.modules.sensorfusion

import android.content.Context.SENSOR_SERVICE
import android.hardware.SensorManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.sensorfusion.services.RotationUpdatesService

class ExpoSensorFusionModule() : Module() {
  private lateinit var rotationUpdatesService: RotationUpdatesService;

  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoSensorFusion')` in JavaScript.
    Name("ExpoSensorFusion")

    Events(RotationUpdatesService.EVENT_NAME)

    // Defines module's lifecycle listener that is called right after module initialization.
    // If you need to set up something when the module gets initialized, use this instead of module's class initializer.
    OnCreate {
      val sensorManager = appContext.reactContext?.getSystemService(SENSOR_SERVICE) as SensorManager;

      rotationUpdatesService = RotationUpdatesService(sensorManager, ::sendEvent);
    }

    Function("startObservingRotationUpdates") {
      rotationUpdatesService.start()
    }

    Function("stopObservingRotationUpdates") {
      rotationUpdatesService.stop()
    }

    OnDestroy {
      rotationUpdatesService.stop()
    }
  }
}
