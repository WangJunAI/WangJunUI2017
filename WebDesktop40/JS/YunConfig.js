var YunConfig = {
    ServerHost: function (context, key) {
        if (key === "UploadServerHost") {
            return "http://localhost:14000";
        }
        return "http://localhost:9990";
    },
   RedirectPage:"http://localhost:14000"+ "/" + "redirect.html"
}


