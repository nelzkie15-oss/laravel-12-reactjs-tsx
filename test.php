<?php
$path = '/home/79c0bfae94621964/public_html/laravel-react/database/database.sqlite';

if (file_exists($path)) {
    echo "✅ SQLite file exists.";
} else {
    echo "❌ SQLite file NOT found at: $path";
}
