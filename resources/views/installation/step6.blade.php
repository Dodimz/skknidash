@extends('installation.installation')
@section('content')
    <div class="card-body">
        <div class="text-center mb-4">
            <h1 class="h3">Congratulations!!!</h1>
            <p>You have successfully completed the installation process. Please Login to continue.</p>
        </div>
        <div class="text-center">
            <a href="{{ env('APP_URL') }}" class="btn btn-primary">Go to Frontend Website</a>
            <a href="{{ env('APP_URL') }}/auth/login" class="btn btn-success">Login to Admin panel</a>
        </div>
    </div>
@endsection
