<?php
$data = json_decode(file_get_contents('php://input'), true)['data'];
$fileName = json_decode(file_get_contents('php://input'), true)['fileName'];

if (preg_match('/^data:image\/(\w+);base64,/', $data, $type)) {
    $data = substr($data, strpos($data, ',') + 1);
    $type = strtolower($type[1]); // jpg, png, gif

    if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
        throw new \Exception('invalid image type');
    }

    $data = base64_decode($data);

    if ($data === false) {
        throw new \Exception('base64_decode failed');
    }
} else {
    throw new \Exception('did not match data URI with image data');
}

file_put_contents("{$fileName}.{$type}", $data);

echo json_encode(["{$fileName}.{$type}"]);