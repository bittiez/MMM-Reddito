function setRedditoMarquee(on, delay){
  setInterval(function(){
  	var item = $(on).children("span:first");
    var dupeIt = item;
    $(dupeIt).remove();
    $(on).append(item);
  }, delay);
}
