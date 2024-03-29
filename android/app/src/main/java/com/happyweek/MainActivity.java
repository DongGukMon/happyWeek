package com.happyweek;
import android.os.Bundle;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "HappyWeek";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    //스플래시 쇼
    SplashScreen.show(this);
    super.onCreate(null);
  }


}
