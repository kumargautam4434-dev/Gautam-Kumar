package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.ui.theme.MyApplicationTheme

import android.view.ViewGroup
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.viewinterop.AndroidView

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      MyApplicationTheme {
        Scaffold(
          modifier = Modifier.fillMaxSize(),
          contentWindowInsets = WindowInsets(0, 0, 0, 0) // Full bleed, no structural scaffolding offsets
        ) { innerPadding ->
          Box(
            modifier = Modifier
              .fillMaxSize()
              .background(Color(0xFF070913)) // Avoid any bright flash on load
              .padding(innerPadding)
          ) {
            AndroidView(
              modifier = Modifier.fillMaxSize(),
              factory = { context ->
                WebView(context).apply {
                  layoutParams = ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                  )
                  
                  // Configure immersive, high-performance WebView settings
                  settings.apply {
                    javaScriptEnabled = true
                    domStorageEnabled = true // Mandatory for LocalStorage Score tracking
                    databaseEnabled = true
                    useWideViewPort = true
                    loadWithOverviewMode = true
                    cacheMode = WebSettings.LOAD_NO_CACHE // Force loading fresh local HTML5 code
                    
                    // Gaming performance configurations
                    mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                    mediaPlaybackRequiresUserGesture = false // Allow SFX synth autoplay immediately
                    setSupportZoom(false)
                    builtInZoomControls = false
                    displayZoomControls = false
                  }

                  // Eliminate native scrollbar visual lines
                  isVerticalScrollBarEnabled = false
                  isHorizontalScrollBarEnabled = false

                  webViewClient = object : WebViewClient() {
                    override fun onPageFinished(view: WebView?, url: String?) {
                      super.onPageFinished(view, url)
                      // WebView loaded fully
                    }
                  }
                  
                  webChromeClient = WebChromeClient()

                  // Load local game asset
                  loadUrl("file:///android_asset/game/index.html")
                }
              }
            )
          }
        }
      }
    }
  }
}
