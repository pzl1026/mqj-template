import {RECENT_LOCAL, DEFAULT_URL} from '@/mqj/mqj.config';

if (!location.hash) {
  let recent = JSON.parse(localStorage.getItem(RECENT_LOCAL));

  if (recent) {
    window.location.href = recent[0].href;
  } else {
    window.location.href = DEFAULT_URL;
  }
} else {
  import("./bootstrap");
}

 