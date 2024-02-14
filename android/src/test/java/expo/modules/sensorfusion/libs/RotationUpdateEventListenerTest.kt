package expo.modules.sensorfusion.services

import android.hardware.SensorEvent
import android.os.Bundle
import expo.modules.sensorfusion.libs.EventCallback
import expo.modules.sensorfusion.libs.RotationUpdateEventListener
import expo.modules.sensorfusion.libs.RotationUpdateSensorEventProcessor
import org.junit.Before
import org.junit.Test
import org.mockito.Mock
import org.mockito.MockitoAnnotations
import org.mockito.kotlin.any
import org.mockito.kotlin.mock
import org.mockito.kotlin.verify
import org.mockito.kotlin.whenever


class RotationUpdateEventListenerTest {
  private val mockEventName: String = "mockEventName"

  private lateinit var subject: RotationUpdateEventListener;

  @Mock
  private lateinit var mockEventCallback: EventCallback

  @Mock
  private lateinit var mockRotationVectorSensorEvent: SensorEvent

  @Mock
  private lateinit var mockRotationUpdateSensorEventProcessor: RotationUpdateSensorEventProcessor

  @Before
  fun setup() {
    // Initialise mocks
    MockitoAnnotations.openMocks(this);

    // Prepare SUT
    subject = RotationUpdateEventListener(
      mockEventName,
      mockRotationUpdateSensorEventProcessor,
      mockEventCallback
    )
  }

  @Test
  fun `emits an event by calling the #mockEventCallback when #onSensorChanged`() {
    // Given
    val mockRotationMatrixBundle = mock<Bundle>()

    whenever(
      mockRotationUpdateSensorEventProcessor.toRotationMatrixBundle(any())
    ).thenReturn(mockRotationMatrixBundle)

    // When
    subject.onSensorChanged(mockRotationVectorSensorEvent)

    // Then
    verify(
      mockEventCallback
    ).invoke(mockEventName, mockRotationMatrixBundle)
  }
}