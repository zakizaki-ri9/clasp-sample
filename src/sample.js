// @ts-nocheck
function echoMessage(msg) {
  Logger.log(msg);
}

function main() {
  ["hello", "world", "!"].forEach(function (msg) {
    echoMessage(msg);
  });
}