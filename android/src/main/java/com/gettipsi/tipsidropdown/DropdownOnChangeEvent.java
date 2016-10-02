package com.gettipsi.tipsidropdown;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class DropdownOnChangeEvent extends Event<DropdownOnChangeEvent> {

    private static final String EVENT_NAME = "topChange";
    private final int mPosition;
    private final ReadableMap mValue;

    public DropdownOnChangeEvent(int viewId, int position, ReadableMap value) {
        super(viewId);
        mPosition = position;
        mValue = value;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public short getCoalescingKey() {
        return 0;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
    }

    private WritableMap serializeEventData() {
        WritableMap eventData = Arguments.createMap();
        eventData.putInt("newIndex", mPosition);
        eventData.putString("newValue", mValue.getString("value"));
        return eventData;
    }
}
