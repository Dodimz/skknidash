@extends('installation.installation')
@section('content')
    <div class="mar-ver pad-btm text-center">
        <h1 class="h3">Checking file permissions</h1>
        <p>
            We ran diagnosis on your server. Review the items that have a red mark on it. <br />
            If everything is green, you are good to go to the next step.
        </p>
    </div>

    <ul class="list-group">
        <li class="list-group-item text-semibold">
            PHP version 8.2 +
            @php
                $phpVersion = number_format((float)phpversion(), 2, '.', '');
            @endphp
            @if($phpVersion >= 8.2)
                <i class="fas fa-check float-right text-success"></i>
            @else
                <i class="fas fa-times text-danger float-right"></i>
            @endif
        </li>
        <li class="list-group-item text-semibold">
            Curl Enabled
            @if($permission['curl_enabled'])
                <i class="fas fa-check float-right text-success"></i>
            @else
                <i class="fas fa-times text-danger float-right"></i>
            @endif
        </li>
        <li class="list-group-item text-semibold">
            Symlink Enabled
            @if($permission['symlink_enabled'])
                <i class="fas fa-check float-right text-success"></i>
            @else
                <i class="fas fa-times text-danger float-right"></i>
            @endif
        </li>
        <li class="list-group-item text-semibold">
            <b>.env</b> File Permission
            @if($permission['db_file_write_perm'])
                <i class="fas fa-check float-right text-success"></i>
            @else
                <i class="fas fa-times text-danger float-right"></i>
            @endif
        </li>
    </ul>

    <p class="text-center mt-3">
        @if ($permission['curl_enabled'] == 1 && $permission['db_file_write_perm'] == 1 && $permission['symlink_enabled'] == 1 && $phpVersion >= 8.2)
            <a href = "{{ route('step2') }}" class="btn btn-primary">Go To Next Step</a>
        @endif
    </p>
@endsection
