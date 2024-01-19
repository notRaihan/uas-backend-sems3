// import express
const express = require("express");

// create json response class
class JsonResponse {
    statusCode;
    message;
    data;

    // method set json response
    set(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;

        return {
            status: this.statusCode,
            message: this.message,
            data: this.data,
        };
    }
}

// export class
module.exports = JsonResponse;
