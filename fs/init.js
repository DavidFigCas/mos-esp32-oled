load('api_config.js');
load('api_arduino_ssd1306.js');
load('api_timer.js');

// FFI Wrappers

Adafruit_SSD1306._spl = ffi('void ssd1306_splash(void *, void *)');
Adafruit_SSD1306._proto.splash = function (data) { Adafruit_SSD1306._spl(this.ssd, data); };
Adafruit_SSD1306._dbm = ffi('void ssd1306_drawBitmap(void *, void *, int, int, int, int)');
Adafruit_SSD1306._proto.drawBitmap = function (data, x, y, w, h) { Adafruit_SSD1306._dbm(this.ssd, data, x, y, w, h); };
let free = ffi('void free(void *)');

// Polyfills

let atob = atob || function (str) { return ffi('void *atob(void *, int)')(str, str.length); };


// Display 

let d = Adafruit_SSD1306.create_i2c(Cfg.get('app.ssd1306_reset_pin'), Adafruit_SSD1306.RES_128_64);
d.begin(Adafruit_SSD1306.SWITCHCAPVCC, 0x3C, true);


// Main
function main() {
  let contador = 0;
  let logo2 = atob("QEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/gAD4AAAAD//wA/8AAAA///wH/4AAAP///w//wAAB////n//AAAf////v/+AAD/////f/4AAf////+//gAD/////5/+AAP/////3/4AB//////v/gAP/////+/+AA//////9/wAH//////3/AAf//////v4AB//////+/AAP//////7wAA///////wAAD///////AAcD//////8AB/4//////wAH/h//////AAfhx/////8AB8/z/////wAHn/3/////AAM//j////8AA3weH////wADeA9v////AANwD3f///8AAPAP+////gAA8A+5///+AADwD73///wAAPgPvv///AAAeB/d///4AAB//9P///gAAD//x///8AAAH//P///gAAAH/8///+AAAAD/1///gAAABg+3//+AAAAHwH///gAAAAP4+//4AAAAAfg7//AAAAAA8AP/wAAAAAAgA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=");
  d.clearDisplay();
  d.drawBitmap(logo2, 0, 0, 64, 64);
  d.setTextColor(Adafruit_SSD1306.WHITE);
  d.setTextSize(2);
  d.setCursor(65, 20)
  d.write("10.0")
  d.setTextSize(1);
  d.setCursor(100, 35)
  d.write("cm")
  d.display();
  free(logo2);
}

// Init
function init() {
  let logo = atob("QEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/gAD4AAAAD//wA/8AAAA///wH/4AAAP///w//wAAB////n//AAAf////v/+AAD/////f/4AAf////+//gAD/////5/+AAP/////3/4AB//////v/gAP/////+/+AA//////9/wAH//////3/AAf//////v4AB//////+/AAP//////7wAA///////wAAD///////AAcD//////8AB/4//////wAH/h//////AAfhx/////8AB8/z/////wAHn/3/////AAM//j////8AA3weH////wADeA9v////AANwD3f///8AAPAP+////gAA8A+5///+AADwD73///wAAPgPvv///AAAeB/d///4AAB//9P///gAAD//x///8AAAH//P///gAAAH/8///+AAAAD/1///gAAABg+3//+AAAAHwH///gAAAAP4+//4AAAAAfg7//AAAAAA8AP/wAAAAAAgA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=");
  d.clearDisplay();
  d.splash(logo);
  d.display();
  free(logo);
  Timer.set(3000, false, main, null);
}


init();