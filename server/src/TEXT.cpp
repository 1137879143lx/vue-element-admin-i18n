void setup()
{
    pinMode(PIN_CLAMP1, OUTPUT);
    pinMode(PIN_CLAMP2, OUTPUT);
    pinMode(PIN_SINK_DOWN, OUTPUT);
    pinMode(PIN_SINK_UP, OUTPUT);
    pinMode(PIN_SUCKER_ON, OUTPUT);
    pinMode(PIN_SUCKER_OFF, OUTPUT);
    pinMode(PIN_ROTATE_ON, OUTPUT);
    pinMode(PIN_ROTATE_OFF, OUTPUT);

    // Initialize the system
    digitalWrite(PIN_CLAMP1, HIGH);     // Clamp 1
    digitalWrite(PIN_CLAMP2, LOW);      // Unclamp 2
    digitalWrite(PIN_SINK_UP, HIGH);    // Sink cylinder rises
    digitalWrite(PIN_SUCKER_OFF, HIGH); // Sucker off
    digitalWrite(PIN_ROTATE_OFF, HIGH); // Rotate cylinder to zero
}

void loop()
{
    // Wait for product 1 signal
    if (digitalRead(PIN_PRODUCT1_SIGNAL) == HIGH)
    {
        digitalWrite(PIN_CLAMP2, HIGH);    // Clamp 2
        digitalWrite(PIN_SINK_DOWN, HIGH); // Sink cylinder starts to sink
        digitalWrite(PIN_SUCKER_ON, HIGH); // Sucker on
    }

    // Wait for sink down signal
    if (digitalRead(PIN_SINK_DOWN_SIGNAL) == HIGH)
    {
        digitalWrite(PIN_SINK_UP, HIGH); // Sink cylinder starts to rise
    }

    // Wait for sink up signal
    if (digitalRead(PIN_SINK_UP_SIGNAL) == HIGH)
    {
        digitalWrite(PIN_CLAMP1, LOW);     // Unclamp 1
        digitalWrite(PIN_CLAMP2, LOW);     // Unclamp 2
        digitalWrite(PIN_ROTATE_ON, HIGH); // Rotate cylinder 90 degrees
    }

    // Wait for rotate signal
    if (digitalRead(PIN_ROTATE_ON_SIGNAL) == HIGH)
    {
        digitalWrite(PIN_SUCKER_OFF, HIGH); // Sucker off
        digitalWrite(PIN_ROTATE_OFF, HIGH); // Rotate cylinder to zero
    }
}