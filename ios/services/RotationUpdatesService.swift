//
//  RotationUpdatesService.swift
//  ExpoSensorFusion
//
//  Created by Kishan Jadav on 08/02/2024.
//
import CoreMotion

enum RotationUpdatesServiceError: Error {
    case sensorNotAvailable
    case sensorNotReady
}

typealias EventCallback = (_ eventName: String, _ data: [String: Any]) -> Void

class RotationUpdatesService {
  private let motionManager: CMMotionManager = CMMotionManager()
  private let operationQueue: OperationQueue = OperationQueue()
  
  private let eventCallback: EventCallback
  
  static let EVENT_NAME = "rotationUpdated"
  
  init(eventCallback: @escaping EventCallback) {
    self.motionManager.deviceMotionUpdateInterval = 0.02 // 50 Hz
    self.eventCallback = eventCallback;
  }

  func startObservingRotationUpdates() throws {
    guard self.motionManager.isDeviceMotionAvailable else {
      throw RotationUpdatesServiceError.sensorNotAvailable
    }
          
    self.motionManager.startDeviceMotionUpdates(to: operationQueue) { (motionEvent, error) in
      guard let motionEvent = motionEvent else {
        // invalid event
        return
      }
      
      let rotationMatrix = motionEvent.attitude.rotationMatrix
      self.eventCallback(RotationUpdatesService.EVENT_NAME, [
        "rotationMatrix": [
          "m11": rotationMatrix.m11,
          "m12": rotationMatrix.m12,
          "m13": rotationMatrix.m13,

          "m21": rotationMatrix.m21,
          "m22": rotationMatrix.m22,
          "m23": rotationMatrix.m23,

          "m31": rotationMatrix.m31,
          "m32": rotationMatrix.m32,
          "m33": rotationMatrix.m33,
        ]
      ])
    }
  }
  
  func stopObservingRotationUpdates() {
    self.motionManager.stopDeviceMotionUpdates()
  }
}
