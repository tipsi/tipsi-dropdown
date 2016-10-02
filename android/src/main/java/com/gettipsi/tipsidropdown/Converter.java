package com.gettipsi.tipsidropdown;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;
import java.util.List;

public class Converter {

    public static List<ReadableMap> fromReadableMap(ReadableArray items) {
        List<ReadableMap> data = new ArrayList<>(items.size());

        for(int adapter = 0; adapter < items.size(); ++adapter) {
            data.add(items.getMap(adapter));
        }
        return data;
    }
}
