import TextInput from '@/Admin/Components/Inputs/TextInput';
import AdminLayouts from '@/Admin/Layouts/AdminLayouts';
import { Head, useForm } from '@inertiajs/react';
import React from 'react'

export default function SocialLogin({ social_media_config }) {
    const { data, setData, errors, put } = useForm(social_media_config)

    // update social media login configure
    const updateGoogleLoginConfiguration = () => {
        put(route('admin.settings.google.login.update'));
    }

    const updateFacebookLoginConfiguration = () => {
        put(route('admin.settings.facebook.login.update'));
    }
    return (
        <AdminLayouts>
            <Head title="Social Media Login" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">Social Media Login Configure</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <div className="row">
                    <div className="col-md-12 mb-5">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">
                                        Google Login Credential
                                    </h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="input-group mb-3">
                                        <div className="labe">Active</div>
                                        <div
                                            className={`yoo-switch mx-2 ${data.google_login_is_active === "1" && "active"
                                                }`}
                                            onClick={() => data.google_login_is_active === "1" ? setData("google_login_is_active", "0") : setData("google_login_is_active", "1")}
                                        >
                                            <div className="yoo-switch-in" />
                                        </div>
                                    </div>
                                    <TextInput
                                        title="Client ID *"
                                        type="text"
                                        id="google_client_id"
                                        value={data.google_client_id}
                                        onChange={(e) => setData("google_client_id", e.target.value)}
                                        error={errors.google_client_id}
                                    />
                                    <TextInput
                                        title="Client Secret *"
                                        type="text"
                                        id="google_client_secret"
                                        value={data.google_client_secret}
                                        onChange={(e) => setData("google_client_secret", e.target.value)}
                                        error={errors.google_client_secret}
                                    />
                                    <label className='mr-2' htmlFor="google_callback_url">Google Callback URL: </label>
                                    <code id='google_callback_url'>{route('social.callback', 'google')}</code>
                                    <div className="form-group mb-0 text-right">
                                        <button onClick={updateGoogleLoginConfiguration} type="submit" className="btn btn-sm btn-primary">Save</button>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">
                                        Facebook Login Credential
                                    </h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="input-group mb-3">
                                        <div className="labe">Active</div>
                                        <div
                                            className={`yoo-switch mx-2 ${data.facebook_is_active === "1" && "active"
                                                }`}
                                            onClick={() => data.facebook_is_active === "1" ? setData("facebook_is_active", "0") : setData("facebook_is_active", "1")}
                                        >
                                            <div className="yoo-switch-in" />
                                        </div>
                                    </div>
                                    <TextInput
                                        title="App ID *"
                                        type="text"
                                        id="facebook_app_id"
                                        value={data.facebook_app_id}
                                        onChange={(e) => setData("facebook_app_id", e.target.value)}
                                        error={errors.facebook_app_id}
                                    />
                                    <TextInput
                                        title="App Secret *"
                                        type="text"
                                        id="facebook_app_secret"
                                        value={data.facebook_app_secret}
                                        onChange={(e) => setData("facebook_app_secret", e.target.value)}
                                        error={errors.facebook_app_secret}
                                    />
                                    <label className='mr-2' htmlFor="facebook_callback_url">Facebook Callback URL: </label>
                                    <code id='facebook_callback_url'>{route('social.callback', 'facebook')}</code>
                                    <div className="form-group mb-0 text-right">
                                        <button onClick={updateFacebookLoginConfiguration} type="submit" className="btn btn-sm btn-primary">Save</button>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayouts>
    )
}

