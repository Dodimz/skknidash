<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendAccountVerificationMail extends Mailable
{
    use Queueable, SerializesModels;

    protected string $mail_body;

    protected string $mail_subject;

    /**
     * Create a new message instance.
     */
    public function __construct($body, $subject)
    {
        $this->mail_body = $body;
        $this->mail_subject = $subject;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->mail_subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.OtpMail',
            with: [
                'subject' => $this->mail_subject,
                'body' => $this->mail_body,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
