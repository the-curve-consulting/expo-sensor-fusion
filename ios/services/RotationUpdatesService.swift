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
  private var eventData: Matrix = Matrix()
  
  static let EVENT_NAME = "rotationUpdated"
  
  init(eventCallback: @escaping EventCallback) {
    self.motionManager.deviceMotionUpdateInterval = 0.2 // 5 Hz
    
    self.eventCallback = eventCallback;
  }

  func startObservingRotationUpdates() throws {
    guard self.motionManager.isDeviceMotionAvailable else {
      throw RotationUpdatesServiceError.sensorNotAvailable
    }
          
    self.motionManager.startDeviceMotionUpdates(to: operationQueue) { [weak self] (motionEvent, error) in
      guard let motionEvent = motionEvent else {
        // Motion not ready
        return
      }
      
      let rotationMatrix = motionEvent.attitude.rotationMatrix
      
      self?.eventData.m11 = rotationMatrix.m11
      self?.eventData.m12 = rotationMatrix.m12
      self?.eventData.m13 = rotationMatrix.m13
      self?.eventData.m21 = rotationMatrix.m21
      self?.eventData.m22 = rotationMatrix.m22
      self?.eventData.m23 = rotationMatrix.m23
      self?.eventData.m31 = rotationMatrix.m31
      self?.eventData.m32 = rotationMatrix.m32
      self?.eventData.m33 = rotationMatrix.m33
      
      self?.eventCallback(RotationUpdatesService.EVENT_NAME, self!.eventData.dictionary)
    }
  }
  
  func stopObservingRotationUpdates() {
    self.motionManager.stopDeviceMotionUpdates()
  }
}
