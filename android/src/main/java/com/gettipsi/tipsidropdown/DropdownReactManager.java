package com.gettipsi.tipsidropdown;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.gettipsi.tpsdropdown.Dropdown;
import com.gettipsi.tpsdropdown.DropdownContainer;

public class DropdownReactManager extends SimpleViewManager<DropdownContainer> {

    private static final String REACT_CLASS_NAME = "TPSDropDown";

    private Dropdown dropdown;

    @Override
    public String getName() {
        return REACT_CLASS_NAME;
    }

    @Override
    protected DropdownContainer createViewInstance(final ThemedReactContext reactContext) {
        DropdownContainer dropdownContainer = new DropdownContainer(reactContext);
        dropdown = dropdownContainer.getDropdown();
        return dropdownContainer;
    }

    @ReactProp(name = "items")
    public void setItems(DropdownContainer dropdown, ReadableArray items) {
        dropdown.setupWithElements(Converter.toList(items));
    }

    @ReactProp(name = "selected")
    public void setSelected(DropdownContainer dropdown, int selected) {
        dropdown.getDropdown().setSelected(selected);
    }

    @ReactProp(name = "styling")
    public void setStyling(DropdownContainer dropdown, String style) {
        dropdown.setStyle(style);
    }

    @ReactMethod
    public void selectElementWithName(String name) {
        dropdown.selectElementWithName(name);
    }

    @ReactMethod
    public void pickElementAtIndex(int index) {
        dropdown.setSelected(index);
    }

    @ReactMethod
    public void closeDropdown() {
        dropdown.clearFocus();
    }

    @ReactMethod
    public void resetFirstElement() {
        dropdown.setSelected(0);
    }

    @ReactMethod
    public void getCurrentItem(Callback callback) {
        callback.invoke(dropdown.getSelectedItem().toString());
    }

    @ReactMethod
    public void elementHeight(Callback callback) {
        callback.invoke(dropdown.getMeasuredHeight());
    }

}
