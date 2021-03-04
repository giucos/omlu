<?php

$uri_path = urldecode(
  parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

// This allows us to emulate Apache's "mod_rewrite" functionality from the
// built-in PHP web server.
if (file_exists(__DIR__.$uri_path)) {
  return false; // exit and let the server deliver the file
}

// Treat non local files by proxying gem server…

$ref = $uri_path;
$url = "https://gem.exorciser.ch/$ref";

$headers = get_headers($url, 1);

$responsecode = preg_replace("/.*(\d\d\d).*/", "$1", $headers[0]);
http_response_code($responsecode);

if ($responsecode >= 400) exit();

$type = $headers["Content-Type"];
header("Content-Type: $type");

try{
  echo file_get_contents($url);
} catch (Exception $ex) {
  http_response_code(500);
}
