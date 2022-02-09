<?php
$result = [];
$dirs = new RecursiveIteratorIterator(new RecursiveDirectoryIterator('.'));
foreach ($dirs as $name => $file) {
    if ($file->getExtension() == 'png')
        $result[] = $name;
}
echo json_encode($result) ;