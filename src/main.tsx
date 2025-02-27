import React from "react";
import ReactDOM from "react-dom/client";
import {ChakraProvider} from "@chakra-ui/react";
// import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {defaultSystem} from "@chakra-ui/react"


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChakraProvider value={defaultSystem}>
            {/*<ChakraProvider>*/}
            {/* <BrowserRouter> */}
                <App/>
            {/* </BrowserRouter> */}
        </ChakraProvider>
    </React.StrictMode>
);