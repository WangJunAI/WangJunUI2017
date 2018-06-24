<%@ WebHandler Language="C#" Class="UEditorHandler" %>

using System;
using System.Web;
using System.IO;
using System.Collections;
using Newtonsoft.Json;

public class UEditorHandler : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        context.Response.Headers.Add("Access-Control-Allow-Origin", "*"); //设置请求来源不受限制
        context.Response.Headers.Add("Access-Control-Allow-Headers", "X-Requested-With");
        context.Response.Headers.Add("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //请求方式

        Handler action = null;
        switch (context.Request["action"])
        {
            case "config":
                action = new ConfigHandler(context);
                break;
            case "uploadimage":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = Config.GetStringList("imageAllowFiles"),
                    PathFormat = Config.GetString("imagePathFormat"),
                    SizeLimit = Config.GetInt("imageMaxSize"),
                    UploadFieldName = Config.GetString("imageFieldName")
                });
                break;
            case "uploadscrawl":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = new string[] { ".png" },
                    PathFormat = Config.GetString("scrawlPathFormat"),
                    SizeLimit = Config.GetInt("scrawlMaxSize"),
                    UploadFieldName = Config.GetString("scrawlFieldName"),
                    Base64 = true,
                    Base64Filename = "scrawl.png"
                });
                break;
            case "uploadvideo":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = Config.GetStringList("videoAllowFiles"),
                    PathFormat = Config.GetString("videoPathFormat"),
                    SizeLimit = Config.GetInt("videoMaxSize"),
                    UploadFieldName = Config.GetString("videoFieldName")
                });
                break;
            case "uploadfile":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = Config.GetStringList("fileAllowFiles"),
                    PathFormat = Config.GetString("filePathFormat"),
                    SizeLimit = Config.GetInt("fileMaxSize"),
                    UploadFieldName = Config.GetString("fileFieldName")
                });
                break;
            case "fromWebUploader":

                foreach (string filedName in context.Request.Files)
                {
                    var file = context.Request.Files[filedName];
                    var serverFileName = Guid.NewGuid() + file.FileName;
                    var folderPath = string.Format(@"{0}{1}", context.Server.MapPath("~"), "uploadFiles");
                    Directory.CreateDirectory(folderPath);
                    var filePath = string.Format(@"{0}\{1}", folderPath, serverFileName);
                    file.SaveAs(filePath);
                    var yunRes = "";
                    try
                    {
                        //yunRes = System.Text.Encoding.UTF8.GetString(new System.Net.WebClient().UploadFile("http://localhost:9990/YunFile.ashx?m=save", filePath));
                    }
                    catch (Exception e)
                    {
                       yunRes= e.Message;
                    }

                    var fileInfo = new
                    {
                        ServerFileName = serverFileName,
                        ServerFilePath = filePath,
                        FileNameInClient = file.FileName,
                        FileLength = file.ContentLength,
                        FileLengthText = (1024 <= file.ContentLength) ? ((1024*1024 <= file.ContentLength) ? ((1024*1024*1024 <= file.ContentLength) ? (file.ContentLength / 1024*1024*1024)+"GB" : (file.ContentLength/1024*1024)+"MB") : (file.ContentLength/1024)+"KB") : file.ContentLength+"B",
                        HttpUrl = string.Format("{0}/uploadFiles/{1}",(HttpContext.Current.Request.Url.IsLoopback)?"http://localhost:14000":"http://m.aifuwu.wang", serverFileName),
                        YunFileInfo=yunRes
                    };

                    File.WriteAllText(string.Format(@"{0}\{1}", folderPath, serverFileName + ".txt"), new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(fileInfo), System.Text.Encoding.UTF8);


                    context.Response.Write(new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(fileInfo));

                }
                return;
                break;
            case "listimage":
                action = new ListFileManager(context, Config.GetString("imageManagerListPath"), Config.GetStringList("imageManagerAllowFiles"));
                break;
            case "listfile":
                action = new ListFileManager(context, Config.GetString("fileManagerListPath"), Config.GetStringList("fileManagerAllowFiles"));
                break;
            case "catchimage":
                action = new CrawlerHandler(context);
                break;
            default:
                action = new NotSupportedHandler(context);
                break;
        }
        action.Process();
    }


    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}