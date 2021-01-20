package com.example.mgdgame;

import androidx.appcompat.app.AppCompatActivity;

//import android.support.v7.app.AppCompatActivity;
import android.content.pm.ActivityInfo;
import android.webkit.WebView;
import android.view.View;
import android.os.Bundle;



public class MainActivity extends AppCompatActivity {
    WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        View decorView = getWindow().getDecorView();

        int uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_IMMERSIVE;
        decorView.setSystemUiVisibility(uiOptions);

        setContentView(R.layout.activity_main);


        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        webView = (WebView)findViewById(R.id.webview1);

    webView.getSettings().setJavaScriptEnabled(true);
    webView.loadUrl("file:///android_asset/GirafficPark.html");
    }

}

/*
    @Override
    public boolean onTouch(View view, MotionEvent e)
    {
        float x = e.getX();

        switch (e.getAction())
        {
            case MotionEvent.ACTION_DOWN:
                player.setX((int)e.getX());
                break;
            case MotionEvent.ACTION_UP:
                break;
            default:
                break;
        }
        return true;
    }*/
