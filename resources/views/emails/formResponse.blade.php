<x-mail::message>
    <p>A new form response, please check below:</p>
    <ul>
        @foreach($data->response_data as $key => $value)
            <li>{{ str_replace('_', ' ', ucwords($key)) }}: 
                @if(is_array($value))
                    {{ implode(', ', $value) }}
                @else
                    {{ $value }}
                @endif
            </li>
        @endforeach
    </ul>
Thanks,<br>
{{ config('app.name') }}
</x-mail::message>