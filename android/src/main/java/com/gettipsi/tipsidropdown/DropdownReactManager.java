package com.gettipsi.tipsidropdown;

import android.content.Context;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.gettipsi.tpsdropdown.Adapter;
import com.gettipsi.tpsdropdown.Dropdown;
import com.gettipsi.tpsdropdown.DropdownContainer;
import com.gettipsi.tpsdropdown.DropdownStylist;
import com.gettipsi.tpsdropdown.model.Style;
import com.squareup.picasso.Picasso;

import java.lang.ref.WeakReference;
import java.util.List;

public class DropdownReactManager extends SimpleViewManager<DropdownContainer> {

    private static final String PROP_ITEMS = "items";
    private static final String PROP_SELECTED_INDEX = "selectedIndex";
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

    private Style style = new Style();

    private Dropdown dropdown;
    private WeakReference<DropdownContainer> dropdownContainer;
    private Picasso picasso;
    private boolean supressNotification = false;

    @Override
    public String getName() {
        return REACT_CLASS_NAME;
    }

    @Override
    protected DropdownContainer createViewInstance(final ThemedReactContext reactContext) {
        initPicasso(reactContext);
        DropdownContainer dropdownContainer = new DropdownContainer(reactContext);
        dropdown = dropdownContainer.getDropdown();
        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT, Gravity.START | Gravity.CENTER_VERTICAL);
        dropdown.setLayoutParams(params);
        this.dropdownContainer = new WeakReference<>(dropdownContainer);
        return dropdownContainer;
    }

    @ReactProp(name = PROP_BACKGROUND_COLOR)
    public void setBackgroundColor(DropdownContainer dropdown, String value) {
        style.setBackgroundColor(value);
        updateView(dropdown);
    }

    @ReactProp(name = PROP_BORDER_WIDTH)
    public void setBorderWidth(DropdownContainer dropdown, Integer value) {
        style.setBorderWidth(value);
        updateView(dropdown);
    }

    @ReactProp(name = PROP_BORDER_COLOR)
    public void setBorderColor(DropdownContainer dropdown, String value) {
        style.setBorderColor(value);
        updateView(dropdown);
    }

    @ReactProp(name = PROP_CORNER_RADIUS)
    public void setCornerRadius(DropdownContainer dropdown, Integer value) {
        style.setCornerRadius(value);
        updateView(dropdown);
    }

    @ReactProp(name = PROP_DIVIDER_HEIGHT)
    public void setDividerHeight(DropdownContainer dropdown, Integer value) {
        style.setSeparatorHeight(value);
        updateView(dropdown);
    }

    @ReactProp(name = PROP_DIVIDER_COLOR)
    public void setDividerColor(DropdownContainer dropdown, String value) {
        style.setSeparatorColor(value);
        updateView(dropdown);
    }

    @ReactProp(name = PROP_FONT_NAME)
    public void setFontName(DropdownContainer dropdown, String value) {
        style.setFontName(value);
        updateView(dropdown);
    }

    @ReactProp(name = PROP_FONT_SIZE)
    public void setFontSize(DropdownContainer dropdown, Integer value) {
        style.setFontSize(value);
        updateView(dropdown);
    }

    @ReactProp(name = PROP_TEXT_COLOR)
    public void setTextColor(DropdownContainer dropdown, String value) {
        style.setTextColor(value);
        updateView(dropdown);
    }

    @ReactProp(name = PROP_TEXT_ALIGN)
    public void setTextAlign(DropdownContainer dropdown, String value) {
        style.setTextAlignment(value);
        updateView(dropdown);
    }

    @ReactProp(name = PROP_SELECTED_INDEX)
    public void setSelected(DropdownContainer dropdown, int selected) {
        supressNotification = true;
        dropdown.getDropdown().setSelected(selected);
        updateView(dropdown);
    }

    @ReactProp(name = PROP_INDICATOR_IMAGE_NAME)
    public void setIndicatorImageName(DropdownContainer dropdown, String value) {
        if (value.startsWith("http")) {
            picasso.load(value).into(dropdown.getIcon());
        } else {
            style.setIndicatorImageName(value);
        }
        updateView(dropdown);
    }

    @ReactProp(name = PROP_ITEMS)
    public void setItems(final DropdownContainer dropdown, ReadableArray items) {
        if (items != null) {
            List<ReadableMap> data = Converter.fromReadableMap(items);
            final TipsiAdapter tipsiAdapter = new TipsiAdapter(data);
            dropdown.setupWithAdapter(tipsiAdapter);
            dropdown.getDropdown().setDropdownUpdateEvent(new Dropdown.DropdownUpdateEvent() {
                @Override
                public void onUpdate(View view, int id, int pos, String selectedItem) {
                    if (!supressNotification) {
                        ((ReactContext) dropdown.getContext())
                                .getNativeModule(UIManagerModule.class)
                                .getEventDispatcher().dispatchEvent(
                                new DropdownOnChangeEvent(dropdownContainer.get().getId(), pos, tipsiAdapter.getItem(pos)));
                        supressNotification = false;
                    }
                }
            });
        }
        updateView(dropdown);
    }

    private void initPicasso(Context context) {
        picasso = Picasso.with(context);
    }

    private void updateView(DropdownContainer dropdown) {
        DropdownStylist.getInstance().setStyle(style);
        dropdown.invalidate();
        if (dropdown.getDropdown() != null && dropdown.getDropdown().getAdapter() != null) {
            ((Adapter) dropdown.getDropdown().getAdapter()).notifyDataSetChanged();
        }
    }

}
