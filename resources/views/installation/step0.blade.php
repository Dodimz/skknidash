@extends('installation.installation')
@section('content')
    <div class="mar-ver pad-btm text-center">
        <h1 class="h3">Bione Installation | Shared by <a style='color:red;' href='https://www.vuinsider.com'>VUINSIDER.COM</a></h1>
        <p>You will need to know the following items before proceeding.</p>
    </div>
    <ol class="list-group">
        <li class="list-group-item text-semibold"><i class="fas fa-check"></i> Database Name</li>
        <li class="list-group-item text-semibold"><i class="fas fa-check"></i> Database Username</li>
        <li class="list-group-item text-semibold"><i class="fas fa-check"></i> Database Password</li>
        <li class="list-group-item text-semibold"><i class="fas fa-check"></i> Database Hostname</li>
    </ol>
    <p class="mt-3">
        During the installation process, we will check if the files that are needed to be written
        (<strong>.env file</strong>) have
        <strong>write permission</strong>. We will also check if <strong>curl</strong> are enabled on your server or not.
    </p>
    <p>
        Gather the information mentioned above before hitting the start installation button. If you are ready....
    </p>
    <br>
    <div class="text-center">
        <a href="{{ route('step1') }}" class="btn btn-primary">
            Start Installation Process
        </a>
    </div>
@endsection
