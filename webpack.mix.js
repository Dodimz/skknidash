const mix = require("laravel-mix")
const path = require("path")

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
var webpackConfig = {
    resolve: {
        alias: {
            "@": path.resolve("resources/js")
        }
    }
}

mix.options({
    hmrOptions: {
        host: "localhost",
        port: 8081,
        https: false
    }
})

// frontend
mix.js("resources/js/Frontend/app.jsx", "public/js/frontend")
    .sass("resources/scss/Frontend/globals.scss", "public/css/frontend")
    .styles("resources/css/frontend/bootstrap.min.css", "public/css/frontend/bootstrap.min.css")
    .react()
    .webpackConfig(webpackConfig)

// admin
mix.js("resources/js/Admin/app.jsx", "public/js/admin")
    .styles(
        ["resources/css/admin/bootstrap.min.css", "resources/css/admin/fontawesome.css", "resources/css/admin/iDashboard.css"],
        "public/css/admin/all.css"
    )
    .react()
    .webpackConfig(webpackConfig)

// Copy static files to the 'public' directory
mix.copyDirectory("resources/static", "public/static")

mix.version()
