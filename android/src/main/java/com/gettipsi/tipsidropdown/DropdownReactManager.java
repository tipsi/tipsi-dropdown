package com.gettipsi.tipsidropdown;

import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.gettipsi.tpsdropdown.Adapter;
import com.gettipsi.tpsdropdown.Dropdown;
import com.gettipsi.tpsdropdown.DropdownContainer;
import com.gettipsi.tpsdropdown.DropdownStylist;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.ref.WeakReference;

public class DropdownReactManager extends SimpleViewManager<DropdownContainer> {

    private static final String PROP_OPTIONS = "options";
    private static final String PROP_VALUE = "value";
    private static final String PROP_BACKGROUND_COLOR = "backgroundColor";
    private static final String PROP_BORDER_WIDTH = "borderWidth";
    private static final String PROP_BORDER_COLOR = "borderColor";
    private static final String PROP_CORNER_RADIUS = "cornerRadius";
    private static final String PROP_DIVIDER_HEIGHT = "separatorHeight";
    private static final String PROP_DIVIDER_COLOR = "separatorColor";
    private static final String PROP_FONT_NAME = "fontName";
    private static final String PROP_FONT_SIZE = "fontSize";
    private static final String PROP_TEXT_COLOR = "textColor";
    private static final String PROP_TEXT_ALIGN = "textAlignment";
    private static final String PROP_INDICATOR_IMAGE_NAME = "indicatorImageName";

    private static final String REACT_CLASS_NAME = "TipsiDropdown";

    private static final JSONObject jsonStyle = new JSONObject();

    static {
        try {
            jsonStyle.put(PROP_BACKGROUND_COLOR, "#AAAAAA");
            jsonStyle.put(PROP_BORDER_WIDTH, 0);
            jsonStyle.put(PROP_BORDER_COLOR, "#CCCCCC");
            jsonStyle.put(PROP_CORNER_RADIUS, 0);
            jsonStyle.put(PROP_DIVIDER_HEIGHT, 0);
            jsonStyle.put(PROP_DIVIDER_COLOR, "#CCCCCC");
            jsonStyle.put(PROP_FONT_NAME, "Arial");
            jsonStyle.put(PROP_FONT_SIZE, 0);
            jsonStyle.put(PROP_TEXT_COLOR, "#CCCCCC");
            jsonStyle.put(PROP_TEXT_ALIGN, "left");
            jsonStyle.put(PROP_INDICATOR_IMAGE_NAME, "");
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private Dropdown dropdown;
    private WeakReference<DropdownContainer> dropdownContainer;

    private Dropdown.DropdownUpdateEvent dropdownUpdateEvent = new Dropdown.DropdownUpdateEvent() {
        @Override
        public void onUpdate(View view, int id, int pos, String selectedItem) {
            if (dropdownContainer != null &&
                    dropdownContainer.get() != null) {
                ((ReactContext) view.getContext())
                        .getNativeModule(UIManagerModule.class)
                        .getEventDispatcher().dispatchEvent(
                        new DropdownEvent(dropdownContainer.get().getId(), pos, selectedItem));
            }
        }
    };

    @Override
    public String getName() {
        return REACT_CLASS_NAME;
    }

    @Override
    protected DropdownContainer createViewInstance(final ThemedReactContext reactContext) {
        DropdownContainer dropdownContainer = new DropdownContainer(reactContext);
        dropdown = dropdownContainer.getDropdown();
        dropdown.setDropdownUpdateEvent(dropdownUpdateEvent);
        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT, Gravity.START | Gravity.CENTER_VERTICAL);
        dropdown.setLayoutParams(params);
        this.dropdownContainer = new WeakReference<>(dropdownContainer);
        return dropdownContainer;
    }

    @ReactProp(name = PROP_BACKGROUND_COLOR)
    public void setBackgroundColor(DropdownContainer dropdown, String value) {
        updateString(dropdown, PROP_BACKGROUND_COLOR, value);
    }

    @ReactProp(name = PROP_BORDER_WIDTH)
    public void setBorderWidth(DropdownContainer dropdown, Integer value) {
        updateInt(dropdown, PROP_BORDER_WIDTH, value);
    }

    @ReactProp(name = PROP_BORDER_COLOR)
    public void setBorderColor(DropdownContainer dropdown, String value) {
        updateString(dropdown, PROP_BORDER_COLOR, value);
    }

    @ReactProp(name = PROP_CORNER_RADIUS)
    public void setCornerRadius(DropdownContainer dropdown, Integer value) {
        updateInt(dropdown, PROP_CORNER_RADIUS, value);
    }

    @ReactProp(name = PROP_DIVIDER_HEIGHT)
    public void setDividerHeight(DropdownContainer dropdown, Integer value) {
        updateInt(dropdown, PROP_DIVIDER_HEIGHT, value);
    }

    @ReactProp(name = PROP_DIVIDER_COLOR)
    public void setDividerColor(DropdownContainer dropdown, String value) {
        updateString(dropdown, PROP_DIVIDER_COLOR, value);
    }

    @ReactProp(name = PROP_FONT_NAME)
    public void setFontName(DropdownContainer dropdown, String value) {
        updateString(dropdown, PROP_FONT_NAME, value);
    }

    @ReactProp(name = PROP_FONT_SIZE)
    public void setFontSize(DropdownContainer dropdown, Integer value) {
        updateInt(dropdown, PROP_FONT_SIZE, value);
    }

    @ReactProp(name = PROP_TEXT_COLOR)
    public void setTextColor(DropdownContainer dropdown, String value) {
        updateString(dropdown, PROP_TEXT_COLOR, value);
    }

    @ReactProp(name = PROP_TEXT_ALIGN)
    public void setTextAlign(DropdownContainer dropdown, String value) {
        updateString(dropdown, PROP_TEXT_ALIGN, value);
    }

    @ReactProp(name = PROP_INDICATOR_IMAGE_NAME)
    public void setIndicatorImageName(DropdownContainer dropdown, String value) {
        updateString(dropdown, PROP_INDICATOR_IMAGE_NAME, value);
    }

    @ReactProp(name = PROP_OPTIONS)
    public void setItems(DropdownContainer dropdown, ReadableArray items) {
        dropdown.setupWithElements(Converter.toList(items));
        updateView(dropdown);
    }

    @ReactProp(name = PROP_VALUE)
    public void setSelected(DropdownContainer dropdown, int selected) {
        dropdown.getDropdown().setSelected(selected);
        updateView(dropdown);
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

    private void updateInt(DropdownContainer dropdown, String key, Integer value) {
        setIntValue(key, value);
        updateView(dropdown);
    }

    private void updateString(DropdownContainer dropdown, String key, String value) {
        setStringValue(key, value);
        updateView(dropdown);
    }

    private void setIntValue(String key, Integer value) {
        jsonStyle.remove(key);
        try {
            jsonStyle.put(key, value);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void setStringValue(String key, String value) {
        jsonStyle.remove(key);
        try {
            jsonStyle.put(key, value);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void updateView(DropdownContainer dropdown) {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("style", jsonStyle);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        DropdownStylist.getInstance().parseStyle(jsonObject.toString());
        dropdown.invalidate();
        if (dropdown.getDropdown() != null && dropdown.getDropdown().getAdapter() != null) {
            ((Adapter) dropdown.getDropdown().getAdapter()).notifyDataSetChanged();
        }
    }

}
