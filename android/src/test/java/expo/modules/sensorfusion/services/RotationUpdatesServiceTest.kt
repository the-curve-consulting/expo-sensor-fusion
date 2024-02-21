package expo.modules.sensorfusion.services

import android.hardware.Sensor
import android.hardware.SensorManager
import android.os.Bundle
import expo.modules.sensorfusion.libs.RotationUpdateEventListener
import org.junit.Before
import org.junit.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.Mock
import org.mockito.Mockito.eq
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`
import org.mockito.MockitoAnnotations


class RotationUpdatesServiceTest {
  @Mock
  private lateinit var mockSensorManager: SensorManager

  @Mock
  private lateinit var mockRotationVectorSensor: Sensor

  @Mock
  private lateinit var mockEventCallback: (String, Bundle?) -> Unit

  // System Under Test
  private lateinit var subject: RotationUpdatesService

  @Before
  fun setup() {
    // Initialise mocks
    MockitoAnnotations.openMocks(this);

    // Mock SUT internal calls
    `when`(
      mockSensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR)
    ).thenReturn(mockRotationVectorSensor)

    // Prepare the SUT
    subject = RotationUpdatesService(mockSensorManager, mockEventCallback)
  }

  @Test
  fun `#start registers listener`() {
    // When
    subject.startObservingRotationUpdates()

    // Then
    verify(mockSensorManager).registerListener(
      any(RotationUpdateEventListener::class.java),
      eq(mockRotationVectorSensor),
      eq(SensorManager.SENSOR_DELAY_FASTEST)
    )
  }

  @Test
  fun `#stop unregisters listener`() {
    // Given
    subject.startObservingRotationUpdates()

    // When
    subject.stopObservingRotationUpdates()

    // Then
    verify(mockSensorManager).unregisterListener(
      any(RotationUpdateEventListener::class.java)
    )
  }
}