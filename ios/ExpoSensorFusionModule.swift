import ExpoModulesCore
import CoreMotion

public class ExpoSensorFusionModule: Module {
  var rotationUpdatesService: RotationUpdatesService! = nil;

  /// Each module class must implement the definition function. The definition consists of components
  /// that describes the module's functionality and behavior.
  /// See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    /// Sets the name of the module that JavaScript code will use to refer to the module.
    /// Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    /// The module will be accessible from `requireNativeModule('ExpoSensorFusion')` in JavaScript.
    Name("ExpoSensorFusion")

    Events(RotationUpdatesService.EVENT_NAME)

    OnCreate {
      rotationUpdatesService = RotationUpdatesService(eventCallback: self.sendEvent)
    }

    Function("startObservingRotationUpdates") {
      try rotationUpdatesService.startObservingRotationUpdates()
    }

    Function("stopObservingRotationUpdates") {
      rotationUpdatesService.stopObservingRotationUpdates()
    }
    
    Function("isSensorAvailable") {
      rotationUpdatesService.isSensorAvailable()
    }

    OnDestroy {
      rotationUpdatesService.stopObservingRotationUpdates()
    }
  }
}
