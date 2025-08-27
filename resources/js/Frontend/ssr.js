import React from "react";
import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { Provider } from "react-redux";
import { store } from "@/Redux/app/store";

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) => require(`./Pages/${name}`),
        setup: ({ App, props }) => (
            <>
                <Provider store={store}>
                    <App {...props} />
                </Provider>
            </>
        ),

        progress: {
            color: "#fa4a17",
        },
    })
);
