<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>استریم</title>

        <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
        <link rel="stylesheet" href="{{ asset('/css/font.css') }}">
        <style>
            html,body{
                margin: 0;
                padding: 0;
            }
        </style>
    </head>
    <body dir="rtl">
        <div id="app"></div>
        <script type="text/javascript" src="{{ asset('/js/app.js') }}"></script>
    </body>
</html>
