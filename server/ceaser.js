function ceaser(text, n) {
  // 65 A , 122 z
  let nums = [];
  for (c of text) {
    let asciiNum = c.charCodeAt(0);
    if (asciiNum >= 65 && asciiNum <= 90) {
      let ceaser = asciiNum + n;
      ceaser = ceaser > 90 ? ceaser - 90 + 65 - 1 : ceaser;
      nums.push(ceaser);
    } else if (asciiNum >= 97 && asciiNum <= 122) {
      let ceaser = asciiNum + n;
      ceaser = ceaser > 122 ? ceaser - 122 + 97 - 1 : ceaser;
      nums.push(ceaser);
    } else {
      nums.push(asciiNum);
    }
  }

  let res = "";
  for (n of nums) {
    let string = String.fromCharCode(n);
    res += string;
  }
  return res;
}

console.log(ceaser("Hello World!", 4));
