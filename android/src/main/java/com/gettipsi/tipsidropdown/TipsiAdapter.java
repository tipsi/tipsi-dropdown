package com.gettipsi.tipsidropdown;

import com.facebook.react.bridge.ReadableMap;
import com.gettipsi.tpsdropdown.Adapter;

import java.util.List;

public class TipsiAdapter extends Adapter<ReadableMap> {

    public TipsiAdapter(List<ReadableMap> objects) {
        super(objects);
    }

    @Override
    public String getLabel(int position) {
        return getItem(position).getString("label");
    }
}
