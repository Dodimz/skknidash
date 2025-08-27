import React from 'react';
import { router } from '@inertiajs/react'

export default function LoginLink({
      className = 'underline',
      email = null,
      guard = null,
      keyId = null,
      label = 'Login',
      redirectUrl = null,
      userAttributes = null,
  }) {
    function submit(event) {
        router.post(route('loginLinkLogin'), {
            email: email,
            key: keyId,
            redirect_url: redirectUrl,
            guard: guard,
            user_attributes: userAttributes,
        });
    };

    return (
        <div className="quick-login-link">
            <button onClick={submit} className={className} style={{ borderRadius: "20px !important" }}>
                {label}
            </button>
        </div>
    );
};
