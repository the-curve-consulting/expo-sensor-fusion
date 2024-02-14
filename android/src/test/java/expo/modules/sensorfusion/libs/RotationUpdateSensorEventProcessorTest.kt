package expo.modules.sensorfusion.services

import android.hardware.SensorEvent
import android.hardware.SensorManager
import android.os.Bundle
import expo.modules.sensorfusion.libs.RotationUpdateSensorEventProcessor
import org.junit.Before
import org.junit.Test
import org.mockito.Mock
import org.mockito.Mockito
import org.mockito.Mockito.doNothing
import org.mockito.Mockito.mockStatic
import org.mockito.MockitoAnnotations
import org.mockito.kotlin.any
import org.mockito.kotlin.mock

class RotationUpdateSensorEventProcessorTest {
  private lateinit var subject: RotationUpdateSensorEventProcessor;

  @Mock
  private lateinit var mockBundle: Bundle;

  @Before
  fun setup() {
    MockitoAnnotations.openMocks(this);

    mockBundle = Mockito.mock(Bundle::class.java);

    // Prepare SUT
    subject = RotationUpdateSensorEventProcessor()
  }

  @Test
  fun `returns a rotation matrix Bundle given a SensorEvent`() {
    // Given
    mockStatic(SensorManager::class.java).`when`<SensorManager> {
      SensorManager.getRotationMatrixFromVector(any(), any())
    }.then { doNothing() }

    // Simulate the sensor event value
    val rotationMatrixInput = floatArrayOf(
      1.0f, 2.0f, 3.0f,  // m11 to m13
      4.0f, 5.0f, 6.0f,  // m21 to m23
      7.0f, 8.0f, 9.0f   // m31 to m33
    )
    val mockSensorEvent: SensorEvent = mock();
    val valuesField = SensorEvent::class.java.getField("values")
    valuesField.isAccessible = true
    valuesField.set(mockSensorEvent, rotationMatrixInput);

    // When
    subject.toRotationMatrixBundle(mockSensorEvent)
  }
}