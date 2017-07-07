// définition des option pour la Jauge de pulvérisation http://bernii.github.io/gauge.js/#!
var opts = {
  angle: -0.2, // The span of the gauge arc
  lineWidth: 0.2, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.6, // // Relative to gauge radius
    strokeWidth: 0.035, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, the max value of the gauge will be updated if value surpass max
  limitMin: false,     // If true, the min value of the gauge will be fixed unless you set it manually
  colorStart: '#6FADCF',   // Colors
  colorStop: '#8FC0DA',    // just experiment with them
  strokeColor: '#E0E0E0',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  staticZones: [
      {strokeStyle: "#F03E3E", min: 0, max: 20},  // Red
      {strokeStyle: "#ffa500", min: 20, max: 40}, // Yellow
      {strokeStyle: "#30B32D", min: 40, max: 60} // Green
  ],
};


