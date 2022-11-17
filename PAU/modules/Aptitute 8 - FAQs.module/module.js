
  var accDf = document.getElementsByClassName("elements--faq__accordion--open_by_default");
  var j;
  for (j = 0; j < accDf.length; j++) {
    accDf[j].classList.add("active");
  }
document.addEventListener('aos:in', ({ detail }) => {
  for (j = 0; j < accDf.length; j++) {
    var panel = accDf[j].nextElementSibling;
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
});


var acc = document.getElementsByClassName("elements--faq__accordion");
var i;


for (i = 0; i < acc.length; i++) {

  
  acc[i].addEventListener("click", function() {
    
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

  });
}