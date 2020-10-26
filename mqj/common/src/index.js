if (!location.hash) {
  let recent = JSON.parse(localStorage.getItem('_mqj_recent'));
  if (recent) {
    window.location.href = recent[0].href;
  } else {
    window.location.href = '/goods#/goods/list';
  }
} else {
  import("./bootstrap");
}
 

