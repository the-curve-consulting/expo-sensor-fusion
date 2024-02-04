//
//  Matrix.swift
//  ExpoSensorFusion
//
//  Created by Kishan Jadav on 08/02/2024.
//

struct Matrix {
  var m11: Double = 0.0;
  var m12: Double = 0.0;
  var m13: Double = 0.0;
  
  var m21: Double = 0.0;
  var m22: Double = 0.0;
  var m23: Double = 0.0;
  
  var m31: Double = 0.0;
  var m32: Double = 0.0;
  var m33: Double = 0.0;
  
  var dictionary: [String: Double] {
    return [
      "m11": m11, "m12": m11, "m13": m11,
      "m21": m11, "m22": m11, "m23": m11,
      "m31": m11, "m32": m11, "m33": m11,
    ]
  }
}

