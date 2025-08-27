@extends('installation.installation')
@section('content')
    <div class="mar-ver pad-btm text-center">
        <h1 class="h3">Import SQL</h1>
    </div>
    <p class="text-muted font-13 text-center">
        <strong>Your database is successfully connected</strong>. All you need to do now is
        <strong>hit the 'Install' button</strong>.
        The auto installer will run a sql file, will do all the tiresome works and set up your application automatically.
    </p>
    <div class="text-center mar-top pad-top">
        <a href="{{ route('import_sql') }}" class="btn btn-primary">Import SQL</a>
    </div>
@endsection
