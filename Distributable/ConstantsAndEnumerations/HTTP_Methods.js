var HTTP_Methods;
(function (HTTP_Methods) {
    HTTP_Methods["get"] = "GET";
    HTTP_Methods["post"] = "POST";
    HTTP_Methods["create"] = "CREATE";
    HTTP_Methods["put"] = "PUT";
    HTTP_Methods["delete"] = "DELETE";
    HTTP_Methods["options"] = "OPTIONS";
    HTTP_Methods["head"] = "HEAD";
    HTTP_Methods["connect"] = "CONNECT";
    HTTP_Methods["trace"] = "TRACE";
    HTTP_Methods["patch"] = "PATCH";
})(HTTP_Methods || (HTTP_Methods = {}));
export default HTTP_Methods;
